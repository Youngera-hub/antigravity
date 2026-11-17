# Antigravity 全局简体中文语言规则 (ZH-CN Language Rules)

你必须始终遵循以下简体中文交互与本地化规范（除非用户在当前指令中明确要求使用其他语言）：

## 1. 对话与回复语言
- **默认使用简体中文（zh-CN）**：所有日常对话、问题解答、架构分析、调试说明、执行步骤总结以及向用户提出的选择题（`ask_question`）均必须使用自然、专业、流畅的简体中文。
- **专业技术术语处理**：对于通用的编程专有名词（如 `Hook`、`MCP`、`Subagent`、`Token`、`Promise`、API 名称、命令行标志等），保留英文原词或采用“中文（English）”的形式，避免生硬直译导致歧义。

## 2. 生成文档与构件 (Artifacts)
- 当创建或更新任何 Artifact 文档（如实施计划 `implementation_plan.md`、任务清单 `task.md`、演练总结 `walkthrough.md` 或分析报告）时，正文、标题、表格及 Mermaid 流程图节点说明均应使用**简体中文**编写。

## 3. 代码与注释规范
- 在编写新代码或解释现有代码时，新增的说明性注释（Comments）和文档字符串（Docstrings）默认使用**简体中文**（若当前项目代码库已有明确的纯英文 Linter 强制约束则遵循项目约束）。
- Git 提交信息建议（Commit Message）或命令行工具输出解读默认提供中文说明。

## 4. Antigravity 界面元素中英双语指引
当向用户指引 Antigravity 2.0 或 Antigravity IDE 的界面功能、菜单或设置项时，必须同时附带对应的**中文名称**，帮助用户在英文或汉化界面下快速定位：
- `New Conversation` -> **新建对话 (New Conversation)**
- `Projects` -> **项目工作区 (Projects)**
- `Scheduled Tasks` -> **定时任务 (Scheduled Tasks)**
- `Skills & Customizations` -> **技能与自定义组件 (Skills & Customizations)**
- `Settings` -> **设置 (Settings)**
  - `Model Selection` -> **模型选择 (Model Selection)**
  - `Tool Execution Policy` -> **工具执行策略 (Tool Execution Policy)**
  - `Terminal Sandbox` -> **终端沙箱 (Terminal Sandbox)**
  - `Non-Workspace File Access` -> **非工作区文件访问权限 (Non-Workspace File Access)**
  - `Internet Access Policy` -> **网络访问策略 (Internet Access Policy)**
  - `Permission Grants` -> **权限授权管理 (Permission Grants)**
- 辅助面板（Auxiliary Pane）：
  - `Subagents` -> **子智能体 (Subagents)**
  - `Background Tasks` -> **后台任务 (Background Tasks)**
  - `Artifacts` -> **生成构件/文档 (Artifacts)**
  - `Files Changed` -> **变更文件 (Files Changed)**
  - `Terminals` -> **终端会话 (Terminals)**
