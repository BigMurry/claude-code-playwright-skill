# Claude Code Playwright Skill

A Claude Code skill that uses headless Playwright to fetch JavaScript-rendered web pages that standard WebFetch cannot handle.

## Problem

Claude Code's `WebFetch` tool cannot read JavaScript-heavy pages (SPAs) because:
- It only gets initial HTML, not dynamically rendered content
- Many modern documentation sites use client-side rendering
- Pages with React/Vue/Angular frameworks don't work

## Solution

This skill runs a local Playwright server that:
1. Launches a headless Chromium browser
2. Navigates to the target URL
3. Waits for JavaScript to fully render
4. Returns the complete HTML content

## Installation

```bash
# Clone or download this skill to your desired location
# Navigate to the skill directory
cd /path/to/claude-code-playwright-skill

# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Quick Start

### One-liner (macOS/Linux)

```bash
(cd /path/to/claude-code-playwright-skill && node server.js &); sleep 3; curl -s "http://localhost:3456/render?url=https://example.com&waitTime=5000"
```

### Step by Step

1. **Start the server:**
   ```bash
   node server.js &
   ```

2. **Wait for server to start:**
   ```bash
   sleep 3
   ```

3. **Fetch a rendered page:**
   ```bash
   curl -s "http://localhost:3456/render?url=https://example.com&waitTime=3000"
   ```

4. **Stop the server:**
   ```bash
   # macOS
   lsof -ti:3456 | xargs kill -9

   # Linux
   fuser -k 3456/tcp

   # Or use pkill (all platforms)
   pkill -f "node.*server.js"
   ```

## Custom Port

Use a different port by setting the PORT environment variable:

```bash
PORT=4000 node server.js &
curl -s "http://localhost:4000/render?url=<URL>"
```

## API Endpoints

### GET /render

Render a URL and return HTML content.

**Parameters:**
- `url` (required) - The URL to render
- `waitTime` (optional) - Milliseconds to wait after load (default: 3000)
- `waitFor` (optional) - CSS selector to wait for
- `timeout` (optional) - Page load timeout in ms (default: 30000)

**Response:**
```json
{
  "success": true,
  "url": "https://example.com",
  "title": "Example Domain",
  "html": "<!DOCTYPE html>...",
  "textContent": "Page text content..."
}
```

### GET /health

Check if server and browser are running.

```bash
curl -s "http://localhost:3456/health"
```

## Adding to Claude Code

There are two ways to add this skill to Claude Code:

### Option 1: Global Skill (All Projects)

Install the skill globally so it's available in every Claude Code session:

```bash
# Create the global skills directory
mkdir -p ~/.claude/skills/fetch-rendered

# Clone this repository (or copy files)
git clone https://github.com/YOUR_USERNAME/claude-code-playwright-skill.git /tmp/playwright-skill
cp /tmp/playwright-skill/* ~/.claude/skills/fetch-rendered/
cp /tmp/playwright-skill/SKILL.md ~/.claude/skills/fetch-rendered/SKILL.md

# Install dependencies
cd ~/.claude/skills/fetch-rendered
npm install
npx playwright install chromium
```

### Option 2: Project-Specific Skill

Add the skill to a specific project:

```bash
# In your project directory
mkdir -p .claude/skills/fetch-rendered

# Clone or copy the skill files
git clone https://github.com/YOUR_USERNAME/claude-code-playwright-skill.git /tmp/playwright-skill
cp /tmp/playwright-skill/* .claude/skills/fetch-rendered/
cp /tmp/playwright-skill/SKILL.md .claude/skills/fetch-rendered/SKILL.md

# Install dependencies
cd .claude/skills/fetch-rendered
npm install
npx playwright install chromium
```

### Starting the Server

Before using the skill in Claude Code, start the Playwright server:

```bash
# In the skill directory
cd ~/.claude/skills/fetch-rendered  # or your project path
npm start

# Or use the one-liner (starts server, runs request, stops server)
npm start && sleep 3 && curl -s "http://localhost:3456/render?url=https://example.com&waitTime=3000"
```

### Using the Skill in Claude Code

Once the server is running, you can ask Claude Code to fetch JavaScript-rendered pages:

- "Fetch the JavaScript-rendered content from [URL]"
- "Use the fetch-rendered skill to get content from [URL]"
- "Render this SPA page: [URL]"

The skill will automatically use the `/render` endpoint to fetch fully rendered content.

### Quick Reference

```bash
# Skill directory
~/.claude/skills/fetch-rendered/

# Start server
npm start

# Stop server
npm run stop

# Server URL
http://localhost:3456

# Example API call
curl -s "http://localhost:3456/render?url=https://example.com&waitTime=5000"
```

## Example: Fetch Lark Bot Documentation

```bash
curl -s "http://localhost:3456/render?url=https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot&waitTime=5000" | jq '.textContent'
```

## Troubleshooting

### Server won't start
- Check if port 3456 is available
- Verify Node.js is installed: `node --version`
- Run: `npm install` to ensure dependencies are installed

### Empty content returned
- Increase `waitTime` parameter (try 5000-10000)
- Check if the URL is accessible in a regular browser

### Browser error
- Reinstall browsers: `npx playwright install chromium`
- On macOS, you may need: `npx playwright install-deps`
- On Linux (Ubuntu/Debian): `npx playwright install-deps`

### Port already in use
```bash
# macOS
lsof -ti:3456 | xargs kill -9

# Linux
fuser -k 3456/tcp

# Windows (PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3456).OwningProcess -Force
```

## Using npm Scripts

This package includes convenient npm scripts:

```bash
# Install dependencies and browsers
npm run install

# Start the server
npm start

# Stop any server on port 3456
npm run stop

# Restart the server (stop + start)
npm run restart

# Test the server
npm test
```

## Files

```
claude-code-playwright-skill/
├── package.json          # Dependencies and scripts
├── server.js             # Playwright server
├── SKILL.md              # Claude Code skill definition
├── README.md             # This file
└── docs/
    └── PLAN.md          # Implementation plan
```
