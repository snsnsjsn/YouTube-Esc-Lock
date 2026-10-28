# YouTube Esc Lock（中文说明）

让 YouTube 视频保持全屏：**短按 `Esc` 不意外退出全屏**，同时保留 Vimium C 的 `f`（Link Hints）快捷键。

这是一个轻量的 Edge / Chrome Manifest V3 扩展，不依赖 Tampermonkey。用户已在 Edge 的 YouTube 上确认有效。

## 功能

- 使用浏览器 `Keyboard Lock API` 请求锁定 `Escape`。
- `Alt + Enter` 切换 YouTube 播放器全屏。
- 不拦截 `f`，兼容 Vimium C 的 Link Hints。
- 进入 YouTube 后自动运行，无需打开开发者工具。
- 不收集数据，无第三方依赖，无额外网络请求。

## 安装

1. 在 GitHub 点击 **Code → Download ZIP**，解压到固定文件夹。
2. Edge 地址栏打开 `edge://extensions`；Chrome 打开 `chrome://extensions`。
3. 启用 **开发人员模式**，点击 **加载解压缩的扩展**。
4. 选择包含 `manifest.json` 的文件夹。
5. 刷新 YouTube。如果出现键盘锁定权限提示，选择允许。

## 快捷键

| 按键 | 功能 |
| --- | --- |
| `Alt + Enter` | 切换 YouTube 播放器全屏 |
| `f` | 不占用，继续作为 Vimium C 快捷键 |
| 短按 `Esc` | Keyboard Lock 成功时保持全屏 |
| 长按 `Esc` | 浏览器通常保留紧急退出全屏的方式 |

## 原理

扩展在 `MAIN` 环境和 `document_start` 时机注入 `main.js`。通过 `navigator.keyboard.lock(['Escape'])` 申请键盘锁定，并在全屏操作时重试。

单纯 `preventDefault()` 并不能可靠阻止浏览器级的全屏退出。是否生效取决于浏览器支持、权限和页面环境。

## 限制

已在作者的 Edge + YouTube 环境验证有效，但不保证任何浏览器版本都成功。此项目独立开发，与 YouTube、Google、Microsoft 无关联。

## 贡献

欢迎提 Issue、Pull Request。提交问题时建议附带浏览器版本、复现步骤和相关 Console 日志，避免提交隐私信息。

## 许可

MIT，详见 `LICENSE`。
