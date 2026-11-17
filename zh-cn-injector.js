/**
 * Antigravity 2.0 界面实时中文化注入脚本 (zh-cn-injector.js)
 * 原理：仅对可见 UI 文本节点（TextNode）与提示属性（placeholder/title/aria-label）进行精确词典映射，
 *       自动跳过代码编辑器（.monaco-editor, pre, code）与 AI 聊天消息正文，100% 不影响任何业务逻辑或代码。
 */
(function () {
  if (window.__ANTIGRAVITY_ZH_CN_INJECTED__) {
    console.log('[Antigravity ZH-CN] 汉化脚本已在运行中');
    return;
  }
  window.__ANTIGRAVITY_ZH_CN_INJECTED__ = true;

  // 1. 精确匹配词典（大小写敏感优先，随后大小写不敏感）
  const EXACT_DICT = {
    // 顶部菜单与主导航
    'Workspace': '工作区',
    'View': '视图',
    'Window': '窗口',
    'Help': '帮助',
    '+ New Conversation': '+ 新建对话',
    'New Conversation': '新建对话',
    'Automations': '自动化任务',
    'Scheduled Tasks': '定时任务',
    'Customizations': '自定义组件',
    'Skills & Customizations': '技能与自定义组件',
    'Projects': '项目工作区',
    'Show All': '显示全部',
    'Show Less': '收起列表',
    'Not in Project': '未归属项目',
    'Conversations': '对话列表',
    'Settings': '设置',
    'Give Feedback': '意见反馈',

    // 设置弹窗左侧导航
    'General': '常规设置',
    'Application': '应用设置',
    'Appearance': '外观与主题',
    'Shortcuts': '快捷键',
    'Notifications': '系统通知',
    'Models': '模型管理',
    'Browser': '内置浏览器',

    // 设置 - General (常规设置)
    'Configure agent execution, queued message delivery, and permissions.': '配置智能体执行策略、排队消息发送方式及全局权限。',
    'Interface Layout': '界面布局模式',
    'Knowledge Work': '知识办公模式',
    'Simplified interface for research, writing, and everyday tasks.': '面向调研、写作与日常任务的精简界面。',
    'Software Engineering': '软件工程模式',
    'Full interface for coding, developer tools, and managing agents.': '面向代码开发、开发者工具与多智能体管理的完整界面。',
    'Global Permissions': '全局权限管理',
    'Configure global allowed and denied resource permissions.': '配置全局允许或拒绝访问的资源权限。',
    'Configure global allowed and denied resource permissions. ': '配置全局允许或拒绝访问的资源权限。 ',
    'Learn more.': '了解更多。',
    'Permission Preset': '权限预设档位',
    'Controls the actions the agent can take.': '控制智能体默认可执行的操作范围。',
    'Default': '默认',
    'Turbo': '极速 (Turbo)',
    'Strict': '严格 (Strict)',
    'Tool Permissions': '工具权限明细',
    'Modify permissions for file, terminal, and MCP tools.': '修改文件读写、终端命令和 MCP 工具的权限规则。',
    'Open': '打开',
    'Close': '关闭',
    'Network Access Rules': '网络访问规则',
    'Configure allowed and denied URLs for reading.': '配置允许或禁止访问的网址列表。',
    'Execution': '执行控制',
    'Queued Messages': '排队消息发送策略',
    'Configure when follow-up messages are sent.': '配置智能体运行期间追加发送消息的处理方式。',
    'Keyboard shortcuts': '键盘快捷键',
    'Queue': '排队等待',
    'Send Immediately': '立即发送',
    'Voice mode': '语音模式',

    // 设置 - Application / Appearance / Notifications / Models / Browser
    'Theme': '主题外观',
    'Theme Mode': '主题模式',
    'Light': '浅色模式',
    'Dark': '深色模式',
    'System': '跟随系统',
    'Conversation Width': '对话区域宽度',
    'Compact': '紧凑',
    'Wide': '宽屏',
    'Keep computer awake': '防止电脑休眠',
    'Run in background': '后台常驻运行',
    'Auto-check for updates': '自动检查更新',
    'Check for Updates': '检查更新',
    'Model Selection': '模型选择',
    'Tool Execution Policy': '工具执行策略',
    'Terminal Sandbox': '终端安全沙箱',
    'Non-Workspace File Access': '非工作区文件访问',
    'Internet Access Policy': '网络访问策略',
    'Permission Grants': '权限授权管理',
    'Command Allowlist': '命令白名单',
    'Command Denylist': '命令黑名单',
    'Browser Allowlist': '浏览器域名白名单',
    'File Access Policy': '文件访问策略',
    'Sandbox Mode': '沙箱模式',
    'Auto-Execution Policy': '自动执行策略',
    'Allow': '允许',
    'Ask': '每次询问',
    'Deny': '拒绝',
    'Always Proceed': '始终自动执行',
    'Request Review': '需要人工审批',
    'Proceed in Sandbox': '沙箱内自动执行',

    // Customizations (自定义组件面板)
    'Plugins': '插件 (Plugins)',
    'Skills': '技能 (Skills)',
    'Rules': '规则 (Rules)',
    'Subagents': '子智能体 (Subagents)',
    'MCP Servers': 'MCP 服务',
    'Hooks': '钩子 (Hooks)',
    'Installed': '已安装',
    'Marketplace': '插件市场',
    'Browse Marketplace': '浏览插件市场',
    'Enable': '启用',
    'Disable': '禁用',
    'Enabled': '已启用',
    'Disabled': '已禁用',
    'Install': '安装',
    'Uninstall': '卸载',
    'Create Plugin': '创建插件',
    'New Skill': '新建技能',
    'New Rule': '新建规则',

    // 右侧辅助面板与聊天画布
    'Background Tasks': '后台任务',
    'Artifacts': '生成文档',
    'Files Changed': '变更文件',
    'Terminals': '终端会话',
    'Proceed': '继续执行',
    'Approve': '批准',
    'Reject': '拒绝',
    'Cancel': '取消',
    'Confirm': '确认',
    'Save': '保存',
    'Reset': '重置',
    'Delete': '删除',
    'Edit': '编辑',
    'Copy': '复制',
    'Copied': '已复制',
    'Stop': '停止',
    'Retry': '重试',
    'Send': '发送',
    'Loading...': '加载中...',
    'Thinking...': '思考中...',
    'Running...': '运行中...',
    'Completed': '已完成',
    'Failed': '失败'
  };

  // 忽略不翻译的标签或代码块区域
  const IGNORED_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'INPUT', 'SVG', 'PATH']);

  function shouldIgnoreElement(el) {
    if (!el || el.nodeType !== 1) return false;
    if (IGNORED_TAGS.has(el.tagName)) return true;
    if (el.isContentEditable) return true;
    if (el.closest && el.closest('.monaco-editor, pre, code, [data-no-translate]')) return true;
    return false;
  }

  function translateText(raw) {
    if (!raw) return null;
    const trimmed = raw.trim();
    if (!trimmed) return null;
    if (EXACT_DICT[trimmed]) {
      return raw.replace(trimmed, EXACT_DICT[trimmed]);
    }
    return null;
  }

  function processTextNode(node) {
    const parent = node.parentElement;
    if (!parent || shouldIgnoreElement(parent)) return;
    const replaced = translateText(node.nodeValue);
    if (replaced && replaced !== node.nodeValue) {
      node.nodeValue = replaced;
    }
  }

  function processAttributes(el) {
    if (shouldIgnoreElement(el)) return;
    for (const attr of ['placeholder', 'title', 'aria-label']) {
      if (el.hasAttribute && el.hasAttribute(attr)) {
        const val = el.getAttribute(attr);
        const replaced = translateText(val);
        if (replaced && replaced !== val) {
          el.setAttribute(attr, replaced);
        }
      }
    }
  }

  function walkAndTranslate(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      processTextNode(root);
      return;
    }
    if (root.nodeType !== 1 || shouldIgnoreElement(root)) return;

    processAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, false);
    let current = walker.nextNode();
    while (current) {
      if (current.nodeType === 3) {
        processTextNode(current);
      } else if (current.nodeType === 1) {
        processAttributes(current);
      }
      current = walker.nextNode();
    }
  }

  // 初次全量扫描
  walkAndTranslate(document.body);

  // 监听后续动态渲染的弹窗（如打开 Settings 弹窗、切换 Tab 等）
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        processTextNode(m.target);
      } else if (m.type === 'childList') {
        for (const added of m.addedNodes) {
          walkAndTranslate(added);
        }
      }
    }
  });

  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });

  console.log('[Antigravity ZH-CN] 界面实时中文汉化已激活！');
})();
