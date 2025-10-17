# Safe Local Commit Script
# Run this on your Windows PC before deploying

Write-Host "🔒 Safe Commit Script - Database Protection" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "backend\db.sqlite3")) {
    Write-Host "❌ Error: Not in project root directory" -ForegroundColor Red
    Write-Host "Please run this from: E:\ITC\biox\biox" -ForegroundColor Yellow
    exit 1
}

# Step 1: Verify database is not staged
Write-Host "Step 1: Checking if database is staged..." -ForegroundColor Cyan
$stagedFiles = git diff --cached --name-only
if ($stagedFiles -match "db.sqlite3") {
    Write-Host "❌ ERROR: Database file is staged!" -ForegroundColor Red
    Write-Host "Unstaging database..." -ForegroundColor Yellow
    git reset backend/db.sqlite3
    Write-Host "✅ Database unstaged" -ForegroundColor Green
}
else {
    Write-Host "✅ Database not staged (good!)" -ForegroundColor Green
}
Write-Host ""

# Step 2: Verify media files are not staged
Write-Host "Step 2: Checking if media files are staged..." -ForegroundColor Cyan
if ($stagedFiles -match "media/") {
    Write-Host "❌ WARNING: Media files are staged!" -ForegroundColor Red
    Write-Host "Unstaging media files..." -ForegroundColor Yellow
    git reset backend/media/
    Write-Host "✅ Media files unstaged" -ForegroundColor Green
}
else {
    Write-Host "✅ Media files not staged (good!)" -ForegroundColor Green
}
Write-Host ""

# Step 3: Show what will be committed
Write-Host "Step 3: Files to be committed:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Step 4: Verify with user
Write-Host "Review the files above. They should be CODE ONLY (no db.sqlite3 or media/)." -ForegroundColor Yellow
$continue = Read-Host "Continue with commit? (y/n)"
if ($continue -ne "y") {
    Write-Host "Commit cancelled." -ForegroundColor Yellow
    exit 0
}

# Step 5: Commit
$commitMessage = Read-Host "Enter commit message"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    Write-Host "❌ Commit message cannot be empty" -ForegroundColor Red
    exit 1
}

git add biox-frontend/src/
git add backend/api/
git add backend/crud/
git add *.md
git commit -m "$commitMessage"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Commit successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Push to GitHub: git push origin master" -ForegroundColor White
    Write-Host "2. SSH to production server" -ForegroundColor White
    Write-Host "3. Run: bash deploy_production.sh" -ForegroundColor White
    Write-Host ""
    Write-Host "Database Protection Summary:" -ForegroundColor Green
    Write-Host "✅ Local database: Stays local" -ForegroundColor White
    Write-Host "✅ Production database: Will not be touched" -ForegroundColor White
    Write-Host "✅ Only code is synced" -ForegroundColor White
}
else {
    Write-Host "❌ Commit failed!" -ForegroundColor Red
    exit 1
}
