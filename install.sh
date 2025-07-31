#!/usr/bin/env bash
# AISec-Pentester Production Installation Script
# 
# This script sets up the AISec-Pentester framework for production use
# with industry-standard CI/CD practices and Docker support.

set -e

echo "🔒 AISec-Pentester Production Setup"
echo "======================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check Python version
check_python() {
    log_info "Checking Python version..."
    
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
        log_info "Found Python $PYTHON_VERSION"
        
        # Check if version is >= 3.8
        if python3 -c 'import sys; exit(0 if sys.version_info >= (3, 8) else 1)'; then
            log_success "Python version is compatible"
        else
            log_error "Python 3.8+ is required. Found: $PYTHON_VERSION"
            exit 1
        fi
    else
        log_error "Python3 is required but not installed"
        exit 1
    fi
}

# Setup virtual environment
setup_virtualenv() {
    log_info "Setting up virtual environment..."
    
    if [ ! -d "venv" ]; then
        python3 -m venv venv
        log_success "Virtual environment created"
    else
        log_info "Virtual environment already exists"
    fi
    
    source venv/bin/activate
    log_success "Virtual environment activated"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    
    # Upgrade pip first
    pip install --upgrade pip setuptools wheel
    
    # Install in development mode with all extras
    pip install -e ".[dev,gpu]"
    
    log_success "Dependencies installed"
}

# Setup pre-commit hooks (for development)
setup_precommit() {
    log_info "Setting up pre-commit hooks..."
    
    if command -v pre-commit &> /dev/null; then
        pre-commit install
        log_success "Pre-commit hooks installed"
    else
        log_warning "pre-commit not found, skipping hook setup"
    fi
}

# Create configuration directory
setup_config() {
    log_info "Setting up configuration..."
    
    mkdir -p ~/.aisec
    mkdir -p logs
    mkdir -p output
    mkdir -p data
    
    # Create default config if it doesn't exist
    if [ ! -f ~/.aisec/config.yaml ]; then
        cat > ~/.aisec/config.yaml << EOF
# AISec-Pentester Configuration
version: "2.0.0"

# Logging configuration
logging:
  level: INFO
  file: "logs/aisec.log"
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

# Output configuration
output:
  directory: "output"
  format: "json"
  include_metadata: true

# Testing configuration
testing:
  default_dataset: "synthetic"
  batch_size: 32
  max_iterations: 1000
  
# Security settings
security:
  enable_ethical_checks: true
  require_consent: true
  log_all_activities: true

# Performance settings
performance:
  use_gpu: true
  num_workers: 4
  memory_limit: "8GB"
EOF
        log_success "Default configuration created at ~/.aisec/config.yaml"
    else
        log_info "Configuration already exists"
    fi
}

# Run tests to verify installation
run_tests() {
    log_info "Running verification tests..."
    
    # Basic import test
    python3 -c "
import aisec_pentester
from aisec_pentester.core.framework import AISec
print('✓ Core imports successful')

# Test framework initialization
framework = AISec()
print('✓ Framework initialization successful')

print('✓ All verification tests passed')
"
    
    log_success "Installation verified successfully"
}

# Create example usage script
create_examples() {
    log_info "Creating example scripts..."
    
    mkdir -p examples
    
    cat > examples/basic_assessment.py << 'EOF'
#!/usr/bin/env python3
"""
Basic AI Security Assessment Example
"""

from aisec_pentester.core.framework import AISec

def main():
    print("🔒 AISec-Pentester - Basic Assessment Example")
    print("=" * 50)
    
    # Initialize framework
    framework = AISec()
    
    # Run comprehensive assessment with default test model
    results = framework.run_comprehensive_assessment()
    
    # Display results
    if 'error' not in results:
        print(f"\n✅ Assessment Complete!")
        print(f"Assessment ID: {results['assessment_id']}")
        print(f"Overall Risk Score: {results.get('security_metrics', {}).get('overall_risk_score', 'N/A')}/100")
        
        # Show top recommendations
        recommendations = results.get('recommendations', [])[:3]
        if recommendations:
            print("\n🔧 Top Recommendations:")
            for i, rec in enumerate(recommendations, 1):
                print(f"{i}. [{rec.get('priority', 'UNKNOWN')}] {rec.get('recommendation', 'N/A')}")
    else:
        print(f"❌ Assessment failed: {results['error']}")

if __name__ == "__main__":
    main()
EOF

    cat > examples/cli_usage.sh << 'EOF'
#!/bin/bash
# AISec-Pentester CLI Usage Examples

echo "🔒 AISec-Pentester CLI Examples"
echo "================================"

# Basic comprehensive assessment
echo "1. Running comprehensive assessment..."
aisec assess --comprehensive --output-format json

# Adversarial testing only
echo "2. Running adversarial testing..."
aisec test adversarial --model-type mlp --dataset synthetic

# Data poisoning detection
echo "3. Running poisoning detection..."
aisec test poisoning --dataset synthetic --detection-methods all

# Model extraction testing
echo "4. Running extraction testing..."
aisec test extraction --model-type mlp --extraction-methods query,gradient

# Generate security report
echo "5. Generating security report..."
aisec report generate --format pdf --include-recommendations
EOF

    chmod +x examples/basic_assessment.py
    chmod +x examples/cli_usage.sh
    
    log_success "Example scripts created in examples/"
}

# Setup Docker support
setup_docker() {
    log_info "Setting up Docker support..."
    
    cat > Dockerfile << 'EOF'
# AISec-Pentester Production Docker Image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for better layer caching)
COPY aisec_pentester/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Install AISec-Pentester
RUN pip install -e .

# Create non-root user
RUN useradd -m -u 1000 aisec && chown -R aisec:aisec /app
USER aisec

# Create necessary directories
RUN mkdir -p /app/output /app/logs /app/data

# Expose port for web interface (future feature)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python3 -c "import aisec_pentester; print('OK')" || exit 1

# Default command
CMD ["aisec", "--help"]
EOF

    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  aisec-pentester:
    build: .
    container_name: aisec-pentester
    volumes:
      - ./output:/app/output
      - ./logs:/app/logs
      - ./data:/app/data
      - ./config:/app/config
    environment:
      - AISEC_CONFIG_PATH=/app/config/config.yaml
      - AISEC_LOG_LEVEL=INFO
    ports:
      - "8080:8080"
    restart: unless-stopped

  # Optional: Add GPU support
  aisec-pentester-gpu:
    build: .
    container_name: aisec-pentester-gpu
    runtime: nvidia
    volumes:
      - ./output:/app/output
      - ./logs:/app/logs
      - ./data:/app/data
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
      - AISEC_USE_GPU=true
    profiles:
      - gpu
EOF

    cat > .dockerignore << 'EOF'
# Version control
.git
.gitignore

# Python
__pycache__
*.pyc
*.pyo
*.pyd
.Python
env
pip-log.txt
pip-delete-this-directory.txt
.tox
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.log
.pytest_cache

# Virtual environments
venv/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Project specific
output/
logs/
data/
node_modules/
*.tar.gz
*.zip
EOF

    log_success "Docker configuration created"
}

# Setup CI/CD workflow
setup_cicd() {
    log_info "Setting up CI/CD workflows..."
    
    mkdir -p .github/workflows
    
    cat > .github/workflows/ci.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  release:
    types: [ created ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.8, 3.9, '3.10', 3.11]

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Cache pip packages
      uses: actions/cache@v3
      with:
        path: ~/.cache/pip
        key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
        restore-keys: |
          ${{ runner.os }}-pip-
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -e ".[dev]"
    
    - name: Lint with flake8
      run: |
        flake8 aisec_pentester --count --select=E9,F63,F7,F82 --show-source --statistics
        flake8 aisec_pentester --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
    
    - name: Test with pytest
      run: |
        pytest tests/ --cov=aisec_pentester --cov-report=xml
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml

  security-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Run security scan
      uses: pypa/gh-action-pip-audit@v1.0.8
      with:
        inputs: requirements.txt

  build-and-publish:
    needs: [test, security-scan]
    runs-on: ubuntu-latest
    if: github.event_name == 'release'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install build dependencies
      run: |
        python -m pip install --upgrade pip
        pip install build twine
    
    - name: Build package
      run: python -m build
    
    - name: Publish to PyPI
      env:
        TWINE_USERNAME: __token__
        TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
      run: twine upload dist/*

  docker-build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: ${{ github.event_name == 'release' }}
        tags: |
          aisecpentester/aisec-pentester:latest
          aisecpentester/aisec-pentester:${{ github.ref_name }}
EOF

    log_success "CI/CD workflow created"
}

# Print final instructions
print_final_instructions() {
    echo ""
    log_success "🎉 AISec-Pentester Production Setup Complete!"
    echo ""
    echo "Next steps:"
    echo "1. Activate virtual environment: source venv/bin/activate"
    echo "2. Run basic test: python examples/basic_assessment.py"
    echo "3. Try CLI: aisec --help"
    echo "4. Configure settings: ~/.aisec/config.yaml"
    echo ""
    echo "Production deployment options:"
    echo "• Docker: docker-compose up"
    echo "• PyPI install: pip install aisec-pentester"
    echo "• Development: pip install -e ."
    echo ""
    echo "Documentation:"
    echo "• GitHub: https://github.com/Regine12/AISec-pentester"
    echo "• Examples: ./examples/"
    echo "• Config: ~/.aisec/config.yaml"
    echo ""
    log_warning "⚠️  Remember: This tool is for authorized security testing only!"
    log_warning "   Always follow responsible disclosure practices."
}

# Main installation flow
main() {
    log_info "Starting AISec-Pentester production setup..."
    
    check_python
    setup_virtualenv
    install_dependencies
    setup_config
    setup_precommit
    run_tests
    create_examples
    setup_docker
    setup_cicd
    
    print_final_instructions
}

# Run main installation
main
