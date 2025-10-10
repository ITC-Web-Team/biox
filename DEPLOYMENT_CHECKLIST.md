# 🚀 Deployment Checklist for Production

## ✅ Current Configuration Status

### **Backend Configuration (Django) - ✅ READY**

Your `settings.py` is already configured correctly:

```python
# ✅ Hosts configured
ALLOWED_HOSTS = ['bioxb.tech-iitb.org', 'www.bioxb.tech-iitb.org', ...]

# ✅ CORS configured
CORS_ALLOWED_ORIGINS = [
    "https://biox.tech-iitb.org",
    "https://www.biox.tech-iitb.org",
    "https://bioxb.tech-iitb.org",
    "https://www.bioxb.tech-iitb.org",
]

# ✅ CSRF configured
CSRF_TRUSTED_ORIGINS = [
    'https://biox.tech-iitb.org',
    'https://bioxb.tech-iitb.org',
    ...
]
```

### **Frontend Configuration (React) - ✅ READY**

Your `api.js` automatically detects environment:

```javascript
// ✅ Auto-detects production
if (window.location.hostname === 'biox.tech-iitb.org') {
    return 'https://bioxb.tech-iitb.org';  // Backend URL
}
```

---

## 📋 Pre-Deployment Checklist

### **1. Backend (Django) Changes to Deploy**

All the following files have been modified and need to be deployed:

#### Modified Files:
- ✅ `backend/api/views.py` - Public access permissions for events, registrations, teams
- ✅ `backend/api/models.py` - Team helper methods
- ✅ `backend/api/serializers.py` - Enhanced validation with team size checks
- ✅ `backend/api/urls.py` - (no changes, but verify routes)

#### What Changed:
```python
# EventViewSet - Now public for viewing
def get_permissions(self):
    if self.action in ['list', 'retrieve']:
        return []  # ✅ Public access
    return [IsAuthenticated(), IsAdminUser()]

# EventRegistrationViewSet - Now public for creating
def get_permissions(self):
    if self.action == 'create':
        return []  # ✅ Public access
    return [IsAuthenticated(), IsAdminUser()]

# TeamViewSet - Now public for creating
def get_permissions(self):
    if self.action in ['create', 'create_team']:
        return []  # ✅ Public access
    return [IsAuthenticated(), IsAdminUser()]

@action(detail=False, methods=['post'])
def create_team(self, request):
    """✅ Custom endpoint: /api/teams/create_team/"""
    return self.create(request)
```

### **2. Frontend (React) Changes to Deploy**

#### Modified Files:
- ✅ `biox-frontend/src/pages/events.jsx` - Dynamic event fetching from API
- ✅ `biox-frontend/src/pages/events_card.jsx` - Team/Solo detection with visual indicators
- ✅ `biox-frontend/src/components/TeamRegistration.jsx` - Enhanced validation
- ✅ `biox-frontend/src/components/EventRegistration.jsx` - (no changes needed)

---

## 🔧 Deployment Steps

### **Step 1: Deploy Backend Changes**

#### On your server (bioxb.tech-iitb.org):

```bash
# 1. Pull latest code
cd /path/to/backend
git pull origin master

# 2. Install any new dependencies (if added)
pip install -r requirements.txt

# 3. Run migrations (if any)
python manage.py migrate

# 4. Collect static files
python manage.py collectstatic --noinput

# 5. Restart your Django server
# If using systemd:
sudo systemctl restart gunicorn
# OR if using supervisor:
sudo supervisorctl restart biox
# OR if using screen/tmux:
# Kill old process and restart
```

### **Step 2: Deploy Frontend Changes**

#### On your frontend server (biox.tech-iitb.org):

```bash
# 1. Pull latest code
cd /path/to/biox-frontend
git pull origin master

# 2. Install any new dependencies
npm install

# 3. Build for production
npm run build

# 4. The build files will be in 'dist/' folder
# Deploy to your web server (nginx/apache)
```

---

## 🧪 Post-Deployment Testing

### **Test 1: Events API (Public Access)**
```bash
# Test from browser or curl
curl https://bioxb.tech-iitb.org/api/events/

# Expected: JSON list of events (200 OK)
# Should NOT require authentication
```

### **Test 2: Individual Event Registration**
1. Visit: `https://biox.tech-iitb.org/events`
2. Find event with `👤 Individual Event`
3. Click "Register Now"
4. Fill form and submit
5. **Expected**: "Registration Successful!" message

### **Test 3: Team Event Registration**
1. Visit: `https://biox.tech-iitb.org/events`
2. Find event with `🏆 Team Event (X-Y members)`
3. Click "Register Team"
4. Step 1: Enter team name → Next
5. Step 2: Add team members → Submit
6. **Expected**: "Team registration successful!" message

### **Test 4: Admin Panel (Protected)**
1. Visit: `https://bioxb.tech-iitb.org/admin/`
2. Login required
3. View Events, Registrations
4. Export to Excel
5. **Expected**: All admin features work

---

## 🔒 Security Verification

### **✅ What's Public (No Authentication Required):**
- ✅ View events list: `GET /api/events/`
- ✅ View single event: `GET /api/events/{id}/`
- ✅ Create event registration: `POST /api/event-registrations/`
- ✅ Create team: `POST /api/teams/` or `POST /api/teams/create_team/`
- ✅ Get CSRF token: `GET /api/csrf/`
- ✅ Contact form: `POST /api/contact/`

### **🔒 What's Protected (Admin Only):**
- 🔒 Create/Edit/Delete events: Admin only
- 🔒 View registrations: Admin only
- 🔒 View teams: Admin only
- 🔒 Export registrations: Admin only
- 🔒 Admin panel: Admin only

---

## 🌐 URL Configuration Verification

### **Your Current Setup:**

```
Frontend: https://biox.tech-iitb.org
Backend:  https://bioxb.tech-iitb.org
```

### **API Endpoints that Frontend Will Use:**

```javascript
// Events
GET  https://bioxb.tech-iitb.org/api/events/
POST https://bioxb.tech-iitb.org/api/event-registrations/
POST https://bioxb.tech-iitb.org/api/teams/create_team/

// CSRF
GET  https://bioxb.tech-iitb.org/api/csrf/

// Admin
GET  https://bioxb.tech-iitb.org/admin/
```

---

## 🐛 Common Deployment Issues & Solutions

### **Issue 1: CORS Errors**
```
Error: "Access-Control-Allow-Origin" header missing
```
**Solution:** 
- ✅ Already configured in `settings.py`
- Verify backend server is running
- Check CORS_ALLOWED_ORIGINS includes your frontend URL

### **Issue 2: CSRF Token Errors**
```
Error: "CSRF token missing or incorrect"
```
**Solution:**
- ✅ Already configured in `settings.py`
- Verify CSRF_TRUSTED_ORIGINS includes your frontend URL
- Check cookies are being sent (CORS_ALLOW_CREDENTIALS = True)

### **Issue 3: 404 on API Endpoints**
```
Error: "Not Found" on /api/events/
```
**Solution:**
- Verify URL routing in `crud/urls.py`
- Check Django server is running
- Test API directly: `curl https://bioxb.tech-iitb.org/api/events/`

### **Issue 4: Media Files Not Loading**
```
Event images showing broken
```
**Solution:**
```python
# settings.py - verify these are set
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

Nginx/Apache configuration:
```nginx
location /media/ {
    alias /path/to/backend/media/;
}
```

### **Issue 5: Static Files Not Loading**
```
Admin panel looks broken (no CSS)
```
**Solution:**
```bash
# Run collectstatic again
python manage.py collectstatic --noinput
```

---

## 📊 Database Considerations

### **SQLite Database (Current)**
- ✅ Works for small to medium traffic
- File: `backend/db.sqlite3`
- **Backup before deployment:**
  ```bash
  cp db.sqlite3 db.sqlite3.backup
  ```

### **Migration to Production Database (Optional)**
For higher traffic, consider PostgreSQL/MySQL:
```python
# settings.py - Production database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'biox_db',
        'USER': 'biox_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

## ✅ Final Verification Checklist

Before going live, verify:

- [ ] Backend code deployed to server
- [ ] Frontend code built and deployed
- [ ] All migrations run: `python manage.py migrate`
- [ ] Static files collected: `python manage.py collectstatic`
- [ ] Admin panel accessible: `https://bioxb.tech-iitb.org/admin/`
- [ ] Events API public: `https://bioxb.tech-iitb.org/api/events/`
- [ ] Frontend loads: `https://biox.tech-iitb.org`
- [ ] Individual registration works
- [ ] Team registration works
- [ ] CORS configured correctly
- [ ] CSRF tokens working
- [ ] Media files accessible
- [ ] Database backed up

---

## 🔄 Quick Deployment Commands

### **One-Line Backend Update:**
```bash
cd /path/to/backend && git pull && python manage.py migrate && python manage.py collectstatic --noinput && sudo systemctl restart gunicorn
```

### **One-Line Frontend Update:**
```bash
cd /path/to/biox-frontend && git pull && npm install && npm run build
```

---

## 📞 Support & Debugging

### **Check Backend Logs:**
```bash
# If using systemd
sudo journalctl -u gunicorn -f

# If using supervisor
sudo tail -f /var/log/supervisor/biox.log

# Django debug (temporarily)
# Set DEBUG=True in settings.py (DON'T FORGET TO SET BACK TO FALSE)
```

### **Check Frontend Console:**
1. Open browser Dev Tools (F12)
2. Console tab
3. Look for errors or API call failures
4. Network tab to see API requests/responses

---

## 🎯 Summary

**YES, everything will work on hosting!** 

Your configuration is already set up correctly:
- ✅ CORS configured for production domains
- ✅ CSRF configured for production domains
- ✅ Frontend auto-detects production environment
- ✅ All new features (team registration, public access) will work

Just follow the deployment steps above to push your changes to production! 🚀
