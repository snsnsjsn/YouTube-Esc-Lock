(() => {
  'use strict';

  if (window.__ytEscLockExtensionInstalled) return;
  window.__ytEscLockExtensionInstalled = true;

  const TAG = '[YouTube Esc Lock]';
  let pending = false;
  let registered = false;

  function log(...args) { console.info(TAG, ...args); }

  async function requestLock(reason) {
    if (!navigator.keyboard || typeof navigator.keyboard.lock !== 'function') {
      log('Keyboard Lock API is unavailable');
      return;
    }
    if (pending) return;
    pending = true;
    try {
      await navigator.keyboard.lock(['Escape']);
      registered = true;
      log('Keyboard Lock registered:', reason);
    } catch (error) {
      registered = false;
      console.warn(TAG, 'Keyboard Lock request failed:', reason, error);
    } finally {
      pending = false;
    }
  }

  function editable(element) {
    return element instanceof Element && Boolean(element.closest(
      'input,textarea,select,[contenteditable=""],[contenteditable="true"],[role="textbox"]'
    ));
  }

  function player() {
    return document.querySelector('#movie_player.html5-video-player') ||
      document.querySelector('.html5-video-player');
  }

  function toggleFullscreen() {
    const videoPlayer = player();
    if (!videoPlayer) return;
    // Do not await before requestFullscreen: it needs the user gesture.
    void requestLock('Alt+Enter');
    const operation = document.fullscreenElement
      ? document.exitFullscreen()
      : videoPlayer.requestFullscreen();
    Promise.resolve(operation).catch(error => console.warn(TAG, 'Fullscreen request failed:', error));
  }

  // Capture before YouTube's own handlers when possible.
  window.addEventListener('keydown', event => {
    if (!editable(event.target) && event.altKey && !event.ctrlKey &&
        !event.metaKey && event.code === 'Enter' && !event.repeat) {
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleFullscreen();
      return;
    }

    // Prevent YouTube's own Escape keydown handlers only after lock succeeds.
    // Browser-level escape is controlled by Keyboard Lock, not preventDefault.
    if (registered && document.fullscreenElement && event.code === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('pointerdown', event => {
    if (event.target instanceof Element && event.target.closest('.ytp-fullscreen-button')) {
      void requestLock('YouTube fullscreen button');
    }
  }, true);

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) void requestLock('fullscreenchange');
  }, true);

  // Chromium allows an advance registration request. It may be rejected
  // depending on the permission state; manual button/key requests retry it.
  void requestLock('page initialization');
  log('Injected in MAIN world. Alt+Enter toggles fullscreen; Vimium f untouched.');
})();
