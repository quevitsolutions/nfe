# GICLUB Logo Deploy — plink + pscp (PuTTY tools, -pw flag)
# Run from: f:\GICLUB\webapp
# Requires PuTTY installed (plink.exe + pscp.exe in PATH)

$VPS = "203.174.22.220"
$USER = "root"
$PASS = "Exitofxtrade1211#"
$REMOTE = "/root/webapp_github"

# Find plink/pscp (check common PuTTY install paths)
$puttyPaths = @(
    "C:\Program Files\PuTTY",
    "C:\Program Files (x86)\PuTTY",
    "$env:LocalAppData\Programs\PuTTY"
)
$plinkExe = $null
$pscpExe = $null
foreach ($p in $puttyPaths) {
    if (Test-Path "$p\plink.exe") { $plinkExe = "$p\plink.exe" }
    if (Test-Path "$p\pscp.exe") { $pscpExe = "$p\pscp.exe" }
}
# Also try PATH
if (-not $plinkExe) { $plinkExe = (Get-Command plink -ErrorAction SilentlyContinue)?.Source }
if (-not $pscpExe) { $pscpExe = (Get-Command pscp  -ErrorAction SilentlyContinue)?.Source }

if (-not $plinkExe -or -not $pscpExe) {
    Write-Host "ERROR: plink/pscp not found. Install PuTTY first." -ForegroundColor Red
    Write-Host "Download: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "GICLUB Logo Deploy -> VPS $VPS" -ForegroundColor Cyan
Write-Host "Using: $plinkExe" -ForegroundColor Gray
Write-Host ""

# Accept host key silently first
Write-Host "Accepting host key..." -ForegroundColor Yellow
echo "y" | & $plinkExe -ssh -pw $PASS -batch "${USER}@${VPS}" "echo ok" 2>$null | Out-Null

# Files to upload
$uploads = @(
    @{ Local = "public\giclub-logo.svg"; Remote = "${USER}@${VPS}:${REMOTE}/public/giclub-logo.svg" },
    @{ Local = "src\app\page.tsx"; Remote = "${USER}@${VPS}:${REMOTE}/src/app/page.tsx" },
    @{ Local = "src\app\dashboard\layout.tsx"; Remote = "${USER}@${VPS}:${REMOTE}/src/app/dashboard/layout.tsx" },
    @{ Local = "src\app\register\page.tsx"; Remote = "${USER}@${VPS}:${REMOTE}/src/app/register/page.tsx" }
)

Write-Host "Uploading files..." -ForegroundColor Yellow
foreach ($f in $uploads) {
    $name = Split-Path $f.Local -Leaf
    Write-Host "  $name" -ForegroundColor White
    & $pscpExe -pw $PASS -batch -q $f.Local $f.Remote
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  FAILED: $name" -ForegroundColor Red; exit 1
    }
    Write-Host "  OK" -ForegroundColor Green
}

Write-Host ""
Write-Host "Building on VPS (takes ~2 min)..." -ForegroundColor Yellow

$buildScript = "cd $REMOTE && npm install --legacy-peer-deps 2>/dev/null | tail -2 && npm run build 2>&1 | tail -15 && (pm2 restart giclub 2>/dev/null || pm2 start npm --name giclub -- start) && pm2 save && pm2 status"

& $plinkExe -ssh -pw $PASS -batch "${USER}@${VPS}" $buildScript

Write-Host ""
Write-Host "Done! App live at: http://${VPS}:3000" -ForegroundColor Green
Write-Host ""
