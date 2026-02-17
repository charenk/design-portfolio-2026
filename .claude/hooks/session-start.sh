#!/bin/bash
set -euo pipefail

# Only run in Claude Code remote/web environment
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo '{"async": true, "asyncTimeout": 300000}'

cd "$CLAUDE_PROJECT_DIR"

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Build Tailwind CSS
echo "Building Tailwind CSS..."
npm run build

# Start HTTP server in background on port 8000
echo "Starting HTTP server on port 8000..."
pkill -f "python3 -m http.server 8000" 2>/dev/null || true
nohup python3 -m http.server 8000 > /tmp/http-server.log 2>&1 &

echo "Server started. Access at http://localhost:8000"
