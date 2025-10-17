# 📸 Media Files & Production Setup Guide

## ⚠️ Important: Media Files Should NOT Be in Git

### **What Just Happened?**

When you pushed, these files appeared:
```
backend/media/event_images/Blasius_Solution_.png
backend/media/projects/Blasius_Solution_.png
```

These are **uploaded files** (user-generated content) and should **NOT be committed to git**.

---

## ✅ **Correct Setup (Now Fixed)**

### **1. `.gitignore` Updated**

I've added this to `backend/.gitignore`:
```
# Media files (user uploads)
media/
```

Now media files won't be tracked by git.

### **2. Remove Media Files from Git**

```bash
cd backend
git rm -r --cached media/
git commit -m "chore: Remove media files from git, add to .gitignore"
git push
```

---

## 🌐 **How Media Files Work in Production**

### **Local Development:**
```
You upload event image → Saved to backend/media/event_images/image.png
Django serves it at → http://127.0.0.1:8000/media/event_images/image.png
```

### **Production:**
```
Upload via admin panel on server → Saved to /path/to/backend/media/event_images/image.png
Nginx/Apache serves it at → https://bioxb.tech-iitb.org/media/event_images/image.png
```

---

## 🔧 **Production Server Setup**

### **Step 1: Create Media Directory on Server**

```bash
# SSH to your backend server
ssh user@bioxb.tech-iitb.org

# Navigate to backend directory
cd /path/to/backend

# Create media directories
mkdir -p media/event_images
mkdir -p media/projects

# Set proper permissions (important!)
chmod -R 755 media/
chown -R www-data:www-data media/  # Or your web server user
```

### **Step 2: Configure Web Server (Nginx)**

Add to your Nginx configuration:

```nginx
server {
    server_name bioxb.tech-iitb.org;
    
    # Django application
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # ✅ Serve media files directly (uploaded content)
    location /media/ {
        alias /path/to/backend/media/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # ✅ Serve static files directly (CSS, JS)
    location /static/ {
        alias /path/to/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

After editing:
```bash
sudo nginx -t  # Test configuration
sudo systemctl reload nginx  # Apply changes
```

### **Step 3: Configure Web Server (Apache)**

If using Apache, add to your VirtualHost:

```apache
<VirtualHost *:80>
    ServerName bioxb.tech-iitb.org
    
    # Serve media files
    Alias /media/ /path/to/backend/media/
    <Directory /path/to/backend/media/>
        Require all granted
    </Directory>
    
    # Serve static files
    Alias /static/ /path/to/backend/staticfiles/
    <Directory /path/to/backend/staticfiles/>
        Require all granted
    </Directory>
    
    # Django application
    ProxyPass /media/ !
    ProxyPass /static/ !
    ProxyPass / http://127.0.0.1:8000/
    ProxyPassReverse / http://127.0.0.1:8000/
</VirtualHost>
```

After editing:
```bash
sudo apachectl configtest
sudo systemctl reload apache2
```

---

## 📤 **Uploading Events with Images on Production**

### **Option 1: Use Django Admin on Production**

1. Go to: `https://bioxb.tech-iitb.org/admin/`
2. Login with admin credentials
3. Navigate to **Events** → **Add Event**
4. Fill in details:
   - Event ID: `hackathon_2025`
   - Title: `Healthcare Hackathon`
   - Upload image: Choose file
   - has_teams: ☑️
   - min_team_size: `2`
   - max_team_size: `5`
5. Click **Save**
6. Image automatically uploaded to server's `media/event_images/`

**✅ This is the RECOMMENDED way!**

### **Option 2: Manual Upload via SCP/SFTP**

If you have images on local machine:

```bash
# Upload from local to production
scp backend/media/event_images/myimage.png user@bioxb.tech-iitb.org:/path/to/backend/media/event_images/

# Or use FileZilla/WinSCP:
# - Connect to bioxb.tech-iitb.org
# - Navigate to /path/to/backend/media/event_images/
# - Upload files
```

Then create event in admin panel and select the uploaded image.

### **Option 3: Sync Media Between Environments**

If you have many images locally and want to sync to production:

```bash
# From local machine (PowerShell)
# Sync local media to production
rsync -avz backend/media/ user@bioxb.tech-iitb.org:/path/to/backend/media/

# Or using SCP
scp -r backend/media/* user@bioxb.tech-iitb.org:/path/to/backend/media/
```

---

## 🔄 **Database vs Media Files**

### **Database (db.sqlite3)**
```
❌ DON'T commit to git
❌ DON'T sync between environments
✅ Each environment has its own database
✅ Use migrations to sync schema
✅ Use fixtures/admin panel to add data
```

### **Media Files (uploaded images)**
```
❌ DON'T commit to git
✅ CAN sync between environments if needed
✅ Upload directly on production via admin
✅ Or manually copy to server
```

### **Code (Python, JS)**
```
✅ DO commit to git
✅ DO sync between environments (via git pull)
✅ This is your application logic
```

---

## 🎯 **Workflow: Adding Events on Production**

### **Recommended Workflow:**

1. **Deploy Code First:**
   ```bash
   # On production server
   git pull origin master
   python manage.py migrate
   python manage.py collectstatic --noinput
   sudo systemctl restart gunicorn
   ```

2. **Add Events via Admin Panel:**
   ```
   https://bioxb.tech-iitb.org/admin/
   → Events → Add Event
   → Upload image directly
   → Fill details
   → Save
   ```

3. **Test:**
   ```
   https://biox.tech-iitb.org/events
   → See new event with image
   → Try registering
   ```

### **Alternative: Test Locally First**

1. **Add Event Locally:**
   ```
   http://127.0.0.1:8000/admin/
   → Add event with test image
   → Test registration
   ```

2. **Recreate on Production:**
   ```
   https://bioxb.tech-iitb.org/admin/
   → Add same event
   → Upload same/different image
   → Save
   ```

---

## 🐛 **Troubleshooting Media Files**

### **Issue: Images not loading on production**

**Check 1: File exists on server?**
```bash
ssh user@bioxb.tech-iitb.org
ls -la /path/to/backend/media/event_images/
```

**Check 2: Permissions correct?**
```bash
# Should be readable by web server
chmod -R 755 /path/to/backend/media/
chown -R www-data:www-data /path/to/backend/media/
```

**Check 3: Nginx/Apache configured?**
```bash
# Nginx
sudo nginx -t
sudo tail -f /var/log/nginx/error.log

# Apache
sudo apachectl configtest
sudo tail -f /var/log/apache2/error.log
```

**Check 4: URL correct?**
```bash
# Should be accessible directly
curl -I https://bioxb.tech-iitb.org/media/event_images/yourimage.png

# Expected: 200 OK
# If 404: File doesn't exist or path wrong
# If 403: Permission issue
```

### **Issue: Can't upload via admin panel**

**Check Django settings:**
```python
# settings.py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

**Check directory writable:**
```bash
# On server
cd /path/to/backend
ls -la media/
# Should show: drwxr-xr-x www-data www-data

# Make writable if needed
chmod 755 media/
chown www-data:www-data media/
```

---

## 📊 **Current Setup Summary**

### **What's Fixed:**
✅ `.gitignore` updated to exclude `media/`
✅ Media files removed from git tracking
✅ Local development works fine
✅ Code is ready for production

### **What You Need to Do:**

1. **Commit the gitignore change:**
   ```bash
   git add backend/.gitignore
   git commit -m "chore: Add media files to .gitignore"
   git push
   ```

2. **On Production Server:**
   ```bash
   # Create media directories
   mkdir -p media/event_images media/projects
   chmod -R 755 media/
   
   # Configure Nginx/Apache (see above)
   # Restart web server
   ```

3. **Add Events:**
   ```
   Use admin panel on production to upload images
   OR manually copy images to server
   ```

---

## 🎯 **Quick Reference**

| File Type | Git? | Sync How? | Location |
|-----------|------|-----------|----------|
| `.py` code | ✅ Yes | `git pull` | Same everywhere |
| `.jsx` code | ✅ Yes | `git pull` | Same everywhere |
| `db.sqlite3` | ❌ No | Migrations | Different per env |
| `media/*` | ❌ No | Admin upload or SCP | Different per env |
| `requirements.txt` | ✅ Yes | `git pull` | Same everywhere |
| `.env` secrets | ❌ No | Manual copy | Different per env |

---

## 📞 **Need Help?**

If images aren't showing on production:

1. Check browser console (F12) for 404 errors
2. Check image URL: `https://bioxb.tech-iitb.org/media/event_images/...`
3. SSH to server and verify file exists
4. Check Nginx/Apache logs
5. Verify permissions: `ls -la media/`

The setup is straightforward - media files should be uploaded directly on production via the admin panel! 🎉
