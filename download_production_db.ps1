# Download Production Database
# Run this from your local PC to download the production database

param(
    [string]$Server = "user@bioxb.tech-iitb.org",
    [string]$RemotePath = "/var/www/biox/backend",
    [string]$Output = ".\production_backup"
)

Write-Host "📥 Production Database Download Tool" -ForegroundColor Green
Write-Host ""

# Create output directory
if (-not (Test-Path $Output)) {
    New-Item -ItemType Directory -Path $Output | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Host "Step 1: Downloading database file..." -ForegroundColor Cyan
$dbFile = "$Output\db_$timestamp.sqlite3"

# Download database using SCP
scp "${Server}:${RemotePath}/db.sqlite3" $dbFile

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database downloaded: $dbFile" -ForegroundColor Green
    
    # Get file size
    $size = (Get-Item $dbFile).Length / 1MB
    Write-Host "   Size: $([math]::Round($size, 2)) MB" -ForegroundColor White
}
else {
    Write-Host "❌ Failed to download database" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Downloading media files..." -ForegroundColor Cyan
$mediaFolder = "$Output\media_$timestamp"

# Download media folder
scp -r "${Server}:${RemotePath}/media" $mediaFolder

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Media files downloaded: $mediaFolder" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Media files download failed (might not exist)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Download Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 What to do next:" -ForegroundColor Cyan
Write-Host "  1. Install DB Browser for SQLite: https://sqlitebrowser.org/" -ForegroundColor White
Write-Host "  2. Open: $dbFile" -ForegroundColor White
Write-Host "  3. Browse tables: api_event, api_eventregistration, etc." -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Remember: This is a COPY of production data" -ForegroundColor Yellow
Write-Host "   - Keep it secure (contains user data)" -ForegroundColor Yellow
Write-Host "   - Don't commit to git" -ForegroundColor Yellow
Write-Host "   - Don't upload back to production" -ForegroundColor Yellow
Write-Host ""
