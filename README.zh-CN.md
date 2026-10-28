# YouTube Esc Lock

**阻止短按 Escape（Esc）导致 YouTube 视频退出全屏。**

YouTube Esc Lock 是一款轻量级、开源的 Chromium 浏览器扩展。它利用浏览器的 Keyboard Lock API，在观看 YouTube 全屏视频时，尽量避免短按 `Esc` 意外退出全屏。

[English README](README.md)

## 主要功能

- 浏览器授予 Keyboard Lock 权限后，短按 `Esc` 可保持 YouTube 视频全屏。
- 自动在 YouTube 页面运行，无须每次打开开发者工具或执行脚本。
- 支持 `Alt + Enter` 切换 YouTube 视频全屏。
- 基于 Manifest V3，无第三方代码库依赖。
- 不收集用户数据，不主动发起扩展自身的网络请求。

## 安装方法

### Microsoft Edge

1. 下载本仓库 ZIP 压缩包并解压。
2. 打开 `edge://extensions`。
3. 开启**开发人员模式**。
4. 点击**加载解压缩的扩展**，选择包含 `manifest.json` 的文件夹。
5. 刷新已打开的 YouTube 页面。
6. 若浏览器弹出 Keyboard Lock 权限提示，请允许。

### Google Chrome

操作相同，但使用 `chrome://extensions`。是否生效取决于 Chrome 版本与权限设置。

## 使用方法

1. 打开任意 YouTube 视频。
2. 使用播放器全屏按钮或 `Alt + Enter` 进入视频全屏。
3. 短按 `Esc`；当 Keyboard Lock 已成功启用时，视频会保持全屏。

长按 `Esc` 仍可能触发浏览器保留的紧急退出全屏功能，这是浏览器的安全机制。

## 技术原理

扩展通过 Manifest V3 在 `document_start` 阶段，以网页 `MAIN` 执行环境加载 `main.js`。脚本在初始化及相关全屏操作时调用 `navigator.keyboard.lock(['Escape'])`，并在锁定生效时拦截部分页面内的 Esc 键盘事件。

仅使用 `preventDefault()` 不能可靠阻止浏览器级的全屏退出；是否成功锁定取决于浏览器兼容性和权限。

## 兼容性与限制

- 原始用户已在 Microsoft Edge 的 YouTube 页面验证有效。
- 不保证适用于所有 Edge、Chrome 或 YouTube 版本。
- 不会移除浏览器保留的安全退出全屏机制。
- `Alt + Enter` 可能与其他应用或扩展快捷键冲突。
- 本项目为独立开源作品，与 YouTube、Google、Microsoft 无关联。

## 开发与调试

无须构建。修改 `main.js` 或 `manifest.json` 后，在扩展管理页面点击**重新加载**，再刷新 YouTube 页面即可。

可选语法检查：

```bash
node --check main.js
python -m json.tool manifest.json
```

## 参与贡献

欢迎提交 Issues 和 Pull Requests。反馈问题时，请说明浏览器版本、复现步骤和相关控制台日志，注意删除个人信息。

## 隐私

参见 [PRIVACY.md](PRIVACY.md)。

## 开源协议

MIT，参见 [LICENSE](LICENSE)。
