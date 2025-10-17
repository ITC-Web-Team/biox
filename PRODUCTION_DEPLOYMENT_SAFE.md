# 🔒 Safe Production Deployment Guide

## ✅ Database Protection Setup (COMPLETED)

Your repository is now configured to **NEVER sync databases** between local and production.

### What Was Fixed:
1. ✅ `db.sqlite3` removed from git tracking
2. ✅ `backend/.gitignore` properly configured
3. ✅ Media files ignored in git
4. ✅ Each environment maintains separate database

---

## 🎯 How It Works Now

### **Local Environment (Your PC):**
```
Database: E:\ITC\biox\biox\backend\db.sqlite3
Media:    E:\ITC\biox\biox\backend\media\
Status:   ❌ NOT tracked by git
```

### **Production Environment (Server):**
```
Database: /var/www/biox/backend/db.sqlite3  (or your server path)
Media:    /var/www/biox/backend/media/
Status:   ❌ NOT tracked by git
```

### **Git Repository (GitHub):**
```
Database: ❌ NOT STORED
Media:    ❌ NOT STORED
Code:     ✅ STORED
```

---

## 🚀 Safe Deployment Process

### **Step 1: Commit Code Changes (Local)**

```bash
# Stage your code changes only
git add biox-frontend/src/
git add backend/api/
git add backend/crud/

# DO NOT add database or media files!
# Verify what's being committed:
git status

# Commit
git commit -m "feat: your changes description"

# Push to GitHub
git push origin master
```

### **Step 2: Deploy to Production (Server)**

```bash
# SSH to your production server
ssh user@bioxb.tech-iitb.org

# Navigate to project
cd /var/www/biox  # or your deployment path

# Pull ONLY code changes
git pull origin master

# Run migrations (updates DB structure, NOT data)
cd backend
python manage.py migrate

# Collect static files
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

## 🛡️ What's Protected

### ✅ Production Database is Safe:
- **Events** you create in production admin → Stay on production
- **Registrations** submitted on live site → Stay on production
- **User data** on production → Never affected by local changes

### ✅ Local Database is Separate:
- **Test events** you create locally → Stay local only
- **Development data** → Never pushed to production
- You can delete/reset local DB anytime without affecting production

---

## 📋 Common Workflows

### **Adding New Features (Code Only):**
```bash
# 1. Develop locally
# 2. Test with local database
# 3. Commit code only
git add <code-files>
git commit -m "feat: new feature"
git push

# 4. Deploy to production
ssh server
git pull
python manage.py migrate
sudo systemctl restart gunicorn
```

### **Adding New Events:**

**For Local Testing:**
```
1. Visit http://localhost:8000/admin/
2. Add test events
3. Test functionality
4. Data stays local ✅
```

**For Production:**
```
1. Visit https://bioxb.tech-iitb.org/admin/
2. Add real events with images
3. Data stays on production ✅
```

### **Updating Database Schema (Models):**
```bash
# 1. Modify models.py locally
# 2. Create migration
python manage.py makemigrations

# 3. Commit migration file (NOT database)
git add backend/api/migrations/
git commit -m "feat: add new field to Event model"
git push

# 4. On production, run migration
ssh server
git pull
python manage.py migrate  # Applies structure change only
```

---

## 🚨 Important Rules

### ❌ NEVER DO THIS:
```bash
# DON'T commit database
git add backend/db.sqlite3  # ❌ WRONG

# DON'T copy database between environments
scp backend/db.sqlite3 server:/path/  # ❌ WRONG

# DON'T replace production database
rm production_db.sqlite3 && cp local.sqlite3 production_db.sqlite3  # ❌ WRONG
```

### ✅ ALWAYS DO THIS:
```bash
# Commit code only
git add backend/api/views.py  # ✅ CORRECT

# Each environment manages its own data
# Production admin → Production data
# Local admin → Local data

# Use migrations for schema changes
python manage.py makemigrations  # ✅ CORRECT
git add backend/api/migrations/  # ✅ CORRECT
```

---

## 🔍 Verification Checklist

After deployment, verify:

### On Production:
- [ ] Visit admin: `https://bioxb.tech-iitb.org/admin/`
- [ ] Check events are still there
- [ ] Check registrations are still there
- [ ] New code features work
- [ ] Database data unchanged ✅

### On Local:
- [ ] Visit admin: `http://localhost:8000/admin/`
- [ ] Check your test data is still there
- [ ] Test new features locally
- [ ] Database separate from production ✅

---

## 📊 File Tracking Status

| File Type | Example | Git Tracked? | Synced? |
|-----------|---------|-------------|---------|
| Python Code | `views.py`, `models.py` | ✅ Yes | ✅ Yes |
| React Code | `App.jsx`, `events.jsx` | ✅ Yes | ✅ Yes |
| Migrations | `0001_initial.py` | ✅ Yes | ✅ Yes |
| Database | `db.sqlite3` | ❌ No | ❌ No |
| Media Files | `event_images/*.png` | ❌ No | ❌ No |
| Config | `settings.py` | ✅ Yes | ✅ Yes |
| Secrets | `.env` | ❌ No | ❌ No |

---

## 🆘 Troubleshooting

### "I accidentally committed the database!"
```bash
# Remove from tracking
git rm --cached backend/db.sqlite3

# Commit the removal
git commit -m "chore: remove database from tracking"

# Push
git push origin master
```

### "Production database got overwritten!"
```bash
# SSH to production
ssh server

# Restore from backup (if you have one)
cd /var/www/biox/backend
cp db.sqlite3.backup db.sqlite3

# Or restore from Django dumpdata
python manage.py loaddata backup.json
```

### "I want to reset local database"
```bash
# Safe - only affects local
cd backend
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

---

## 🎯 Summary

✅ **Your setup is now SAFE!**

- Production database is **protected** from local changes
- Each environment has **independent** data
- Only **code** is synced via git
- Database **schema** (structure) is synced via migrations
- Database **data** (content) stays in each environment

**You can now deploy with confidence!** 🚀

---

## 📝 Quick Command Reference

```bash
# Commit code changes
git add biox-frontend/ backend/api/ backend/crud/
git commit -m "feat: description"
git push origin master

# Deploy to production
ssh user@server
cd /var/www/biox
git pull
python manage.py migrate
npm run build
sudo systemctl restart gunicorn
```

Done! Your database is protected! 🔒
