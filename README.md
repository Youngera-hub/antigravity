# Antigravity 简体中文汉化套件 (UI 界面汉化 + AI 中文交互插件)

本项目为 **Google Antigravity (2.0 桌面端 & IDE)** 提供完整的简体中文解决方案，包含两部分：

1. **客户端 UI 界面汉化工具**：将 Antigravity 2.0 的英文菜单、导航栏、设置面板（`Settings`）、自定义组件面板（`Customizations`）等界面元素实时翻译为简体中文。
2. **AI 助手全局中文交互插件 (`antigravity-zh-cn`)**：让 Antigravity Agent 在日常对话、规划文档（Artifacts）、代码注释及界面指引中默认使用简体中文，并内置完整的中英界面术语词典。

---

## 📦 仓库目录结构

```text
├── 1-免修改启动中文版(推荐).bat        # 零风险动态注入启动器（不修改 app.asar，规避签名校验）
├── 2-静态写入汉化补丁(需关闭软件).bat  # 静态打包注入 resources/app.asar（自动备份 app.asar.bak）
├── 3-一键还原原版英文.bat              # 从 app.asar.bak 一键恢复原版英文界面
├── 4-一键安装AI中文回复插件.bat        # 一键安装 AI 助手全局中文插件与 locale 配置
├── zh-cn-injector.js                   # 前端 DOM 实时中文化核心脚本与中英词条映射表
├── cdp-launcher.js                     # 基于 Chrome DevTools Protocol 的免修改注入启动器
├── asar-patcher.js                     # ASAR 自动备份、解包、注入与还原工具
└── plugin/
    └── antigravity-zh-cn/              # Antigravity 官方格式全局插件源码
        ├── plugin.json                 # 插件清单
        ├── assets/logo.svg             # 插件矢量图标
        ├── rules/AGENTS.md             # 全局 AI 中文回复与双语界面指引规则
        └── skills/zh-cn-ui/            # 中文环境检测配置技能与完整 UI 中英对照表
```

---

## 🚀 快速开始

### 一、 汉化客户端 UI 界面（3 种方式任选）

#### 方式 1：开发者工具控制台一键秒变中文（无需重启，最快预览）
1. 在 Antigravity 窗口顶部菜单点击 **`View` -> `Toggle Developer Tools`**（或按 **`Ctrl + Shift + I`**），切换到 **`Console`** 标签页。
2. 打开本仓库中的 [`zh-cn-injector.js`](./zh-cn-injector.js)，复制全部代码粘贴到 `Console` 并回车，界面立即变为中文。

#### 方式 2：免修改动态启动中文版（推荐日常使用，零风险）
1. 完全退出当前正在运行的 Antigravity 客户端。
2. 双击运行 **[`1-免修改启动中文版(推荐).bat`](./1-免修改启动中文版(推荐).bat)**。
3. 脚本会拉起客户端并自动将 [`zh-cn-injector.js`](./zh-cn-injector.js) 注入窗口，**不修改 `app.asar` 任何字节**，完全不影响客户端签名校验与自动更新。

#### 方式 3：静态写入 `app.asar` 补丁
1. 完全关闭 Antigravity 客户端。
2. 双击运行 **[`2-静态写入汉化补丁(需关闭软件).bat`](./2-静态写入汉化补丁(需关闭软件).bat)**（会自动备份 `app.asar.bak`）。
3. 如需恢复英文原版，或因客户端开启了 Electron ASAR 签名完整性校验导致无法打开，双击运行 **[`3-一键还原原版英文.bat`](./3-一键还原原版英文.bat)** 即可 1 秒还原。

---

### 二、 安装 AI 助手全局中文插件

双击运行 **[`4-一键安装AI中文回复插件.bat`](./4-一键安装AI中文回复插件.bat)**，脚本会自动将 `plugin/antigravity-zh-cn` 安装到 `~/.gemini/config/plugins/antigravity-zh-cn` 并配置 `argv.json`。

安装后可在 Antigravity 左侧栏 **`Customizations`（自定义组件）** 中随时开启或关闭 **Antigravity 简体中文语言包 (ZH-CN)**。

---

## 🛠️ 自定义与扩展词条

如果您发现有新增的英文按钮需要翻译，只需编辑 [`zh-cn-injector.js`](./zh-cn-injector.js) 中的 `EXACT_DICT` 对象，按 `'英文原词': '中文译名'` 格式添加即可（核心脚本会自动跳过 `.monaco-editor`、`pre`、`code` 等代码区域，不会影响代码显示）。
