#!/bin/bash

# Backup directory
BACKUP_DIR="/backup"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup MySQL database
docker exec mysql mysqldump -u wordmaster -pwordmaster123 wordmasterdb > $BACKUP_DIR/wordmasterdb_$TIMESTAMP.sql

# Compress backup
gzip $BACKUP_DIR/wordmasterdb_$TIMESTAMP.sql

# Keep only last 7 backups
ls -t $BACKUP_DIR/wordmasterdb_*.sql.gz | tail -n +8 | xargs -r rm 