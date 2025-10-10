# Git Commit & Deployment Guide

## 📝 Files Modified (Ready to Commit)

### Backend Changes:
```
✅ backend/api/models.py          - Added team helper methods
✅ backend/api/serializers.py     - Enhanced validation with team size checks
✅ backend/api/views.py            - Public access for events, registrations, teams
```

### Frontend Changes:
```
✅ biox-frontend/src/pages/events.jsx                  - Dynamic event fetching
✅ biox-frontend/src/pages/events_card.jsx            - Team/Solo detection + visual indicators
✅ biox-frontend/src/components/TeamRegistration.jsx  - Enhanced validation
```

### Documentation:
```
✅ DEPLOYMENT_CHECKLIST.md  - Complete deployment guide
✅ SETUP_EVENTS_GUIDE.md     - Event setup instructions
```

---

## 🚀 Quick Deployment Commands

### **Step 1: Commit Changes**

```bash
# Navigate to project root
cd e:\ITC\biox\biox

# Add all modified files
git add backend/api/models.py
git add backend/api/serializers.py
git add backend/api/views.py
git add biox-frontend/src/pages/events.jsx
git add biox-frontend/src/pages/events_card.jsx
git add biox-frontend/src/components/TeamRegistration.jsx
git add DEPLOYMENT_CHECKLIST.md
git add SETUP_EVENTS_GUIDE.md

# Commit with descriptive message
git commit -m "feat: Add public event registration with team support

- Made events API public for viewing
- Made event registration public (no auth required)
- Added team creation endpoint (/api/teams/create_team/)
- Enhanced team registration with size validation
- Added visual indicators for team vs solo events
- Frontend now fetches events dynamically from backend
- Added deployment and setup documentation

Changes:
- Backend: Public access for create actions, admin-only for management
- Frontend: Team/Solo event detection, validation, better UX
- Models: Team helper methods for size validation
- Serializers: Team size validation in create method"

# Push to GitHub
git push origin master
```

### **Step 2: Deploy to Production**

#### **Backend Deployment:**
```bash
# SSH to your backend server
ssh user@bioxb.tech-iitb.org

# Navigate to backend directory
cd /path/to/backend

# Pull latest changes
git pull origin master

# Install dependencies (if needed)
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Restart server (choose your method)
sudo systemctl restart gunicorn
# OR
sudo supervisorctl restart biox
```

#### **Frontend Deployment:**
```bash
# SSH to your frontend server
ssh user@biox.tech-iitb.org

# Navigate to frontend directory
cd /path/to/biox-frontend

# Pull latest changes
git pull origin master

# Install dependencies
npm install

# Build for production
npm run build

# Verify build completed
ls -la dist/

# If using nginx, the dist folder should be served
# Nginx config should point to: /path/to/biox-frontend/dist
```

---

## 🧪 Testing After Deployment

### **1. Test Backend API:**
```bash
# Test events endpoint (should be public)
curl https://bioxb.tech-iitb.org/api/events/

# Test CSRF endpoint
curl https://bioxb.tech-iitb.org/api/csrf/

# Expected: JSON responses, no authentication errors
```

### **2. Test Frontend:**
1. Visit: `https://biox.tech-iitb.org/events`
2. Check events are loading from backend
3. Look for visual indicators:
   - `👤 Individual Event` or
   - `🏆 Team Event (X-Y members)`
4. Test registration for both types

### **3. Open Browser Console (F12):**
Check for any errors:
```
✅ No CORS errors
✅ No CSRF errors
✅ API calls returning 200 OK
✅ Events loading correctly
```

---

## 🔄 Alternative: Quick Single-Line Commits

### **Commit Only Backend:**
```bash
git add backend/api/*.py && git commit -m "feat: Public event registration API" && git push
```

### **Commit Only Frontend:**
```bash
git add biox-frontend/src/**/*.jsx && git commit -m "feat: Enhanced event registration UI" && git push
```

### **Commit Everything:**
```bash
git add -A && git commit -m "feat: Complete event registration system with team support" && git push
```

---

## ⚠️ Important Notes

### **Database Note:**
The `db.sqlite3` file is modified but typically should NOT be committed. Add to `.gitignore`:
```bash
# In .gitignore
backend/db.sqlite3
backend/media/
```

### **Media Files:**
Event images and media should be uploaded directly on production server, not committed to git:
```bash
# In .gitignore
backend/media/
```

### **Environment Variables:**
Make sure production has proper environment variables:
```bash
# On production server
export DEBUG=False
export SECRET_KEY='your-secret-key-here'
```

---

## 🎯 Summary

**All changes WILL work on hosting** because:

1. ✅ **CORS is configured** for your production domains
2. ✅ **CSRF is configured** for your production domains
3. ✅ **Frontend auto-detects** production environment
4. ✅ **No breaking changes** - only enhancements
5. ✅ **Backward compatible** - existing features still work
6. ✅ **Public API endpoints** properly configured

Just commit → push → deploy → test! 🚀

---

## 📞 Quick Help

If you encounter issues after deployment:

1. **Check Backend Logs:**
   ```bash
   sudo journalctl -u gunicorn -f
   ```

2. **Check Frontend Console:**
   - Open browser (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

3. **Test API Directly:**
   ```bash
   curl -v https://bioxb.tech-iitb.org/api/events/
   ```

4. **Verify CORS:**
   - Check browser console for CORS errors
   - Verify `CORS_ALLOWED_ORIGINS` in settings.py

5. **Verify CSRF:**
   - Check CSRF token is being retrieved
   - Verify `CSRF_TRUSTED_ORIGINS` in settings.py
