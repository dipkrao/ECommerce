# Run once per clone: enables pre-commit checks (blocks node_modules & huge files).
$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $repoRoot

git config core.hooksPath .githooks
if ($IsWindows -or $env:OS -match "Windows") {
  # Git for Windows runs hooks with sh; ensure executable bit when possible.
  git update-index --chmod=+x .githooks/pre-commit 2>$null
}

Write-Host "Git hooks installed (.githooks/pre-commit active)." -ForegroundColor Green
Write-Host ""
Write-Host "GitHub HTTPS auth (one-time):" -ForegroundColor Cyan
Write-Host "  git credential-manager github login"
Write-Host "  (Use a Personal Access Token if prompted - not your GitHub password.)"
Write-Host ""
