<#
.SYNOPSIS
    Antigravity 中文界面与本地化环境配置工具 (setup-ui-zh.ps1)
.DESCRIPTION
    检测并配置 Antigravity IDE 及 Antigravity 2.0 客户端的简体中文环境设置（argv.json、User settings、语言包检查及快捷方式）。
#>
param(
    [ValidateSet("Status", "Apply", "Reset")]
    [string]$Action = "Status",

    [switch]$CreateDesktopShortcut
)

$ErrorActionPreference = "Stop"

function Write-Section($Title) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host " $Title" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
}

# 1. 路径探测
$AppExePath = "$env:LOCALAPPDATA\Programs\Antigravity\Antigravity.exe"
$AppLocalePak = "$env:LOCALAPPDATA\Programs\Antigravity\locales\zh-CN.pak"
$DotAntigravityArgv = "$HOME\.antigravity\argv.json"
$RoamingAntigravityDir = "$env:APPDATA\Antigravity"
$RoamingUserSettings = "$env:APPDATA\Antigravity\User\settings.json"
$RoamingArgvJson = "$env:APPDATA\Antigravity\argv.json"
$PluginRuleFile = "$HOME\.gemini\config\plugins\antigravity-zh-cn\rules\AGENTS.md"

function Show-Status {
    Write-Section "Antigravity 简体中文环境诊断 (Status)"

    # 检查 AI 插件规则
    if (Test-Path $PluginRuleFile) {
        Write-Host "[✓] AI 助手中文交互规则: 已安装 ($PluginRuleFile)" -ForegroundColor Green
    } else {
        Write-Host "[!] AI 助手中文交互规则: 未找到" -ForegroundColor Yellow
    }

    # 检查客户端安装与 zh-CN.pak
    if (Test-Path $AppExePath) {
        Write-Host "[✓] Antigravity 客户端程序: 已找到 ($AppExePath)" -ForegroundColor Green
    } else {
        Write-Host "[i] Antigravity 客户端程序: 未在默认路径找到 ($AppExePath)" -ForegroundColor Gray
    }

    if (Test-Path $AppLocalePak) {
        Write-Host "[✓] Chromium/Electron 简体中文语言包 (zh-CN.pak): 已内置" -ForegroundColor Green
    }

    # 检查 argv.json
    foreach ($argvPath in @($DotAntigravityArgv, $RoamingArgvJson)) {
        if (Test-Path $argvPath) {
            try {
                $raw = Get-Content $argvPath -Raw -Encoding UTF8
                # 去除简单注释行后解析
                $clean = ($raw -split "`r?`n" | Where-Object { $_ -notmatch '^\s*//' }) -join "`n"
                $json = $clean | ConvertFrom-Json
                Write-Host "[✓] 配置文件 $argvPath -> locale = '$($json.locale)'" -ForegroundColor Green
            } catch {
                Write-Host "[!] 配置文件 $argvPath 存在但解析异常: $($_.Exception.Message)" -ForegroundColor Yellow
            }
        } else {
            Write-Host "[i] 配置文件 $argvPath : 尚未创建" -ForegroundColor Gray
        }
    }
}

function Set-JsonLocale($FilePath, $LocaleValue) {
    $parent = Split-Path -Parent $FilePath
    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }

    $obj = @{}
    if (Test-Path $FilePath) {
        try {
            $raw = Get-Content $FilePath -Raw -Encoding UTF8
            $clean = ($raw -split "`r?`n" | Where-Object { $_ -notmatch '^\s*//' }) -join "`n"
            if ($clean.Trim().Length -gt 0) {
                $parsed = $clean | ConvertFrom-Json
                foreach ($prop in $parsed.PSObject.Properties) {
                    $obj[$prop.Name] = $prop.Value
                }
            }
        } catch {
            # 若原文件不可解析，备份原文件
            Copy-Item $FilePath "$FilePath.bak" -Force
        }
    }

    if ($null -eq $LocaleValue) {
        $obj.Remove("locale")
    } else {
        $obj["locale"] = $LocaleValue
    }

    $jsonOut = $obj | ConvertTo-Json -Depth 5
    Set-Content -Path $FilePath -Value $jsonOut -Encoding UTF8
    Write-Host "[✓] 已更新语言配置: $FilePath (locale=$LocaleValue)" -ForegroundColor Green
}

if ($Action -eq "Status") {
    Show-Status
    exit 0
}

if ($Action -eq "Apply") {
    Write-Section "正在应用 Antigravity 简体中文配置 (Apply)"

    # 1. 写入 ~/.antigravity/argv.json 与 %APPDATA%/Antigravity/argv.json
    Set-JsonLocale -FilePath $DotAntigravityArgv -LocaleValue "zh-cn"
    if (Test-Path $RoamingAntigravityDir) {
        Set-JsonLocale -FilePath $RoamingArgvJson -LocaleValue "zh-cn"
    }

    # 2. 如果用户指定创建桌面快捷方式（带 --lang=zh-CN 参数）
    if ($CreateDesktopShortcut -and (Test-Path $AppExePath)) {
        $DesktopDir = [Environment]::GetFolderPath("Desktop")
        $ShortcutPath = Join-Path $DesktopDir "Antigravity (简体中文).lnk"
        $WshShell = New-Object -ComObject WScript.Shell
        $Shortcut = $WshShell.CreateShortcut($ShortcutPath)
        $Shortcut.TargetPath = $AppExePath
        $Shortcut.Arguments = "--lang=zh-CN --locale=zh-CN"
        $Shortcut.WorkingDirectory = Split-Path -Parent $AppExePath
        $Shortcut.Description = "以简体中文区域设置启动 Antigravity"
        $Shortcut.Save()
        Write-Host "[✓] 已在桌面创建中文启动快捷方式: $ShortcutPath" -ForegroundColor Green
    }

    Show-Status
    Write-Host "`n提示: AI 助手中文规则已实时生效；客户端 UI 语言配置在重启 Antigravity 后生效。" -ForegroundColor Cyan
    exit 0
}

if ($Action -eq "Reset") {
    Write-Section "正在还原默认英文区域配置 (Reset)"
    if (Test-Path $DotAntigravityArgv) {
        Set-JsonLocale -FilePath $DotAntigravityArgv -LocaleValue "en"
    }
    if (Test-Path $RoamingArgvJson) {
        Set-JsonLocale -FilePath $RoamingArgvJson -LocaleValue "en"
    }
    Show-Status
    exit 0
}
