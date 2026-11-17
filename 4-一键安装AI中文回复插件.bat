@echo off
chcp 65001 >nul
title 一键安装 Antigravity AI 中文交互插件
echo ============================================================
echo   正在将 Antigravity 简体中文插件安装到全局目录:
echo   %USERPROFILE%\.gemini\config\plugins\antigravity-zh-cn
echo ============================================================

set "TARGET_DIR=%USERPROFILE%\.gemini\config\plugins\antigravity-zh-cn"
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"

xcopy /E /I /Y "%~dp0plugin\antigravity-zh-cn\*" "%TARGET_DIR%\" >nul

echo.
echo [✓] AI 助手中文交互插件安装完成！
echo 正在配置客户端默认中文 Locale (argv.json)...
powershell -ExecutionPolicy Bypass -File "%TARGET_DIR%\skills\zh-cn-ui\scripts\setup-ui-zh.ps1" -Action Apply

echo.
echo ============================================================
echo   全部安装完成！请在 Antigravity 左侧 Customizations 中查看。
echo ============================================================
pause
