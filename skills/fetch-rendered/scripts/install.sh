#!/bin/bash
# One-step installation script for Playwright Claude Code Skill

set -e

echo "Installing Claude Code Playwright Skill..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "Installing Node.js dependencies..."
npm install

echo "Installing Playwright browsers..."
npx playwright install chromium

echo ""
echo "Installation complete!"
echo ""
echo "To start the server:"
echo "  npm start"
echo ""
echo "To fetch a rendered page:"
echo "  curl -s 'http://localhost:3456/render?url=https://example.com&waitTime=3000'"
echo ""
echo "To stop the server:"
echo "  npm run stop"
echo ""
echo "For more options, see README.md"
