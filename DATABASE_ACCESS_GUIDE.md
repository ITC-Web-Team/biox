# 📊 Database Access & Data Download Guide

## 🎯 Ways to Access Your Database

---

## 1️⃣ **Using Django Admin Panel** (Easiest)

### **Local Database:**
```
1. Start Django server:
   cd E:\ITC\biox\biox\backend
   python manage.py runserver

2. Open browser:
   http://localhost:8000/admin/

3. Login with your superuser credentials

4. View data:
   - Events
   - Event Registrations
   - Teams
   - Projects
   - Contacts
```

### **Production Database:**
```
1. Open browser:
   https://bioxb.tech-iitb.org/admin/

2. Login with production superuser credentials

3. View all live data
```

---

## 2️⃣ **Download Data as Excel/CSV** (Built-in Feature)

Your admin panel already has an **Export to Excel** feature!

### **To Export Event Registrations:**

```
1. Go to admin panel
2. Click "Event registrations"
3. Select event from dropdown
4. Click "Export to Excel" button
5. Downloads: registrations_<event_id>.xlsx
```

### **Export All Data (Manual):**

**Option A: Via Admin Interface**
```
1. Login to admin
2. Click on model (Events, Registrations, etc.)
3. Select items you want
4. Use admin actions to export
```

**Option B: Via Django Shell**
```bash
# On local or production
python manage.py dumpdata api.Event --indent 2 > events.json
python manage.py dumpdata api.EventRegistration --indent 2 > registrations.json
python manage.py dumpdata api.Team --indent 2 > teams.json
```

---

## 3️⃣ **Using SQLite Browser** (View Database Directly)

### **For Local Database:**

#### **Download DB Browser for SQLite:**
```
Windows: https://sqlitebrowser.org/dl/
Download: DB Browser for SQLite (Windows installer)
```

#### **Open Your Database:**
```
1. Install DB Browser for SQLite
2. Open it
3. File → Open Database
4. Navigate to: E:\ITC\biox\biox\backend\db.sqlite3
5. Browse all tables:
   - api_event
   - api_eventregistration
   - api_team
   - api_project
   - etc.
```

#### **Export Data:**
```
1. Select table (e.g., api_event)
2. File → Export → Table as CSV
3. Choose location
4. Save!
```

---

## 4️⃣ **Download Production Database** (Full Backup)

### **Method 1: Using SCP (Recommended)**

```bash
# From your PC (PowerShell)
scp user@bioxb.tech-iitb.org:/var/www/biox/backend/db.sqlite3 ./production_db.sqlite3

# Now you have production database locally!
# Open with DB Browser for SQLite
```

### **Method 2: Using Django dumpdata (JSON format)**

```bash
# SSH to production
ssh user@bioxb.tech-iitb.org
cd /var/www/biox/backend

# Export all data to JSON
python manage.py dumpdata --indent 2 > full_backup.json

# Download to your PC
exit

# From your PC
scp user@bioxb.tech-iitb.org:/var/www/biox/backend/full_backup.json ./
```

### **Method 3: Using SFTP Client (FileZilla/WinSCP)**

```
1. Download FileZilla: https://filezilla-project.org/
2. Connect to server:
   - Host: bioxb.tech-iitb.org
   - Username: your-username
   - Password: your-password
   - Port: 22

3. Navigate to: /var/www/biox/backend/
4. Find: db.sqlite3
5. Right-click → Download
6. Opens in DB Browser for SQLite
```

---

## 5️⃣ **Query Database via Django Shell**

### **Local:**
```bash
cd E:\ITC\biox\biox\backend
python manage.py shell
```

### **Production (SSH first):**
```bash
ssh user@server
cd /var/www/biox/backend
python manage.py shell
```

### **Example Queries:**

```python
# Import models
from api.models import Event, EventRegistration, Team

# View all events
events = Event.objects.all()
for e in events:
    print(f"{e.event_id}: {e.title} (Teams: {e.has_teams})")

# Count registrations
total_registrations = EventRegistration.objects.count()
print(f"Total registrations: {total_registrations}")

# Get registrations for specific event
event = Event.objects.get(event_id='symposium2025')
registrations = event.registrations.all()
for r in registrations:
    print(f"{r.name} - {r.email}")

# Export to CSV manually
import csv
with open('registrations.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Email', 'Phone', 'LDAP ID', 'Event'])
    for r in EventRegistration.objects.all():
        writer.writerow([r.name, r.email, r.phone, r.ldap_id, r.event.title])

# Exit shell
exit()
```

---

## 6️⃣ **Create Custom Management Command for Export**

I can create a command to export all data easily!

```bash
# Usage (after I create it):
python manage.py export_all_data

# Creates:
# - events.csv
# - registrations.csv
# - teams.csv
# - projects.csv
```

Would you like me to create this command? (See next section)

---

## 7️⃣ **Using Python Script to Download Data**

### **Quick Script to Export Everything:**

```python
# export_data.py
import os
import django
import csv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crud.settings')
django.setup()

from api.models import Event, EventRegistration, Team, Project

# Export Events
with open('events.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Event ID', 'Type', 'Title', 'Description', 'Has Teams', 'Min Size', 'Max Size'])
    for e in Event.objects.all():
        writer.writerow([e.event_id, e.type, e.title, e.description, e.has_teams, e.min_team_size, e.max_team_size])

# Export Registrations
with open('registrations.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Email', 'Phone', 'LDAP ID', 'Event', 'Team', 'Is Leader', 'Registration Date'])
    for r in EventRegistration.objects.all():
        writer.writerow([r.name, r.email, r.phone, r.ldap_id, r.event.title, 
                        r.team.team_name if r.team else 'N/A', r.is_team_leader, r.registration_date])

print("✅ Data exported to events.csv and registrations.csv")
```

**Run it:**
```bash
cd backend
python export_data.py
```

---

## 📥 **Quick Download Commands**

### **Download Production Database File:**
```powershell
# From your PC
scp user@bioxb.tech-iitb.org:/var/www/biox/backend/db.sqlite3 ./production_backup_$(Get-Date -Format "yyyyMMdd").sqlite3
```

### **Download as JSON:**
```bash
# On server
ssh user@server
cd /var/www/biox/backend
python manage.py dumpdata > backup_$(date +%Y%m%d).json

# On your PC
scp user@server:/var/www/biox/backend/backup_*.json ./
```

### **Download Specific Model:**
```bash
# Events only
python manage.py dumpdata api.Event > events.json

# Registrations only
python manage.py dumpdata api.EventRegistration > registrations.json
```

---

## 🔧 **Tools Summary**

| Method | Best For | Difficulty | Output Format |
|--------|----------|-----------|---------------|
| **Admin Panel** | Quick viewing | Easy | Web UI |
| **Excel Export** | Event registrations | Easy | .xlsx |
| **DB Browser for SQLite** | Full database browsing | Easy | GUI + CSV export |
| **SCP** | Full database download | Medium | .sqlite3 file |
| **dumpdata** | Backup & migration | Medium | JSON |
| **Django Shell** | Custom queries | Advanced | Python output |
| **FileZilla** | GUI file transfer | Easy | Any file |

---

## 🎯 **Recommended Workflow**

### **For Viewing Data:**
```
Admin Panel → Easiest
Excel Export → Built-in feature
```

### **For Backup:**
```
SCP download → Full database file
dumpdata → JSON format (portable)
```

### **For Analysis:**
```
Download db.sqlite3 → Open in DB Browser for SQLite
Export to CSV → Open in Excel/Google Sheets
```

---

## ⚠️ **Important Notes**

### **When Downloading Production Database:**
1. ✅ It's a COPY - doesn't affect production
2. ✅ Safe to analyze locally
3. ❌ DON'T commit to git
4. ❌ DON'T upload back to production (unless you know what you're doing)

### **Data Privacy:**
- Contains user emails and phone numbers
- Handle with care
- Don't share publicly
- Delete after analysis if not needed

---

## 🚀 **Would You Like Me To Create?**

I can create for you:
1. ✅ Custom management command for easy export
2. ✅ Automated backup script
3. ✅ Python script to export to Excel
4. ✅ Script to compare local vs production data

Just let me know which one you need! 🎯
