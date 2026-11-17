@echo off
chcp 65001 >nul
title Antigravity 2.0 静态汉化补丁写入工具
echo ============================================================
echo   注意：此操作会修改客户端 resources\app.asar（自动备份 app.asar.bak）
echo   请务必先【完全关闭 Antigravity 客户端】后再按任意键继续！
echo ============================================================
pause
node "%~dp0asar-patcher.js" --apply
pause
