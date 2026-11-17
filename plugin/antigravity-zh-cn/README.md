# Antigravity 简体中文语言包插件 (`antigravity-zh-cn`)

本插件为 **Google Antigravity (IDE & 2.0)** 提供一站式简体中文本地化支持，包含 **AI 助手全局中文交互规则** 与 **客户端 UI 界面中文配置工具**。

## 组件包含内容

1. **全局中文交互规则 (`rules/AGENTS.md`)**
   - 自动将 AI 助手的日常对话、规划与总结文档（Artifacts）、代码注释、命令行解读设为**简体中文（zh-CN）**。
   - 当提及 Antigravity 界面菜单、设置项或面板时，自动提供**中英双语对照指引**。
   - 随插件启用实时生效，无需重启；在插件管理页关闭插件即可随时恢复默认英文。

2. **客户端 UI 汉化配置技能 (`skills/zh-cn-ui/`)**
   - `scripts/setup-ui-zh.ps1`：自动写入 `~/.antigravity/argv.json` 与 `%APPDATA%\Antigravity\argv.json` 的 `"locale": "zh-cn"` 配置，并支持生成带 `--lang=zh-CN --locale=zh-CN` 启动参数的桌面快捷方式。
   - `references/ui-glossary.md`：完整的 Antigravity 2.0 与 IDE 界面菜单、设置项、权限策略、斜杠命令中英对照词典。

## 如何使用

- **管理开关**：在 Antigravity 左侧栏打开 **Skills & Customizations（技能与自定义组件）** -> 找到 **Antigravity 简体中文语言包 (ZH-CN)** 即可一键启用或禁用。
- **快捷指令**：直接对 AI 说：
  - *“检查并配置 Antigravity 客户端 UI 界面中文化设置”*
  - *“展示 Antigravity 2.0 与 IDE 完整中英界面菜单对照表”*
  - *“切换中文回复模式（纯中文 / 中英双语术语保留）”*
