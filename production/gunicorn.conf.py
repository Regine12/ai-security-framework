# Gunicorn Configuration for AI Security Framework Production
import multiprocessing

# Server socket
bind = "0.0.0.0:3000"
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 50
preload_app = True
timeout = 120
keepalive = 2

# Logging
accesslog = "/home/aisec/logs/gunicorn_access.log"
errorlog = "/home/aisec/logs/gunicorn_error.log"
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Process naming
proc_name = "aisec_framework"

# Server mechanics
daemon = False
pidfile = "/home/aisec/temp/gunicorn.pid"
user = "aisec"
group = "aisec"
tmp_upload_dir = "/home/aisec/temp"

# SSL Configuration (if certificates are available)
# keyfile = "/etc/ssl/private/aisec.key"
# certfile = "/etc/ssl/certs/aisec.crt"

# Worker recycling
max_age = 3600
graceful_timeout = 30

# Application configuration
raw_env = [
    'PYTHONPATH=/home/aisec',
    'NODE_ENV=production',
    'LOG_LEVEL=info'
]
