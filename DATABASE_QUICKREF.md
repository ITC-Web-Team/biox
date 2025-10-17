# 🎯 Quick Guide: Check & Download Database

## ✅ **Easiest Ways to View Data**

### **Method 1: Admin Panel** (No download needed)
```
Local:      http://localhost:8000/admin/
Production: https://bioxb.tech-iitb.org/admin/

Login → View all events, registrations, teams, etc.
```

### **Method 2: Export to CSV/Excel** (Built-in)
```
1. Go to admin panel
2. Navigate to Event Registrations
3. Click "Export to Excel" button
4. Download .xlsx file with all registrations
```

---

## 📥 **Download Entire Database**

### **Option A: Use the PowerShell Script** (Recommended)
```powershell
# Edit the script first with your server details
# Then run:
.\download_production_db.ps1

# Downloads:
# - Database file (db.sqlite3)
# - Media files (images)
```

### **Option B: Manual SCP Command**
```powershell
# Download just the database
scp user@bioxb.tech-iitb.org:/var/www/biox/backend/db.sqlite3 ./production_db.sqlite3

# Open with DB Browser for SQLite
```

---

## 📊 **Export Data to CSV**

### **Use Django Management Command:**

```bash
# On local
cd backend
python manage.py export_data

# On production (SSH first)
ssh user@server
cd /var/www/biox/backend
python manage.py export_data

# Downloads to your PC
scp user@server:/var/www/biox/backend/exports/* ./
```

**Creates:**
- `events_TIMESTAMP.csv`
- `event_registrations_TIMESTAMP.csv`
- `teams_TIMESTAMP.csv`
- `projects_TIMESTAMP.csv`
- `project_registrations_TIMESTAMP.csv`
- `contact_messages_TIMESTAMP.csv`

---

## 🔧 **Tools You Can Use**

### **1. DB Browser for SQLite** (GUI Tool)
```
Download: https://sqlitebrowser.org/
Price: Free
Platform: Windows, Mac, Linux

Use for:
- Browse tables visually
- Run SQL queries
- Export to CSV
- Edit data directly
```

### **2. Admin Panel** (Web Interface)
```
URL: /admin/
Price: Built-in
Platform: Any browser

Use for:
- Quick viewing
- Export registrations
- Manage data
```

### **3. Django Management Commands** (Terminal)
```
Command: python manage.py export_data
Price: Built-in (I just created it!)
Platform: Any OS

Use for:
- Automated exports
- All data at once
- CSV format
```

---

## 📋 **Quick Commands Reference**

### **View Local Database:**
```powershell
# Option 1: Admin panel
cd backend
python manage.py runserver
# Visit: http://localhost:8000/admin/

# Option 2: DB Browser
# Open: E:\ITC\biox\biox\backend\db.sqlite3
```

### **Download Production Database:**
```powershell
# Quick download
scp user@server:/var/www/biox/backend/db.sqlite3 ./prod_db.sqlite3

# Or use script
.\download_production_db.ps1
```

### **Export Production Data:**
```bash
# SSH to production
ssh user@server
cd /var/www/biox/backend

# Export all data
python manage.py export_data

# Download exports to PC
exit
scp user@server:/var/www/biox/backend/exports/* ./
```

---

## 🎯 **What Each Method Gives You**

| Method | Format | Best For | Difficulty |
|--------|--------|----------|-----------|
| **Admin Panel** | Web UI | Quick viewing | ⭐ Easy |
| **Excel Export** | .xlsx | Event registrations | ⭐ Easy |
| **DB Browser** | GUI | Browse all tables | ⭐⭐ Medium |
| **SCP Download** | .sqlite3 | Full backup | ⭐⭐ Medium |
| **Export Command** | .csv | All data export | ⭐⭐⭐ Advanced |
| **Django Shell** | Python | Custom queries | ⭐⭐⭐ Advanced |

---

## 📸 **Step-by-Step: Download & View Production Data**

### **1. Download Database:**
```powershell
scp user@bioxb.tech-iitb.org:/var/www/biox/backend/db.sqlite3 ./production_db.sqlite3
```

### **2. Install DB Browser:**
```
https://sqlitebrowser.org/dl/
Download and install
```

### **3. Open Database:**
```
1. Launch DB Browser for SQLite
2. File → Open Database
3. Select: production_db.sqlite3
```

### **4. Browse Data:**
```
Click "Browse Data" tab
Select table:
- api_event → All events
- api_eventregistration → All registrations
- api_team → All teams
```

### **5. Export to Excel:**
```
1. Select table
2. File → Export → Table as CSV
3. Open in Excel
```

---

## ⚠️ **Important Security Notes**

When you download production database:

✅ **DO:**
- Keep it secure (contains user emails/phones)
- Delete after analysis if not needed
- Use for backup/analysis only

❌ **DON'T:**
- Commit to git
- Share publicly
- Upload back to production (unless restoring backup)
- Share with unauthorized people

---

## 🆘 **Troubleshooting**

### **Can't connect via SCP:**
```
Check:
1. Server address correct?
2. SSH key configured?
3. Firewall blocking?

Try:
ssh user@server  # Test SSH first
```

### **Permission denied:**
```bash
# On server, check permissions
ls -la /var/www/biox/backend/db.sqlite3

# Fix if needed
chmod 644 db.sqlite3
```

### **Export command not found:**
```bash
# Make sure you're in backend directory
cd backend

# Check command exists
python manage.py help export_data
```

---

## 📞 **Need Help?**

Refer to:
- Full guide: `DATABASE_ACCESS_GUIDE.md`
- Download script: `download_production_db.ps1`
- Export command: `backend/api/management/commands/export_data.py`

---

## ✅ **Summary**

**To check database:**
1. Use admin panel (easiest)
2. Download and open in DB Browser (most flexible)
3. Export to CSV (best for analysis)

**All data is safe - downloading is just a copy!** 🎯
