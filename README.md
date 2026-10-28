# YouTube Esc Lock

**Prevent a brief press of Escape (Esc) from exiting YouTube fullscreen.**

YouTube Esc Lock is a lightweight, open-source browser extension for Chromium-based browsers. It uses the browser's Keyboard Lock API to help keep YouTube videos fullscreen when you briefly press `Esc`.

## Features

- Helps prevent short presses of `Esc` from exiting YouTube fullscreen when Keyboard Lock is granted.
- Automatically runs on YouTube pages—no DevTools or userscript required.
- Supports `Alt + Enter` to toggle YouTube player fullscreen.
- Uses Manifest V3 with no third-party libraries.
- Does not collect user data or make extension-initiated network requests.

## Installation

### Microsoft Edge

1. Download this repository as a ZIP and extract it.
2. Open `edge://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the folder containing `manifest.json`.
5. Refresh your open YouTube tabs.
6. Allow any Keyboard Lock permission request prompted by the browser.

### Google Chrome

Follow the same steps at `chrome://extensions`. Chrome compatibility may vary by version and permissions.

## Usage

1. Open a YouTube video.
2. Enter video fullscreen using the player button or `Alt + Enter`.
3. Briefly press `Esc`. When Keyboard Lock is active, the video stays fullscreen.

Holding `Esc` may still trigger the browser's emergency fullscreen exit. This is intentional browser behavior.

## How it works

The extension injects `main.js` into YouTube pages using a Manifest V3 content script in the page's `MAIN` world at `document_start`. It requests `navigator.keyboard.lock(['Escape'])` at startup and around fullscreen interactions. When the lock is active, it also intercepts relevant Escape key events within the page.

Calling `preventDefault()` alone does not reliably prevent the browser from exiting fullscreen. Keyboard Lock behavior depends on browser support and permissions.

## Compatibility and limitations

- Confirmed working in Microsoft Edge on YouTube by the original user.
- Not guaranteed to work across every version of Chrome, Edge, or YouTube.
- Browser security mechanisms for exiting fullscreen remain available.
- `Alt + Enter` may conflict with other shortcuts.
- Independent open-source project; not affiliated with YouTube, Google, or Microsoft.

## Development

No build step is needed. Modify `main.js` or `manifest.json`, then reload the extension in `edge://extensions` or `chrome://extensions` and refresh YouTube.

Optional checks:

```bash
node --check main.js
python -m json.tool manifest.json
```

## Contributing

Issues and pull requests are welcome. For bug reports, include your browser version, reproduction steps, and relevant console messages. Please remove personal information from logs.

## Privacy

See [PRIVACY.md](PRIVACY.md).

## License

MIT — see [LICENSE](LICENSE).
