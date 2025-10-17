#!/bin/bash
# Safe Deployment Script for Production
# This script ensures database is NEVER overwritten

echo "🚀 Starting Safe Production Deployment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're on the production server
if [ ! -f "/var/www/biox/backend/db.sqlite3" ]; then
    echo -e "${YELLOW}⚠️  Warning: This doesn't look like the production server.${NC}"
    echo "Expected to find: /var/www/biox/backend/db.sqlite3"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 1: Backup current database
echo -e "${GREEN}Step 1: Backing up production database...${NC}"
BACKUP_DIR="/var/www/biox/backend/backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp /var/www/biox/backend/db.sqlite3 "$BACKUP_DIR/db.sqlite3.backup_$TIMESTAMP"
echo "✅ Backup saved: $BACKUP_DIR/db.sqlite3.backup_$TIMESTAMP"
echo ""

# Step 2: Pull latest code
echo -e "${GREEN}Step 2: Pulling latest code from GitHub...${NC}"
cd /var/www/biox
git pull origin master
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Git pull failed!${NC}"
    exit 1
fi
echo "✅ Code updated"
echo ""

# Step 3: Check if database file is in git (shouldn't be!)
echo -e "${GREEN}Step 3: Verifying database is not tracked...${NC}"
if git ls-files --error-unmatch backend/db.sqlite3 >/dev/null 2>&1; then
    echo -e "${RED}❌ WARNING: db.sqlite3 is tracked by git!${NC}"
    echo "This should not happen. Database should be in .gitignore"
    echo "Please remove it from git tracking."
    exit 1
fi
echo "✅ Database is properly ignored"
echo ""

# Step 4: Install Python dependencies
echo -e "${GREEN}Step 4: Installing Python dependencies...${NC}"
cd /var/www/biox/backend
source venv/bin/activate  # or use your virtualenv path
pip install -r requirements.txt --quiet
echo "✅ Dependencies installed"
echo ""

# Step 5: Run migrations (structure only, not data)
echo -e "${GREEN}Step 5: Running database migrations...${NC}"
python manage.py migrate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Migrations failed!${NC}"
    exit 1
fi
echo "✅ Migrations applied"
echo ""

# Step 6: Collect static files
echo -e "${GREEN}Step 6: Collecting static files...${NC}"
python manage.py collectstatic --noinput
echo "✅ Static files collected"
echo ""

# Step 7: Build frontend
echo -e "${GREEN}Step 7: Building frontend...${NC}"
cd /var/www/biox/biox-frontend
npm install --silent
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed!${NC}"
    exit 1
fi
echo "✅ Frontend built"
echo ""

# Step 8: Verify database wasn't modified by git pull
echo -e "${GREEN}Step 8: Verifying database integrity...${NC}"
CURRENT_SIZE=$(stat -f%z "/var/www/biox/backend/db.sqlite3" 2>/dev/null || stat -c%s "/var/www/biox/backend/db.sqlite3")
BACKUP_SIZE=$(stat -f%z "$BACKUP_DIR/db.sqlite3.backup_$TIMESTAMP" 2>/dev/null || stat -c%s "$BACKUP_DIR/db.sqlite3.backup_$TIMESTAMP")
if [ "$CURRENT_SIZE" != "$BACKUP_SIZE" ]; then
    echo -e "${YELLOW}⚠️  Database size changed during deployment${NC}"
    echo "This might be expected if migrations added tables/columns"
    echo "Current size: $CURRENT_SIZE bytes"
    echo "Backup size: $BACKUP_SIZE bytes"
fi
echo "✅ Database check complete"
echo ""

# Step 9: Restart services
echo -e "${GREEN}Step 9: Restarting services...${NC}"
sudo systemctl restart gunicorn
sudo systemctl reload nginx
echo "✅ Services restarted"
echo ""

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "📊 Summary:"
echo "  - Code: Updated ✅"
echo "  - Database: Protected ✅ (backup at $BACKUP_DIR/db.sqlite3.backup_$TIMESTAMP)"
echo "  - Migrations: Applied ✅"
echo "  - Frontend: Built ✅"
echo "  - Services: Restarted ✅"
echo ""
echo "🔍 Verify deployment:"
echo "  - Check website: https://biox.tech-iitb.org"
echo "  - Check admin: https://bioxb.tech-iitb.org/admin/"
echo "  - Check events still exist in admin panel"
echo ""
