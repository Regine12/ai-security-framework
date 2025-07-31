# AI Security Framework - Deployment Guide

## Overview

The AI Security Framework is an enterprise-grade security assessment platform designed for comprehensive AI system evaluation. This guide covers deployment, configuration, and operational procedures for production environments.

## System Requirements

### Hardware Requirements
- **CPU**: 4+ cores recommended
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 10GB available space
- **Network**: Internet connectivity for dependency downloads

### Software Requirements
- **Python**: 3.8+ (for AISec-Pentester core)
- **Node.js**: 16+ (for web interface)
- **Git**: Latest version
- **Web Browser**: Chrome, Firefox, Safari, or Edge

## Quick Start

### Option 1: Automated Installation
```bash
curl -fsSL https://raw.githubusercontent.com/Regine12/ai-security-framework/main/install.sh | bash
```

### Option 2: Manual Installation
```bash
# Clone repository
git clone https://github.com/Regine12/ai-security-framework.git
cd ai-security-framework

# Install Python dependencies
pip install -r aisec_pentester/requirements.txt

# Install Node.js dependencies (if using web interface)
npm install

# Run installation script
chmod +x install.sh
./install.sh
```

## Deployment Options

### 1. Local Development
```bash
# Start web interface
npm start
# or
node server.js

# Run CLI tool
python -m aisec_pentester --help
```

### 2. Production Deployment
```bash
# Build production assets
npm run build

# Start production server
NODE_ENV=production node server.js
```

### 3. Docker Deployment
```bash
# Build container
docker build -t aisec-framework .

# Run container
docker run -p 3000:3000 aisec-framework
```

## Configuration

### Environment Variables
Create `.env` file based on `.env.example`:

```bash
# Application Settings
NODE_ENV=production
PORT=3000
HOST=localhost

# Security Settings
SESSION_SECRET=your_secure_session_secret
API_RATE_LIMIT=100

# AI Model Settings
DEFAULT_MODEL_PATH=/models
ENABLE_GPU=false

# Logging Settings
LOG_LEVEL=info
LOG_FILE=logs/application.log
```

### AISec-Pentester Configuration
Edit `aisec_pentester/core/config_manager.py`:

```python
DEFAULT_CONFIG = {
    'output_directory': './output',
    'log_level': 'INFO',
    'max_workers': 4,
    'timeout': 300,
    'gpu_enabled': False
}
```

## Network Configuration

### Firewall Rules
```bash
# Allow HTTP traffic
sudo ufw allow 3000/tcp

# Allow HTTPS traffic (if using SSL)
sudo ufw allow 443/tcp
```

### Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Security Considerations

### Access Control
- Implement authentication for production environments
- Use HTTPS in production
- Configure proper CORS settings
- Set up rate limiting

### Data Protection
- Encrypt sensitive assessment data
- Implement proper session management
- Use secure headers (helmet.js)
- Regular security updates

### Monitoring
- Set up application monitoring
- Configure log rotation
- Implement health checks
- Monitor resource usage

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   lsof -i :3000
   # Kill process
   kill -9 <PID>
   ```

2. **Python Dependencies**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # venv\Scripts\activate   # Windows
   pip install -r aisec_pentester/requirements.txt
   ```

3. **Node.js Memory Issues**
   ```bash
   # Increase memory limit
   node --max-old-space-size=4096 server.js
   ```

### Log Files
- Application logs: `logs/application.log`
- Assessment logs: `logs/assessment_*.log`
- Error logs: `logs/error.log`

## Performance Optimization

### System Tuning
```bash
# Increase file descriptor limits
ulimit -n 65536

# Optimize Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Database Optimization
- Use connection pooling
- Implement proper indexing
- Regular maintenance tasks

## Backup and Recovery

### Backup Procedures
```bash
# Backup assessment data
tar -czf backup_$(date +%Y%m%d).tar.gz output/ logs/ config/

# Backup application
tar -czf app_backup_$(date +%Y%m%d).tar.gz . --exclude=node_modules --exclude=.git
```

### Recovery Procedures
```bash
# Restore from backup
tar -xzf backup_YYYYMMDD.tar.gz
```

## Support and Maintenance

### Regular Maintenance
- Weekly log rotation
- Monthly dependency updates
- Quarterly security reviews
- Annual framework updates

### Support Channels
- GitHub Issues: [Repository Issues](https://github.com/Regine12/ai-security-framework/issues)
- Documentation: [Wiki](https://github.com/Regine12/ai-security-framework/wiki)
- Community: [Discussions](https://github.com/Regine12/ai-security-framework/discussions)

---

**Version**: 2.0  
**Last Updated**: July 31, 2025  
**Maintained by**: AI Security Framework Team
