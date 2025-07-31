# AISec-Pentester Framework Makefile
# Enterprise AI Security Assessment Platform

.PHONY: help install dev test lint format build package deploy clean docs docker

# Default target
help:
	@echo "AISec-Pentester Framework Build System"
	@echo "======================================"
	@echo ""
	@echo "Available targets:"
	@echo "  install     - Install framework dependencies"
	@echo "  dev         - Install development dependencies"
	@echo "  test        - Run test suite"
	@echo "  lint        - Run code linting"
	@echo "  format      - Format code with black"
	@echo "  build       - Build Python packages"
	@echo "  package     - Create distribution packages"
	@echo "  deploy      - Deploy to production"
	@echo "  clean       - Clean build artifacts"
	@echo "  docs        - Generate documentation"
	@echo "  docker      - Build Docker images"
	@echo "  all         - Run full build pipeline"
	@echo ""

# Variables
PYTHON := python3
PIP := pip3
NODE := node
NPM := npm
DOCKER := docker
BUILD_DIR := build
DIST_DIR := dist
DOCS_DIR := docs/_build

# Installation targets
install:
	@echo "Installing AISec-Pentester Framework..."
	$(PIP) install -r aisec_pentester/requirements.txt
	@if [ -f package.json ]; then $(NPM) install; fi
	@echo "Installation completed!"

dev: install
	@echo "Installing development dependencies..."
	$(PIP) install -e .[dev]
	$(NPM) install --include=dev
	pre-commit install
	@echo "Development environment ready!"

# Testing targets
test:
	@echo "Running test suite..."
	$(PYTHON) -m pytest tests/ -v --cov=aisec_pentester --cov-report=html --cov-report=term
	@echo "Tests completed!"

test-fast:
	@echo "Running fast tests..."
	$(PYTHON) -m pytest tests/ -v -x --tb=short
	@echo "Fast tests completed!"

test-integration:
	@echo "Running integration tests..."
	$(PYTHON) tests/test_framework.py
	@echo "Integration tests completed!"

# Code quality targets
lint:
	@echo "Running code linting..."
	flake8 aisec_pentester/
	mypy aisec_pentester/
	@echo "Linting completed!"

format:
	@echo "Formatting code..."
	black aisec_pentester/
	isort aisec_pentester/
	@echo "Code formatting completed!"

security-scan:
	@echo "Running security scan..."
	bandit -r aisec_pentester/
	safety check
	@echo "Security scan completed!"

# Build targets
build:
	@echo "Building Python packages..."
	$(PYTHON) setup.py sdist bdist_wheel
	@echo "Build completed!"

build-web:
	@echo "Building web interface..."
	@if [ -f package.json ]; then \
		$(NPM) run build 2>/dev/null || echo "No build script found"; \
	fi
	@echo "Web build completed!"

# Packaging targets
package: clean build build-web
	@echo "Creating distribution packages..."
	chmod +x package.sh
	./package.sh
	@echo "Packaging completed!"

package-docker:
	@echo "Building Docker images..."
	$(DOCKER) build -t aisec-pentester:latest .
	$(DOCKER) build -t aisec-pentester:$(shell git rev-parse --short HEAD) .
	@echo "Docker packaging completed!"

# Documentation targets
docs:
	@echo "Generating documentation..."
	@mkdir -p $(DOCS_DIR)
	sphinx-build -b html docs/ $(DOCS_DIR)/html
	@echo "Documentation generated in $(DOCS_DIR)/html"

docs-serve:
	@echo "Serving documentation..."
	$(PYTHON) -m http.server 8080 --directory $(DOCS_DIR)/html

api-docs:
	@echo "Generating API documentation..."
	sphinx-apidoc -o docs/api aisec_pentester/
	@echo "API documentation generated!"

# Deployment targets
deploy-local:
	@echo "Deploying locally..."
	$(PYTHON) server.py &
	@echo "Local deployment started on http://localhost:3000"

deploy-docker:
	@echo "Deploying with Docker..."
	docker-compose up -d
	@echo "Docker deployment started!"

deploy-production:
	@echo "Deploying to production..."
	@echo "WARNING: Make sure you have proper credentials and configuration!"
	$(NPM) run deploy 2>/dev/null || echo "No deploy script configured"
	@echo "Production deployment initiated!"

# Cleanup targets
clean:
	@echo "Cleaning build artifacts..."
	rm -rf $(BUILD_DIR) $(DIST_DIR) $(DOCS_DIR)
	rm -rf *.egg-info/
	rm -rf .pytest_cache/
	rm -rf .coverage htmlcov/
	rm -rf node_modules/.cache/
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	@echo "Cleanup completed!"

clean-docker:
	@echo "Cleaning Docker artifacts..."
	$(DOCKER) system prune -f
	$(DOCKER) image prune -f
	@echo "Docker cleanup completed!"

# Development targets
dev-setup: dev
	@echo "Setting up development environment..."
	pre-commit install
	@mkdir -p logs output config
	@echo "Development setup completed!"

dev-server:
	@echo "Starting development server..."
	$(NODE) server.js

dev-watch:
	@echo "Starting development with file watching..."
	nodemon server.js

# Validation targets
validate:
	@echo "Validating framework..."
	$(PYTHON) -m aisec_pentester --validate-config
	@echo "Validation completed!"

health-check:
	@echo "Running health checks..."
	@curl -f http://localhost:3000/health 2>/dev/null || echo "Server not running"
	@echo "Health check completed!"

# CI/CD targets
ci: lint test security-scan
	@echo "CI pipeline completed!"

cd: clean build package
	@echo "CD pipeline completed!"

all: clean dev lint test build package docs
	@echo "Full build pipeline completed!"

# Release targets
version-bump:
	@echo "Current version: $(shell grep version setup.py | head -1 | sed 's/.*version="\([^"]*\)".*/\1/')"
	@echo "To bump version, edit setup.py and aisec_pentester/__init__.py"

release: all
	@echo "Creating release..."
	@echo "Please tag the release: git tag -a v$(shell grep version setup.py | head -1 | sed 's/.*version="\([^"]*\)".*/\1/') -m 'Release version X.X.X'"
	@echo "Then push: git push origin v$(shell grep version setup.py | head -1 | sed 's/.*version="\([^"]*\)".*/\1/')"

# Utility targets
deps-update:
	@echo "Updating dependencies..."
	$(PIP) install --upgrade pip setuptools wheel
	$(NPM) update
	@echo "Dependencies updated!"

deps-audit:
	@echo "Auditing dependencies..."
	$(PIP) audit
	$(NPM) audit
	@echo "Dependency audit completed!"

logs:
	@echo "Showing recent logs..."
	@tail -f logs/*.log 2>/dev/null || echo "No log files found"

backup:
	@echo "Creating backup..."
	@tar -czf backup_$(shell date +%Y%m%d_%H%M%S).tar.gz \
		--exclude=node_modules \
		--exclude=.git \
		--exclude=build \
		--exclude=dist \
		.
	@echo "Backup created!"

# Help for specific targets
help-install:
	@echo "Install target: Sets up the framework with all required dependencies"
	@echo "Usage: make install"

help-test:
	@echo "Test targets: Run various types of tests"
	@echo "  make test           - Full test suite with coverage"
	@echo "  make test-fast      - Quick tests without coverage"
	@echo "  make test-integration - Integration tests only"

help-deploy:
	@echo "Deploy targets: Deploy the framework to different environments"
	@echo "  make deploy-local      - Start local development server"
	@echo "  make deploy-docker     - Deploy using Docker Compose"
	@echo "  make deploy-production - Deploy to production environment"
