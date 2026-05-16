# Safe push: ensures GitHub auth, then pushes current branch.
$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $repoRoot

$accounts = git credential-manager github list 2>$null
if (-not $accounts) {
  Write-Host "No GitHub account in Credential Manager. Signing in..." -ForegroundColor Yellow
  git credential-manager github login
}

$staged = git diff --cached --name-only 2>$null
if ($staged -match '^node_modules/') {
  Write-Host "ERROR: node_modules is staged. Unstage it before pushing." -ForegroundColor Red
  exit 1
}

git push @args
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Push failed. Common fixes:" -ForegroundColor Yellow
  Write-Host "  1. git credential-manager github login"
  Write-Host "  2. Do not commit node_modules — run: git rm -r --cached node_modules"
  Write-Host "  3. Files over 100MB are rejected by GitHub"
  exit $LASTEXITCODE
}

Write-Host "Push succeeded." -ForegroundColor Green
