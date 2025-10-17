# 🎯 Quick Start - Database Protection

## ✅ What's Done

Your project is now **100% protected** from database overwrites!

### Changes Made:
1. ✅ Removed `db.sqlite3` from git tracking
2. ✅ Added comprehensive `.gitignore` at root level
3. ✅ Created safe commit script: `commit_safe.ps1`
4. ✅ Created safe deployment script: `deploy_production.sh`
5. ✅ Full documentation: `PRODUCTION_DEPLOYMENT_SAFE.md`

---

## 🚀 How to Use (Simple Steps)

### **On Your PC (Local Development):**

#### Option 1: Use the Safe Commit Script (Recommended)
```powershell
# Run this script - it checks everything for you
.\commit_safe.ps1
```

#### Option 2: Manual Commands
```powershell
# Add code files only (NOT database)
git add biox-frontend/src/
git add backend/api/
git add backend/crud/

# Commit
git commit -m "your message here"

# Push
git push origin master
```

---

### **On Production Server:**

#### Option 1: Use the Safe Deployment Script (Recommended)
```bash
# SSH to server
ssh user@bioxb.tech-iitb.org

# Navigate to project
cd /var/www/biox

# Run safe deployment script
bash deploy_production.sh
```

#### Option 2: Manual Commands
```bash
# SSH to server
ssh user@bioxb.tech-iitb.org
cd /var/www/biox

# Backup database first!
cp backend/db.sqlite3 backend/db.sqlite3.backup_$(date +%Y%m%d)

# Pull code
git pull origin master

# Apply migrations (structure only)
cd backend
python manage.py migrate

# Collect static
python manage.py collectstatic --noinput

# Build frontend
cd ../biox-frontend
npm install
npm run build

# Restart services
sudo systemctl restart gunicorn
sudo systemctl reload nginx
```

---

## 🔒 Protection Guarantees

### What's Protected:
✅ **Production database** - Never touched by git pull
✅ **Production events** - Always preserved
✅ **Production registrations** - Always preserved
✅ **Production media files** - Never overwritten

### What Gets Updated:
✅ **Code** (Python, JavaScript, CSS)
✅ **Database structure** (via migrations)
✅ **Configuration** (settings files)
✅ **Static files** (collected from code)

---

## 📋 Daily Workflow

### 1. Make Changes Locally
```powershell
# Edit code
# Test locally with local database
# Local database has test data
```

### 2. Commit (Safe)
```powershell
.\commit_safe.ps1
# Script checks you're not committing database
```

### 3. Deploy to Production
```bash
ssh server
cd /var/www/biox
bash deploy_production.sh
# Script backs up database first
```

### 4. Verify
```
Visit: https://biox.tech-iitb.org/admin/
Check: Your production events are still there ✅
```

---

## 🆘 Quick Checks

### "Did I accidentally add the database?"
```powershell
git status
# Look for db.sqlite3
# If you see it: git reset backend/db.sqlite3
```

### "Is production database safe?"
```bash
# SSH to server
ls -lh backend/db.sqlite3
# Check the file size and timestamp
# Should NOT change after git pull
```

### "I want to start fresh on production"
```bash
# SSH to server
cd backend
cp db.sqlite3 db.sqlite3.old  # backup
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
# Now add events via admin panel
```

---

## 📊 Files Overview

| File | Purpose | When to Use |
|------|---------|-------------|
| `commit_safe.ps1` | Safe commit on Windows | Before every commit |
| `deploy_production.sh` | Safe deploy on server | After every push |
| `PRODUCTION_DEPLOYMENT_SAFE.md` | Full documentation | When in doubt |
| `.gitignore` | Ignore database/media | Auto (already set) |

---

## ✅ You're All Set!

**Your database is now 100% protected!**

From now on:
1. Use `commit_safe.ps1` to commit locally
2. Push to GitHub
3. Use `deploy_production.sh` on server
4. Your production data stays safe! 🎯

**Questions?** Read `PRODUCTION_DEPLOYMENT_SAFE.md` for full details.
