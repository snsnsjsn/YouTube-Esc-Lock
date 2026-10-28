# YouTube Esc Lock

Keep YouTube fullscreen when you press **Escape** briefly. An open-source, minimal Chromium extension for **Microsoft Edge** and **Google Chrome**.

> Built to solve a real workflow issue: `f` is reserved for Vimium C link hints, while YouTube should stay fullscreen after a brief press of `Esc`.

## Features

- Requests the browser **Keyboard Lock API** to prevent a brief `Esc` from exiting YouTube fullscreen, when permission is granted.
- `Alt + Enter` toggles the YouTube player fullscreen.
- Leaves `f` available for Vimium C.
- Automatically runs on YouTube pages; no Tampermonkey required.
- Small **Manifest V3** extension: no third-party libraries, no data collection, no network requests from the extension.

## Installation (Edge)

1. Download the source code ZIP from GitHub and extract it.
2. Open `edge://extensions` in Edge.
3. Enable **Developer mode**.
4. Choose **Load unpacked** and select the extracted folder containing `manifest.json`.
5. Reload any open YouTube tabs. Approve any keyboard-lock permission request presented by the browser.

For Chrome, use `chrome://extensions` and the same procedure.

## Keyboard shortcuts

| Shortcut | Behavior |
| --- | --- |
| `Alt + Enter` | Toggle YouTube player fullscreen |
| `f` | Not intercepted; remains available to Vimium C |
| Brief `Esc` | Remain fullscreen when Keyboard Lock succeeds |
| Hold `Esc` | Browser emergency fullscreen exit remains available (browser-dependent) |

## How it works

The extension runs `main.js` as a `MAIN`-world content script, loaded at `document_start`. It calls `navigator.keyboard.lock(['Escape'])` on initialization and at relevant fullscreen interactions. It also tries to stop YouTube's own `Escape` keydown handlers after the browser confirms the lock.

A JavaScript `preventDefault()` call alone cannot block a browser-level fullscreen exit. Keyboard Lock requires browser support and suitable permission/activation context.

## Compatibility and limitations

- Confirmed working by the original user in **Microsoft Edge on YouTube**. No claim is made about every Edge or Chrome version.
- YouTube interface changes or browser permission changes may affect behavior.
- It does not disable the browser's emergency way to exit fullscreen.
- `Alt + Enter` can conflict with other installed extensions or application shortcuts.
- This is an independent project and is not affiliated with YouTube, Google or Microsoft.

## Development

There is no build step. Edit `main.js` or `manifest.json`, then click **Reload** on the extension card in `edge://extensions` and reload the YouTube tab.

Check manifest JSON with `python -m json.tool manifest.json`; check JS syntax with `node --check main.js`.

## Privacy

See [PRIVACY.md](PRIVACY.md).

## Contributions

Bug reports and pull requests are welcome. For bugs, please include your browser version, the relevant Console output, and reproduction steps. Do not include personal information.

## License

MIT — see [LICENSE](LICENSE).
