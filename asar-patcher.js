/**
 * Antigravity 2.0 静态 ASAR 汉化补丁与还原工具 (asar-patcher.js)
 * 支持：
 *   node asar-patcher.js --apply   (自动备份 app.asar.bak 并注入 zh-cn-injector.js)
 *   node asar-patcher.js --restore (从 app.asar.bak 一键还原原版)
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RESOURCES_DIR = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Antigravity', 'resources');
const ASAR_FILE = path.join(RESOURCES_DIR, 'app.asar');
const BACKUP_FILE = path.join(RESOURCES_DIR, 'app.asar.bak');
const TEMP_DIR = path.join(RESOURCES_DIR, '_app_zh_temp');
const INJECTOR_FILE = path.join(__dirname, 'zh-cn-injector.js');

const action = process.argv.includes('--restore') ? 'restore' : 'apply';

function findHtmlAndJsEntries(dir, results = { html: [], preload: [] }) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules') {
        findHtmlAndJsEntries(fullPath, results);
      }
    } else if (entry.name.endsWith('.html')) {
      results.html.push(fullPath);
    }
  }
  return results;
}

function restore() {
  console.log('====================================================');
  console.log('  正在还原 Antigravity 原版 app.asar');
  console.log('====================================================');
  if (!fs.existsSync(BACKUP_FILE)) {
    console.log('[!] 未找到备份文件 app.asar.bak，无需还原。');
    return;
  }
  try {
    fs.copyFileSync(BACKUP_FILE, ASAR_FILE);
    console.log(`[✓] 已成功从 ${BACKUP_FILE} 还原原版界面！`);
  } catch (err) {
    console.error('[✗] 还原失败，请确保已完全关闭 Antigravity 客户端后再试：', err.message);
  }
}

function apply() {
  console.log('====================================================');
  console.log('  Antigravity 2.0 静态 ASAR 界面汉化工具');
  console.log('====================================================');

  if (!fs.existsSync(ASAR_FILE)) {
    console.error(`[✗] 未找到目标文件: ${ASAR_FILE}`);
    process.exit(1);
  }

  // 1. 备份原版 app.asar
  if (!fs.existsSync(BACKUP_FILE)) {
    console.log('[1/4] 正在备份原版 app.asar -> app.asar.bak ...');
    fs.copyFileSync(ASAR_FILE, BACKUP_FILE);
    console.log('[✓] 原版备份完成');
  } else {
    console.log('[1/4] 检测到已有原版备份 app.asar.bak，基于原版备份进行干净解包...');
    fs.copyFileSync(BACKUP_FILE, ASAR_FILE);
  }

  // 2. 解包 app.asar
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  console.log('[2/4] 正在使用 npx @electron/asar 解包 app.asar ...');
  execSync(`npx --yes @electron/asar extract "${ASAR_FILE}" "${TEMP_DIR}"`, { stdio: 'inherit' });

  // 3. 将汉化脚本注入到所有渲染进程入口 HTML 中
  console.log('[3/4] 正在注入中文语言脚本 zh-cn-injector.js ...');
  const injectorCode = fs.readFileSync(INJECTOR_FILE, 'utf8');
  const found = findHtmlAndJsEntries(TEMP_DIR);

  let injectedCount = 0;
  for (const htmlFile of found.html) {
    let html = fs.readFileSync(htmlFile, 'utf8');
    if (!html.includes('__ANTIGRAVITY_ZH_CN_INJECTED__')) {
      const scriptTag = `\n<script>\n${injectorCode}\n</script>\n`;
      if (html.includes('</body>')) {
        html = html.replace('</body>', `${scriptTag}</body>`);
      } else {
        html += scriptTag;
      }
      fs.writeFileSync(htmlFile, html, 'utf8');
      injectedCount++;
      console.log(`  -> 已注入: ${path.relative(TEMP_DIR, htmlFile)}`);
    }
  }

  if (injectedCount === 0) {
    console.warn('[!] 未找到可注入的 HTML 文件。');
  }

  // 4. 重新打包 app.asar
  console.log('[4/4] 正在重新打包 app.asar ...');
  execSync(`npx --yes @electron/asar pack "${TEMP_DIR}" "${ASAR_FILE}" --unpack-dir "**"`, { stdio: 'inherit' });
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  console.log('\n[✓] 静态汉化补丁写入完成！');
  console.log('提示：如果客户端启用了 Electron ASAR 签名完整性校验导致无法打开，请双击运行【3-一键还原原版英文.bat】，并改用【1-免修改启动中文版(推荐).bat】。');
}

if (action === 'restore') {
  restore();
} else {
  apply();
}
