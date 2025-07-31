# AISec-Pentester Framework
FROM node:18-alpine AS web-builder

# Set working directory for web interface
WORKDIR /app/web

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy web assets
COPY public/ ./public/
COPY server.js ./

# Python runtime for AISec-Pentester
FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create application user
RUN useradd --create-home --shell /bin/bash aisec
WORKDIR /home/aisec

# Copy Python requirements and install
COPY aisec_pentester/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=aisec:aisec aisec_pentester/ aisec_pentester/
COPY --chown=aisec:aisec --from=web-builder /app/web/ web/

# Install Node.js for web interface
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Set up directories
RUN mkdir -p logs output config \
    && chown -R aisec:aisec logs output config

# Switch to application user
USER aisec

# Set environment variables
ENV PYTHONPATH=/home/aisec
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Default command
CMD ["node", "web/server.js"]
