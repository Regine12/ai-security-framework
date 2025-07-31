#!/bin/bash

# AI Security Framework Production Deployment Script
# This script sets up and deploys the framework in production mode

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE=".env.production"
COMPOSE_FILE="docker-compose.production.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check dependencies
check_dependencies() {
    log_info "Checking system dependencies..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_success "All dependencies are installed"
}

# Generate secure secrets
generate_secrets() {
    log_info "Generating secure secrets..."
    
    JWT_SECRET=$(openssl rand -hex 32)
    POSTGRES_PASSWORD=$(openssl rand -hex 16)
    REDIS_PASSWORD=$(openssl rand -hex 16)
    GRAFANA_PASSWORD=$(openssl rand -hex 12)
    
    log_success "Secrets generated successfully"
}

# Create production environment file
create_env_file() {
    log_info "Creating production environment file..."
    
    if [ -f "$ENV_FILE" ]; then
        log_warning "Production environment file already exists. Backing up..."
        cp "$ENV_FILE" "${ENV_FILE}.backup.$(date +%s)"
    fi
    
    cat > "$ENV_FILE" << EOF
# AI Security Framework Production Configuration
# Generated on $(date)

# Application Settings
NODE_ENV=production
PYTHON_ENV=production
LOG_LEVEL=info
PORT=3000
API_PORT=3001

# Security Settings
JWT_SECRET=${JWT_SECRET}
API_RATE_LIMIT=1000
MAX_ASSESSMENT_SIZE=100MB
SESSION_TIMEOUT=3600

# Database Configuration
DATABASE_URL=postgresql://aisec:${POSTGRES_PASSWORD}@postgres:5432/aisec_db
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Redis Configuration
REDIS_URL=redis://redis:6379
REDIS_PASSWORD=${REDIS_PASSWORD}

# Monitoring
GRAFANA_PASSWORD=${GRAFANA_PASSWORD}
PROMETHEUS_ENABLED=true

# Performance Tuning
WORKERS=4
MAX_REQUESTS=1000
TIMEOUT=120
KEEPALIVE=2
EOF
    
    log_success "Environment file created: $ENV_FILE"
}

# Build and deploy
deploy() {
    log_info "Building and deploying AI Security Framework..."
    
    # Stop any existing deployment
    docker-compose -f "$COMPOSE_FILE" down 2>/dev/null || true
    
    # Build images
    log_info "Building Docker images..."
    docker-compose -f "$COMPOSE_FILE" build --no-cache
    
    # Start services
    log_info "Starting services..."
    docker-compose -f "$COMPOSE_FILE" up -d
    
    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 30
    
    # Check health
    log_info "Checking service health..."
    if curl -f http://localhost/health > /dev/null 2>&1; then
        log_success "AI Security Framework is running successfully!"
        log_info "Web Interface: http://localhost"
        log_info "Monitoring: http://localhost:3001 (Grafana)"
        log_info "Metrics: http://localhost:9090 (Prometheus)"
    else
        log_error "Health check failed. Please check the logs."
        docker-compose -f "$COMPOSE_FILE" logs
        exit 1
    fi
}

# Show status
show_status() {
    log_info "Service Status:"
    docker-compose -f "$COMPOSE_FILE" ps
    
    log_info "Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
}

# Show logs
show_logs() {
    local service=${1:-""}
    if [ -n "$service" ]; then
        docker-compose -f "$COMPOSE_FILE" logs -f "$service"
    else
        docker-compose -f "$COMPOSE_FILE" logs -f
    fi
}

# Backup data
backup_data() {
    log_info "Creating backup..."
    
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Backup database
    docker-compose -f "$COMPOSE_FILE" exec -T postgres pg_dump -U aisec aisec_db > "$BACKUP_DIR/database.sql"
    
    # Backup assessment data
    tar -czf "$BACKUP_DIR/assessment_data.tar.gz" output/ logs/ config/ 2>/dev/null || true
    
    log_success "Backup created: $BACKUP_DIR"
}

# Stop deployment
stop() {
    log_info "Stopping AI Security Framework..."
    docker-compose -f "$COMPOSE_FILE" down
    log_success "Services stopped"
}

# Main function
main() {
    case "${1:-deploy}" in
        "deploy")
            check_dependencies
            generate_secrets
            create_env_file
            deploy
            ;;
        "status")
            show_status
            ;;
        "logs")
            show_logs "$2"
            ;;
        "backup")
            backup_data
            ;;
        "stop")
            stop
            ;;
        "restart")
            stop
            deploy
            ;;
        *)
            echo "Usage: $0 {deploy|status|logs|backup|stop|restart}"
            echo ""
            echo "Commands:"
            echo "  deploy   - Deploy the AI Security Framework"
            echo "  status   - Show service status and resource usage"
            echo "  logs     - Show logs (optionally for specific service)"
            echo "  backup   - Create backup of data and configuration"
            echo "  stop     - Stop all services"
            echo "  restart  - Stop and redeploy services"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
