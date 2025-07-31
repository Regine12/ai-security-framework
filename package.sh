#!/bin/bash

# AISec-Pentester Framework Packaging Script
# This script creates distribution packages for different deployment scenarios

set -e

# Configuration
FRAMEWORK_NAME="aisec-pentester"
VERSION="2.0"
BUILD_DIR="build"
DIST_DIR="dist"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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
    log_info "Checking dependencies..."
    
    local deps=("python3" "node" "npm" "zip" "tar")
    local missing_deps=()
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            missing_deps+=("$dep")
        fi
    done
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "Missing dependencies: ${missing_deps[*]}"
        log_info "Please install missing dependencies and try again."
        exit 1
    fi
    
    log_success "All dependencies found"
}

# Clean previous builds
clean_build() {
    log_info "Cleaning previous builds..."
    rm -rf "$BUILD_DIR" "$DIST_DIR"
    mkdir -p "$BUILD_DIR" "$DIST_DIR"
    log_success "Build directories cleaned"
}

# Build Python package
build_python_package() {
    log_info "Building Python package..."
    
    # Create Python wheel
    cd aisec_pentester
    python3 setup.py sdist bdist_wheel
    cd ..
    
    # Copy to build directory
    cp -r aisec_pentester/dist/* "$BUILD_DIR/"
    
    log_success "Python package built"
}

# Build web interface
build_web_interface() {
    log_info "Building web interface..."
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    
    # Build production assets
    npm run build 2>/dev/null || log_warning "No build script found, copying static files"
    
    # Create web package
    mkdir -p "$BUILD_DIR/web"
    cp -r public/* "$BUILD_DIR/web/"
    cp server.js package.json "$BUILD_DIR/"
    
    log_success "Web interface built"
}

# Create deployment packages
create_packages() {
    log_info "Creating deployment packages..."
    
    # Full deployment package
    create_full_package
    
    # Python-only package
    create_python_package
    
    # Docker package
    create_docker_package
    
    # Source package
    create_source_package
    
    log_success "All packages created"
}

# Full deployment package
create_full_package() {
    local package_name="${FRAMEWORK_NAME}-full-${VERSION}-${TIMESTAMP}"
    local package_dir="$BUILD_DIR/$package_name"
    
    log_info "Creating full deployment package: $package_name"
    
    mkdir -p "$package_dir"
    
    # Copy all necessary files
    cp -r aisec_pentester "$package_dir/"
    cp -r public "$package_dir/"
    cp -r docs "$package_dir/"
    cp server.js package.json pyproject.toml setup.py "$package_dir/"
    cp install.sh README.md LICENSE "$package_dir/"
    cp Dockerfile docker-compose.yml "$package_dir/"
    
    # Create installation script
    cat > "$package_dir/deploy.sh" << 'EOF'
#!/bin/bash
echo "AISec-Pentester Framework Deployment"
echo "===================================="

# Check for Python and Node.js
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required"
    exit 1
fi

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install -r aisec_pentester/requirements.txt

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Set executable permissions
chmod +x install.sh

echo "Deployment completed successfully!"
echo "Run 'node server.js' to start the web interface"
echo "Run 'python3 -m aisec_pentester --help' for CLI usage"
EOF
    
    chmod +x "$package_dir/deploy.sh"
    
    # Create archives
    cd "$BUILD_DIR"
    tar -czf "$package_name.tar.gz" "$package_name"
    zip -r "$package_name.zip" "$package_name" > /dev/null
    cd ..
    
    # Move to dist
    mv "$BUILD_DIR/$package_name.tar.gz" "$DIST_DIR/"
    mv "$BUILD_DIR/$package_name.zip" "$DIST_DIR/"
    
    log_success "Full package created: $package_name"
}

# Python-only package
create_python_package() {
    local package_name="${FRAMEWORK_NAME}-python-${VERSION}-${TIMESTAMP}"
    local package_dir="$BUILD_DIR/$package_name"
    
    log_info "Creating Python-only package: $package_name"
    
    mkdir -p "$package_dir"
    
    # Copy Python files only
    cp -r aisec_pentester "$package_dir/"
    cp pyproject.toml setup.py README.md LICENSE "$package_dir/"
    cp docs/API_DOCUMENTATION.md "$package_dir/"
    
    # Create installation script
    cat > "$package_dir/install.sh" << 'EOF'
#!/bin/bash
echo "Installing AISec-Pentester Python Framework..."
pip3 install -r aisec_pentester/requirements.txt
echo "Installation completed!"
echo "Usage: python3 -m aisec_pentester --help"
EOF
    
    chmod +x "$package_dir/install.sh"
    
    # Create archive
    cd "$BUILD_DIR"
    tar -czf "$package_name.tar.gz" "$package_name"
    cd ..
    
    mv "$BUILD_DIR/$package_name.tar.gz" "$DIST_DIR/"
    
    log_success "Python package created: $package_name"
}

# Docker package
create_docker_package() {
    local package_name="${FRAMEWORK_NAME}-docker-${VERSION}-${TIMESTAMP}"
    local package_dir="$BUILD_DIR/$package_name"
    
    log_info "Creating Docker package: $package_name"
    
    mkdir -p "$package_dir"
    
    # Copy Docker files and source
    cp -r aisec_pentester public "$package_dir/"
    cp Dockerfile docker-compose.yml server.js package.json "$package_dir/"
    cp README.md LICENSE "$package_dir/"
    
    # Create Docker deployment script
    cat > "$package_dir/docker-deploy.sh" << 'EOF'
#!/bin/bash
echo "AISec-Pentester Docker Deployment"
echo "================================="

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is required"
    exit 1
fi

# Build and run
echo "Building Docker image..."
docker build -t aisec-pentester:latest .

echo "Starting container..."
docker-compose up -d

echo "Deployment completed!"
echo "Access the web interface at http://localhost:3000"
echo "Use 'docker-compose logs -f' to view logs"
EOF
    
    chmod +x "$package_dir/docker-deploy.sh"
    
    # Create archive
    cd "$BUILD_DIR"
    tar -czf "$package_name.tar.gz" "$package_name"
    cd ..
    
    mv "$BUILD_DIR/$package_name.tar.gz" "$DIST_DIR/"
    
    log_success "Docker package created: $package_name"
}

# Source package
create_source_package() {
    local package_name="${FRAMEWORK_NAME}-source-${VERSION}-${TIMESTAMP}"
    
    log_info "Creating source package: $package_name"
    
    # Create source archive excluding build artifacts
    git archive --format=tar.gz --prefix="$package_name/" HEAD > "$DIST_DIR/$package_name.tar.gz"
    
    log_success "Source package created: $package_name"
}

# Generate checksums
generate_checksums() {
    log_info "Generating checksums..."
    
    cd "$DIST_DIR"
    for file in *.tar.gz *.zip; do
        if [ -f "$file" ]; then
            sha256sum "$file" > "$file.sha256"
            md5sum "$file" > "$file.md5"
        fi
    done
    cd ..
    
    log_success "Checksums generated"
}

# Create release notes
create_release_notes() {
    log_info "Creating release notes..."
    
    cat > "$DIST_DIR/RELEASE_NOTES.md" << EOF
# AISec-Pentester Framework v${VERSION}

## Release Information
- **Version**: ${VERSION}
- **Build Date**: $(date)
- **Build ID**: ${TIMESTAMP}

## Package Contents

### Full Deployment Package (${FRAMEWORK_NAME}-full-${VERSION}-${TIMESTAMP})
- Complete framework with web interface
- All dependencies and documentation
- Ready for production deployment
- Supports both CLI and web usage

### Python Package (${FRAMEWORK_NAME}-python-${VERSION}-${TIMESTAMP})
- Python framework only
- Command-line interface
- Ideal for automation and CI/CD integration

### Docker Package (${FRAMEWORK_NAME}-docker-${VERSION}-${TIMESTAMP})
- Containerized deployment
- Includes docker-compose configuration
- Easy deployment and scaling

### Source Package (${FRAMEWORK_NAME}-source-${VERSION}-${TIMESTAMP})
- Complete source code
- For development and customization

## Installation Instructions

### Full Package
\`\`\`bash
tar -xzf ${FRAMEWORK_NAME}-full-${VERSION}-${TIMESTAMP}.tar.gz
cd ${FRAMEWORK_NAME}-full-${VERSION}-${TIMESTAMP}
./deploy.sh
\`\`\`

### Python Package
\`\`\`bash
tar -xzf ${FRAMEWORK_NAME}-python-${VERSION}-${TIMESTAMP}.tar.gz
cd ${FRAMEWORK_NAME}-python-${VERSION}-${TIMESTAMP}
./install.sh
\`\`\`

### Docker Package
\`\`\`bash
tar -xzf ${FRAMEWORK_NAME}-docker-${VERSION}-${TIMESTAMP}.tar.gz
cd ${FRAMEWORK_NAME}-docker-${VERSION}-${TIMESTAMP}
./docker-deploy.sh
\`\`\`

## Verification

All packages include SHA256 and MD5 checksums for verification:
\`\`\`bash
sha256sum -c package-name.tar.gz.sha256
md5sum -c package-name.tar.gz.md5
\`\`\`

## Support

- Documentation: docs/
- API Reference: docs/API_DOCUMENTATION.md
- Deployment Guide: docs/DEPLOYMENT_GUIDE.md

For issues and support, visit: https://github.com/Regine12/ai-security-framework

---
Generated by AISec-Pentester packaging system
EOF
    
    log_success "Release notes created"
}

# Display summary
show_summary() {
    log_info "Package Summary"
    echo "==============="
    echo
    echo "Build completed successfully!"
    echo "Packages created in: $DIST_DIR/"
    echo
    echo "Available packages:"
    ls -lh "$DIST_DIR"/*.tar.gz "$DIST_DIR"/*.zip 2>/dev/null || true
    echo
    echo "Checksums:"
    ls -1 "$DIST_DIR"/*.sha256 "$DIST_DIR"/*.md5 2>/dev/null || true
    echo
    log_success "Build process completed!"
}

# Main execution
main() {
    echo "AISec-Pentester Framework Packaging System"
    echo "=========================================="
    echo
    
    check_dependencies
    clean_build
    build_python_package
    build_web_interface
    create_packages
    generate_checksums
    create_release_notes
    show_summary
}

# Run if executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
