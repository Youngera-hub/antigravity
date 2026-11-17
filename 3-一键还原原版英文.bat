@echo off
chcp 65001 >nul
title Antigravity 2.0 一键还原原版英文界面
echo ============================================================
echo   请先关闭 Antigravity 客户端，按任意键将从 app.asar.bak 还原原版
echo ============================================================
pause
node "%~dp0asar-patcher.js" --restore
pause
