#!/bin/bash
# Automated Production Database Backup Script
# Run this on the production server via cron job

# Configuration
BACKUP_DIR="/backups/biox"
CONTAINER_NAME="biox-backend"  # Change to your actual container name
DB_PATH="/app/backend/db.sqlite3"  # Path inside container
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Generate timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sqlite3"

# Backup from Docker container
echo "🔄 Backing up database..."
docker cp "$CONTAINER_NAME:$DB_PATH" "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Backup successful: $BACKUP_FILE"
    
    # Compress backup
    gzip "$BACKUP_FILE"
    echo "📦 Compressed: $BACKUP_FILE.gz"
    
    # Delete old backups (older than retention period)
    find "$BACKUP_DIR" -name "db_backup_*.sqlite3.gz" -mtime +$RETENTION_DAYS -delete
    echo "🗑️  Cleaned up backups older than $RETENTION_DAYS days"
else
    echo "❌ Backup failed!"
    exit 1
fi

# Also backup media folder if exists
if docker exec "$CONTAINER_NAME" test -d /app/backend/media; then
    MEDIA_BACKUP="$BACKUP_DIR/media_backup_$TIMESTAMP.tar.gz"
    docker exec "$CONTAINER_NAME" tar -czf /tmp/media_backup.tar.gz -C /app/backend media
    docker cp "$CONTAINER_NAME:/tmp/media_backup.tar.gz" "$MEDIA_BACKUP"
    docker exec "$CONTAINER_NAME" rm /tmp/media_backup.tar.gz
    echo "📁 Media backed up: $MEDIA_BACKUP"
fi

echo "✨ Backup complete!"
