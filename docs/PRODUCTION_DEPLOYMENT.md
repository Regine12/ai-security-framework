# Production Deployment Guide
## AI Security Framework Enterprise Setup

This guide covers deploying the AI Security Framework in a production environment with enterprise-grade features including monitoring, scaling, and security.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Regine12/ai-security-framework.git
cd ai-security-framework

# Deploy in production mode
./deploy.sh deploy
```

## Architecture Overview

The production deployment includes:

- **Application Layer**: AI Security Framework with Node.js web interface and Python backend
- **Database Layer**: PostgreSQL for persistent data, Redis for sessions and caching
- **Reverse Proxy**: Nginx with SSL termination and load balancing
- **Monitoring**: Prometheus metrics collection and Grafana dashboards
- **Container Orchestration**: Docker Compose with health checks and automatic restarts

## System Requirements

### Minimum Requirements
- **CPU**: 4 cores
- **RAM**: 8GB
- **Storage**: 50GB SSD
- **OS**: Linux (Ubuntu 20.04+ recommended)

### Recommended for Production
- **CPU**: 8+ cores
- **RAM**: 16GB+
- **Storage**: 100GB+ SSD
- **Network**: 1Gbps connection
- **Backup**: Separate storage for automated backups

## Pre-Installation

### 1. Install Docker and Docker Compose

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Configure Firewall

```bash
# Allow HTTP/HTTPS traffic
sudo ufw allow 80
sudo ufw allow 443

# Allow monitoring (optional, restrict to admin networks)
sudo ufw allow from YOUR_ADMIN_NETWORK to any port 3001
sudo ufw allow from YOUR_ADMIN_NETWORK to any port 9090
```

### 3. SSL Certificates (Optional but Recommended)

```bash
# Using Let's Encrypt
sudo apt install certbot
sudo certbot certonly --standalone -d your-domain.com

# Copy certificates to nginx directory
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/aisec.crt
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/aisec.key
```

## Deployment

### 1. Basic Deployment

```bash
# Deploy with automatic configuration
./deploy.sh deploy
```

This will:
- Generate secure passwords and secrets
- Create production configuration
- Build Docker images
- Start all services
- Perform health checks

### 2. Custom Configuration

```bash
# Copy example configuration
cp .env.production.example .env.production

# Edit configuration
nano .env.production

# Deploy with custom configuration
./deploy.sh deploy
```

### 3. SSL-Enabled Deployment

```bash
# Enable SSL in configuration
echo "SSL_ENABLED=true" >> .env.production

# Update Nginx configuration for SSL
# Edit nginx/nginx.conf and uncomment SSL server block

# Redeploy
./deploy.sh restart
```

## Service Management

### Check Status
```bash
./deploy.sh status
```

### View Logs
```bash
# All services
./deploy.sh logs

# Specific service
./deploy.sh logs aisec-framework
./deploy.sh logs nginx
./deploy.sh logs postgres
```

### Restart Services
```bash
./deploy.sh restart
```

### Stop Services
```bash
./deploy.sh stop
```

## Monitoring and Metrics

### Grafana Dashboard
- **URL**: http://your-server:3001
- **Username**: admin
- **Password**: Check `.env.production` file

### Prometheus Metrics
- **URL**: http://your-server:9090
- **Metrics**: Application performance, system resources, database stats

### Key Metrics to Monitor
- Response time and error rates
- CPU and memory usage
- Database connection pool
- Assessment processing times
- Security scan completion rates

## Backup and Recovery

### Automated Backups
```bash
# Create immediate backup
./deploy.sh backup

# Schedule daily backups (add to crontab)
0 2 * * * /path/to/ai-security-framework/deploy.sh backup
```

### Restore from Backup
```bash
# Stop services
./deploy.sh stop

# Restore database
docker-compose -f docker-compose.production.yml up -d postgres
cat backups/YYYYMMDD_HHMMSS/database.sql | docker-compose -f docker-compose.production.yml exec -T postgres psql -U aisec aisec_db

# Restore files
tar -xzf backups/YYYYMMDD_HHMMSS/assessment_data.tar.gz

# Restart services
./deploy.sh deploy
```

## Security Hardening

### 1. Network Security
```bash
# Restrict database access
iptables -A INPUT -p tcp --dport 5432 -s 172.16.0.0/12 -j ACCEPT
iptables -A INPUT -p tcp --dport 5432 -j DROP

# Restrict Redis access
iptables -A INPUT -p tcp --dport 6379 -s 172.16.0.0/12 -j ACCEPT
iptables -A INPUT -p tcp --dport 6379 -j DROP
```

### 2. Application Security
- Enable JWT token rotation
- Configure rate limiting
- Set up fail2ban for intrusion prevention
- Regular security updates

### 3. Data Protection
- Encrypt sensitive assessment data
- Implement data retention policies
- Regular security audits
- Compliance monitoring

## Scaling

### Horizontal Scaling
```bash
# Scale web application
docker-compose -f docker-compose.production.yml up -d --scale aisec-framework=3

# Add load balancer configuration
# Update nginx upstream block with additional servers
```

### Vertical Scaling
```bash
# Update resource limits in docker-compose.production.yml
# Increase CPU/memory allocations
# Restart services
```

## Troubleshooting

### Common Issues

#### Service Won't Start
```bash
# Check logs
./deploy.sh logs

# Check disk space
df -h

# Check memory usage
free -h
```

#### Database Connection Errors
```bash
# Reset database
docker-compose -f docker-compose.production.yml restart postgres

# Check database logs
./deploy.sh logs postgres
```

#### High Memory Usage
```bash
# Monitor resource usage
./deploy.sh status

# Tune worker processes in gunicorn.conf.py
# Restart services
```

### Performance Optimization

#### Database Optimization
```sql
-- Connect to database
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM assessments WHERE created_at > NOW() - INTERVAL '7 days';

-- Add indexes for common queries
CREATE INDEX idx_assessments_created_at ON assessments(created_at);
```

#### Application Tuning
```bash
# Adjust worker processes based on CPU cores
# Edit production/gunicorn.conf.py
workers = (CPU_CORES * 2) + 1

# Tune memory settings
# Edit .env.production
MAX_REQUESTS=2000
```

## Maintenance

### Regular Tasks
- Weekly backup verification
- Monthly security updates
- Quarterly performance reviews
- Annual disaster recovery testing

### Updates
```bash
# Pull latest code
git pull origin main

# Rebuild and deploy
./deploy.sh restart
```

### Health Monitoring
```bash
# Automated health checks
curl -f http://localhost/health || alert_admin

# Monitor key metrics
# Set up alerts in Grafana for critical thresholds
```

## Support

For production support and enterprise licensing:
- Documentation: [Framework Documentation](https://graceful-halva-6e33c6.netlify.app/)
- Issues: [GitHub Issues](https://github.com/Regine12/ai-security-framework/issues)
- Enterprise Support: Contact security team

---

**Production Deployment Complete**: The AI Security Framework is now ready for enterprise use with monitoring, scaling, and security features enabled.
