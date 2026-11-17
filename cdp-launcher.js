/**
 * Antigravity 2.0 零修改动态汉化启动器 (cdp-launcher.js)
 * 作用：不修改 app.asar 的任何字节（避免破坏 Electron 签名校验），
 *       通过标准调试端口连接客户端窗口并自动注入 zh-cn-injector.js。
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 9229;
const APP_PATH = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Antigravity', 'Antigravity.exe');
const INJECTOR_PATH = path.join(__dirname, 'zh-cn-injector.js');
const injectorCode = fs.readFileSync(INJECTOR_PATH, 'utf8');

function fetchTargets() {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${PORT}/json`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(1500, () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

async function injectViaWebSocket(wsUrl, title) {
  // Node 22+ 原生支持全局 WebSocket
  if (typeof WebSocket === 'undefined') {
    console.error('[!] 当前 Node.js 版本不支持原生 WebSocket，请使用 Node.js 20+ 或使用静态补丁模式。');
    return false;
  }
  return new Promise((resolve) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      // 1. 注册页面刷新/新建时自动注入
      ws.send(JSON.stringify({
        id: 1,
        method: 'Page.enable',
        params: {}
      }));
      ws.send(JSON.stringify({
        id: 2,
        method: 'Page.addScriptToEvaluateOnNewDocument',
        params: { source: injectorCode }
      }));
      // 2. 立即在当前打开的页面执行汉化
      ws.send(JSON.stringify({
        id: 3,
        method: 'Runtime.evaluate',
        params: { expression: injectorCode }
      }));
      setTimeout(() => {
        ws.close();
        resolve(true);
      }, 300);
    };
    ws.onerror = () => resolve(false);
  });
}

async function main() {
  console.log('====================================================');
  console.log('  Antigravity 2.0 界面中文动态注入器 (免修改安装文件)');
  console.log('====================================================');

  let targets = null;
  try {
    targets = await fetchTargets();
  } catch (_) {
    console.log(`[1/2] 正在以调试模式启动 Antigravity (--remote-debugging-port=${PORT})...`);
    if (!fs.existsSync(APP_PATH)) {
      console.error(`[!] 未找到客户端程序: ${APP_PATH}`);
      process.exit(1);
    }
    const child = spawn(APP_PATH, [`--remote-debugging-port=${PORT}`, '--lang=zh-CN'], {
      detached: true,
      stdio: 'ignore'
    });
    child.unref();
  }

  console.log('[2/2] 正在等待客户端界面加载并注入中文语言包...');
  const injectedIds = new Set();

  for (let i = 0; i < 30; i++) {
    try {
      targets = await fetchTargets();
      const pages = targets.filter((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      for (const page of pages) {
        if (!injectedIds.has(page.id)) {
          const ok = await injectViaWebSocket(page.webSocketDebuggerUrl, page.title);
          if (ok) {
            injectedIds.add(page.id);
            console.log(`[✓] 已成功汉化窗口: "${page.title || page.url}"`);
          }
        }
      }
      if (injectedIds.size > 0 && i > 3) {
        console.log('\n[完成] 界面已完成中文化！您可以关闭本命令行窗口。');
        process.exit(0);
      }
    } catch (_) {
      // 继续等待端口就绪
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (injectedIds.size === 0) {
    console.log('\n[!] 未检测到开启调试端口的窗口。请先完全退出 Antigravity（包括系统托盘图标），然后再双击运行本脚本！');
  }
}

main();
