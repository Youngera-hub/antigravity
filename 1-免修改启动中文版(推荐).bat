@echo off
chcp 65001 >nul
title Antigravity 2.0 中文版启动器 (免修改安装文件)
echo ============================================================
echo   重要提示：
echo   请先完全退出正在运行的 Antigravity 客户端（包括右下角托盘）
echo   然后再按任意键启动中文版！
echo ============================================================
pause
node "%~dp0cdp-launcher.js"
pause
