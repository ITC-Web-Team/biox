# 🚨 EMERGENCY DATABASE RECOVERY GUIDE

## What Happened?
Your production database was lost during deployment. This happened because:
- Database was not persisted in a Docker volume
- Container was recreated, destroying the database
- Coolify rebuilt from scratch

## ⚠️ PREVENT THIS FROM HAPPENING AGAIN

### 1. Configure Persistent Volume in Coolify

**In Coolify Dashboard:**
1. Go to your **biox backend** application
2. Click **Settings** → **Storage**
3. Add a **Persistent Volume**:
   ```
   Name: biox-database
   Source: /data/biox/db
   Destination: /app/backend
   ```
4. Save and redeploy

This ensures `/app/backend/db.sqlite3` survives container restarts.

### 2. Enable Automatic Backups

**On your production server, set up a cron job:**

```bash
# SSH into server
ssh root@tech-iitb.org

# Make backup script executable
chmod +x /path/to/backup_production_db.sh

# Edit crontab
crontab -e

# Add this line (runs backup daily at 2 AM):
0 2 * * * /path/to/backup_production_db.sh >> /var/log/biox_backup.log 2>&1

# For hourly backups:
0 * * * * /path/to/backup_production_db.sh >> /var/log/biox_backup.log 2>&1
```

### 3. Manual Backup Before Every Deploy

**ALWAYS run this before deploying:**

```bash
# Find container name
docker ps | grep biox

# Backup database
docker cp <container-name>:/app/backend/db.sqlite3 ./db_backup_$(date +%Y%m%d_%H%M%S).sqlite3

# Backup media
docker cp <container-name>:/app/backend/media ./media_backup_$(date +%Y%m%d_%H%M%S)
```

## 🔄 Safe Deployment Process

### Method 1: Coolify "Deploy" Button (Safest)
1. Backup first (see above)
2. Go to Coolify dashboard
3. Click your app → **"Deploy"** button
4. This pulls new code but keeps volumes intact

### Method 2: Git Pull Inside Container
```bash
# Enter container
docker exec -it <container-name> bash

# Pull code
cd /app
git pull origin master

# Restart service (outside container)
exit
docker restart <container-name>
```

### ⚠️ NEVER DO THIS (Destroys Data):
```bash
# DON'T: Stop and remove container
docker stop <container> && docker rm <container>

# DON'T: Force recreate in Coolify
# Clicking "Force Rebuild" will destroy non-persisted data
```

## 📊 Check Volume Configuration

```bash
# List volumes
docker volume ls

# Inspect your container
docker inspect <container-name> | grep -A 20 Mounts

# You should see something like:
# "Source": "/var/lib/docker/volumes/biox_db/_data"
# "Destination": "/app/backend"
```

## 🆘 Recovery Options (If Data Lost)

### Option 1: Restore from Backup
```bash
# If you have a backup file
docker cp db_backup.sqlite3 <container-name>:/app/backend/db.sqlite3
docker restart <container-name>
```

### Option 2: Export from Local Database
```bash
# On your local PC (if you have test data worth keeping)
cd backend
python manage.py dumpdata > datadump.json

# Transfer to server and load
docker cp datadump.json <container-name>:/app/backend/
docker exec -it <container-name> python manage.py loaddata datadump.json
```

### Option 3: Manual Data Entry
- Recreate superuser: `python manage.py createsuperuser`
- Re-add data through admin panel
- Import from CSV if available

## 🔒 Security Checklist

- [ ] Persistent volume configured in Coolify
- [ ] Automatic backups scheduled (cron job)
- [ ] Backup stored outside container
- [ ] `.gitignore` excludes db.sqlite3
- [ ] Team knows safe deployment process
- [ ] Test deployment process on staging first

## 📞 Emergency Contacts

If database is lost:
1. Check `/backups/biox/` for automated backups
2. Check Coolify backup settings
3. Contact server admin for volume snapshots
4. Check if hosting provider has automatic backups

## 🎯 Summary

**To prevent data loss:**
1. ✅ Configure persistent volumes in Coolify
2. ✅ Run automatic backups daily
3. ✅ Manual backup before every deploy
4. ✅ Use "Deploy" button, not "Force Rebuild"
5. ✅ Test on staging environment first

**Your data is precious - always backup first!**
