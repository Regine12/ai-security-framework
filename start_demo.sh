#!/bin/bash

# AI Security Framework - Interactive Demo Launcher
echo "[SECURITY] AI Security Framework - Interactive Demo"
echo "=========================================="

# Kill any existing servers
pkill -f "python.*http.server" 2>/dev/null
pkill -f "node.*server" 2>/dev/null

# Find available port
PORT=8090
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; do
    PORT=$((PORT+1))
done

echo "[WEB] Starting web server on port $PORT..."

# Start simple Python server
cd "$(dirname "$0")/public"
python3 -m http.server $PORT &
SERVER_PID=$!

echo "[OK] Server started! Access at:"
echo "   Local:  http://localhost:$PORT"
echo "   Status: http://localhost:$PORT/status.html"
echo "   Debug:  http://localhost:$PORT/debug.html"
echo ""
echo "[DEMO] AI Security Demo Options:"
echo "   1. Simple Auto Demo: python simple_demo.py (recommended)"
echo "   2. Interactive Demo: python interactive_demo.py"
echo "   3. Full Framework: python launch_aisec.py"
echo "   4. Quick Tester: python interactive_tester.py"
echo ""
echo "[ANALYSIS] Core Framework Tests:"
echo "   cd aisec_pentester && python -m aisec_pentester.demo"
echo ""
echo "Press Ctrl+C to stop the server"

# Wait and cleanup
trap "kill $SERVER_PID 2>/dev/null; echo 'Server stopped'; exit" INT
wait $SERVER_PID
