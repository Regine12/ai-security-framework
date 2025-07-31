#!/bin/bash
set -e

echo "Starting AI Security Framework in Production Mode..."

# Create necessary directories
mkdir -p /home/aisec/logs /home/aisec/output /home/aisec/config /home/aisec/temp

# Set proper permissions
chown -R aisec:aisec /home/aisec/logs /home/aisec/output /home/aisec/config /home/aisec/temp

# Initialize database if needed
if [ ! -z "$DATABASE_URL" ]; then
    echo "Initializing database..."
    python3 -c "
import sys
sys.path.insert(0, '/home/aisec')
try:
    from aisec_pentester.core.database import init_db
    init_db()
    print('Database initialized successfully')
except Exception as e:
    print(f'Database initialization failed: {e}')
"
fi

# Start supervisor to manage all services
echo "Starting services with supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
