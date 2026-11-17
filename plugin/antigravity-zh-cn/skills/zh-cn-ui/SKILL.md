---
name: zh-cn-ui
description: 配置和管理 Antigravity（IDE 与 2.0 桌面端）的简体中文界面环境（argv.json、VS Code 中文语言包、Electron 启动区域设置）以及 AI 回复语言模式，并提供完整的中英 UI 界面术语对照字典。当用户询问如何将 Antigravity 界面或语言设置为中文、排查界面未汉化问题或查询菜单中文含义时使用。
---

# Antigravity 简体中文界面与语言配置技能 (zh-cn-ui)

本技能用于帮助用户配置 **Antigravity IDE** 与 **Antigravity 2.0 桌面客户端** 的中文界面环境，以及切换 AI 助手的中文回复细节模式。

## 1. 功能概览与使用场景

1. **检查与一键配置中文 UI 环境 (`scripts/setup-ui-zh.ps1`)**
   - 自动检测本机安装的 Antigravity 2.0 和 Antigravity IDE 路径。
   - 配置运行时语言环境参数（`argv.json` 中的 `"locale": "zh-cn"`）。
   - 对于基于 VS Code 的 Antigravity IDE，支持自动检测并安装官方简体中文语言包扩展（`MS-CEINTL.vscode-language-pack-zh-hans`）。
   - 支持创建带有 `--lang=zh-CN` 参数的 Antigravity 中文启动快捷方式。
2. **中英 UI 界面术语完整对照表 (`references/ui-glossary.md`)**
   - 当用户询问某个设置项在哪、某个英文按钮是什么意思，或者希望渲染交互式中文速查面板时，请读取 [references/ui-glossary.md](references/ui-glossary.md)。

## 2. 执行配置脚本指南

在 PowerShell 中运行内置脚本（位于当前技能目录的 `scripts/setup-ui-zh.ps1`）：

```powershell
# 1. 仅检查当前中文环境配置状态（只读诊断）
powershell -ExecutionPolicy Bypass -File "$HOME\.gemini\config\plugins\antigravity-zh-cn\skills\zh-cn-ui\scripts\setup-ui-zh.ps1" -Action Status

# 2. 一键写入 locale 配置（argv.json）并配置中文环境
powershell -ExecutionPolicy Bypass -File "$HOME\.gemini\config\plugins\antigravity-zh-cn\skills\zh-cn-ui\scripts\setup-ui-zh.ps1" -Action Apply

# 3. 在桌面生成带强制中文 Locale 参数的快捷方式（可选）
powershell -ExecutionPolicy Bypass -File "$HOME\.gemini\config\plugins\antigravity-zh-cn\skills\zh-cn-ui\scripts\setup-ui-zh.ps1" -Action Apply -CreateDesktopShortcut

# 4. 还原默认英文环境
powershell -ExecutionPolicy Bypass -File "$HOME\.gemini\config\plugins\antigravity-zh-cn\skills\zh-cn-ui\scripts\setup-ui-zh.ps1" -Action Reset
```

## 3. 切换 AI 中文回复风格

如果用户希望调整 AI 助手的中文风格（例如：**纯中文模式** vs **保留英文技术术语模式** vs **双语对照教学模式**），直接编辑插件规则文件：
- 规则文件路径：`~/.gemini/config/plugins/antigravity-zh-cn/rules/AGENTS.md`
- 修改后无需重启客户端，下一轮对话立即生效。
