# 📝 Quick Commit & Push Guide

## Current Status

You have these changes ready to commit:

### ✅ Files to Add:
```
Modified: backend/.gitignore (excludes media files now)
New:      MEDIA_FILES_PRODUCTION_GUIDE.md
Deleted:  backend/media/* (removed from git tracking)
```

---

## 🚀 Quick Commands

### **1. Commit Changes:**

```bash
# Add the .gitignore update
git add backend/.gitignore

# Add the media guide
git add MEDIA_FILES_PRODUCTION_GUIDE.md

# Commit everything (including deleted media files)
git commit -m "chore: Remove media files from git and add production guide

- Added media/ to .gitignore
- Removed media files from git tracking
- Created MEDIA_FILES_PRODUCTION_GUIDE.md
- Media files should be uploaded directly on production server"

# Push to GitHub
git push origin master
```

---

## 📸 **How Media Files Work Now**

### **Development (Your Computer):**
```
1. Add events in admin: http://127.0.0.1:8000/admin/
2. Upload images → Saved to backend/media/
3. Git ignores these files (won't be committed)
```

### **Production (Hosting):**
```
1. Add events in admin: https://bioxb.tech-iitb.org/admin/
2. Upload images → Saved to server's backend/media/
3. Each environment has its own media files
```

### **✅ This is the CORRECT way!**
- Media files are user-generated content
- Each environment should have its own
- Git only tracks code, not uploads

---

## 🌐 **Production Setup (One-Time)**

### **SSH to Backend Server:**

```bash
ssh user@bioxb.tech-iitb.org
cd /path/to/backend

# Pull latest code (with .gitignore update)
git pull origin master

# Create media directories
mkdir -p media/event_images
mkdir -p media/projects

# Set permissions
chmod -R 755 media/
chown -R www-data:www-data media/
```

### **Update Nginx Config:**

Add this to your Nginx config for `bioxb.tech-iitb.org`:

```nginx
# Serve media files
location /media/ {
    alias /path/to/backend/media/;
    expires 30d;
}
```

Then reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🎯 **Workflow Going Forward**

### **Adding New Events:**

**Option 1: Directly on Production (Recommended)**
```
1. Go to: https://bioxb.tech-iitb.org/admin/
2. Add Event → Upload image
3. Image saved on production server
4. Done! ✅
```

**Option 2: Test Locally First**
```
1. Add event locally with test image
2. Test registration works
3. Recreate event on production with proper image
4. Test on production
```

---

## 💡 **Key Points**

### ✅ **What SHOULD be in Git:**
- Python code (`.py` files)
- JavaScript code (`.jsx` files)
- Configuration files (`settings.py`, etc.)
- Requirements (`requirements.txt`)
- Documentation (`.md` files)

### ❌ **What should NOT be in Git:**
- Database files (`db.sqlite3`)
- Media files (`media/`)
- Environment files (`.env`)
- Cache files (`__pycache__/`)
- Virtual environments (`.venv/`)

---

## 🔧 **If You Need to Transfer Images**

### **From Local to Production:**

```bash
# Using SCP
scp backend/media/event_images/myimage.png user@bioxb.tech-iitb.org:/path/to/backend/media/event_images/

# Or using rsync (for multiple files)
rsync -avz backend/media/event_images/ user@bioxb.tech-iitb.org:/path/to/backend/media/event_images/
```

Then create the event in admin and select the uploaded image.

---

## 📊 **Summary**

**Before:** Media files were being committed to git ❌
**Now:** Media files are ignored, handled separately ✅

**Local:** Upload images via admin → Saved locally
**Production:** Upload images via admin → Saved on server

Each environment is independent! 🎉

---

## 🚀 **Run These Commands Now:**

```bash
# From project root
cd E:\ITC\biox\biox

# Add changes
git add backend/.gitignore MEDIA_FILES_PRODUCTION_GUIDE.md

# Commit (this includes the deleted media files already staged)
git commit -m "chore: Remove media files from git and add production guide"

# Push
git push origin master
```

Done! Your repository is now clean and production-ready! 🎯
