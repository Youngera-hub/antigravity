# Antigravity 2.0 & IDE 界面中英完整对照指南 (UI Glossary)

本字典涵盖 **Antigravity 2.0 桌面端** 与 **Antigravity IDE** 的全部核心界面模块，供用户查阅或供 AI 助手在回答界面操作问题时引用。

---

## 一、 左侧导航栏 (Left-hand Sidebar)

| 英文界面原词 | 中文标准译名 | 功能说明 |
| :--- | :--- | :--- |
| **New Conversation** | **新建对话** | 开启一个新的 AI 智能体对话会话 |
| **Projects** | **项目工作区** | 管理和切换不同的代码仓库或本地工作目录 |
| **Scheduled Tasks** | **定时任务** | 查看和管理周期性后台任务（Cron）与一次性延时定时器 |
| **Skills & Customizations** | **技能与自定义组件** | 查看、安装、启用或禁用插件（Plugins）、技能（Skills）、规则（Rules）与 MCP 服务 |
| **Settings** | **设置** | 配置全局与项目级应用偏好、模型选择及安全权限 |

---

## 二、 聊天主画布 (Chat Canvas)

| 英文界面原词 | 中文标准译名 | 功能说明 |
| :--- | :--- | :--- |
| **Slash Commands (`/`)** | **斜杠命令 (`/`)** | 输入 `/` 唤起内置工作流菜单（如 `/plan`、`/goal`、`/boost`、`/plugin` 等） |
| **@ Mentions (`@`)** | **@ 引用上下文 (`@`)** | 输入 `@` 附加文件、目录、历史会话、终端输出、规则或 MCP 工具作为上下文 |
| **Model Selection** | **模型切换器** | 在输入框旁选择当前对话使用的 Gemini 模型版本 |
| **Proceed / Approve** | **继续执行 / 批准** | 确认执行实施计划（Plan）或批准敏感终端命令 |

---

## 三、 右侧辅助面板 (Auxiliary Pane)

| 英文界面原词 | 中文标准译名 | 功能说明 |
| :--- | :--- | :--- |
| **Subagents** | **子智能体** | 监控后台并行运行的子智能体（如 Browser 浏览器代理、Research 调研代理）状态 |
| **Background Tasks** | **后台任务** | 查看后台执行的命令、长时开发服务器进程或工作流脚本输出 |
| **Artifacts** | **生成构件 / 文档** | 查看智能体生成的结构化文档（实施计划、任务清单、报告、对比图等） |
| **Files Changed** | **变更文件** | 查看当前会话中智能体新增、修改或删除的代码文件 Diff 对比 |
| **Terminals** | **终端会话** | 查看智能体执行命令的终端历史与实时输出 |

---

## 四、 全局与项目设置 (Settings & Permissions)

### 1. 全局设置 (Global Settings)

| 英文设置项 | 中文标准译名 | 选项值中英对照与说明 |
| :--- | :--- | :--- |
| **Model Selection** | **模型选择** | 切换默认 Gemini 模型（Flash 极速版 / Pro 专业版 / Argon 等） |
| **Tool Execution Policy** | **工具执行策略** | `always-proceed`（始终自动执行）、`request-review`（需人工审批）、`strict`（严格审批）、`proceed-in-sandbox`（沙箱内自动执行） |
| **Terminal Sandbox** | **终端安全沙箱** | 开启后，智能体的终端命令将在受限隔离沙箱中运行 |
| **Non-Workspace File Access** | **非工作区文件访问** | 控制是否允许读写当前项目目录之外的文件：`allow`（允许）、`ask`（每次询问）、`deny`（拒绝） |
| **Internet Access Policy** | **网络访问策略** | 控制智能体是否允许发起网络请求：`allow`（允许）、`ask`（询问）、`deny`（拒绝） |
| **Permission Grants** | **权限授权记录** | 管理特定文件路径、命令和域名的永久允许/拒绝规则 |
| **Command Allowlist / Denylist** | **命令白名单 / 黑名单** | 配置始终允许自动执行或始终拦截的终端命令列表 |
| **Browser Allowlist** | **浏览器域名白名单** | 限制 Browser 子智能体可访问的网站域名范围 |
| **Notifications** | **系统通知** | 任务完成或需要人工确认时发送桌面系统通知 |
| **Appearance** | **外观设置** | 切换浅色/深色主题（Theme Mode）与对话区域宽度（Conversation Width） |
| **App Settings** | **应用常驻设置** | 包含防止系统休眠（Keep computer awake）、后台驻留运行（Run in background）、自动检查更新（Auto-check for updates） |

### 2. 项目级设置 (Project-Level Settings)

| 英文设置项 | 中文标准译名 | 功能说明 |
| :--- | :--- | :--- |
| **File Access Policy** | **项目文件访问策略** | 覆盖全局的非工作区文件访问策略 |
| **Internet Access Policy** | **项目网络访问策略** | 覆盖全局的网络访问策略 |
| **Sandbox Mode** | **项目沙箱模式** | 针对当前项目单独开启或关闭终端沙箱 |
| **Auto-Execution Policy** | **项目自动执行策略** | 覆盖全局的工具执行审批策略 |

---

## 五、 常用斜杠命令中英对照 (Slash Commands)

| 命令 | 中文名称 | 适用场景说明 |
| :--- | :--- | :--- |
| `/plan` | **分步规划模式** | 在动手改代码前，先生成详细实施计划供您审阅确认 |
| `/goal` | **目标死磕模式** | 适合长时复杂任务，智能体会持续迭代验证直至完全达成目标 |
| `/boost` | **深度增强模式** | 启用深度思考、多视角分析与严格验证，适合疑难杂症或核心架构设计 |
| `/teamwork` | **多智能体协作** | 启动多个自治智能体分工协作完成大型项目 |
| `/grill-me` | **需求对齐访谈** | 通过互动提问帮您梳理模糊的设计决策与需求细节 |
| `/browser` | **内置浏览器交互** | 启动浏览器子智能体进行网页交互、自动化测试或页面检查 |
| `/schedule` | **定时与周期任务** | 创建定时提醒或周期性自动执行的任务 |
| `/compact` | **上下文压缩** | 当对话过长时压缩历史上下文，释放 Token 空间 |
| `/learn` | **经验固化学习** | 将当前的排错经验或偏好总结并持久化为长期规则/技能 |
| `/plugin` | **插件管理** | 创建、安装、启用或管理 Antigravity 插件 |
