---
name: fetch-rendered
description: Fetches JavaScript-rendered web pages using headless Playwright. Use this when WebFetch fails to get content from JavaScript-heavy pages (SPAs). Auto-triggers when user mentions "render", "headless", "playwright", or "JavaScript-rendered page".
disable-model-invocation: false
allowed-tools: Bash, Read
---

# Fetch Rendered Page Skill

This skill fetches JavaScript-rendered web pages using headless Playwright when the standard WebFetch tool cannot get the content.

## When to Use

Use this skill when:
- WebFetch fails to get content from a URL
- The page is a Single Page Application (SPA) with heavy JavaScript
- You need to extract content from modern documentation sites (like Lark, etc.)
- The page content is rendered client-side

## Setup Required (One-time)

1. Navigate to the skill directory:
   ```bash
   cd "$(dirname "$0")"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

## Usage Pattern

This skill follows an **on-demand** pattern: start → use → stop

### Quick Command (Recommended)

```bash
# Single line: start server, fetch, stop server (macOS/Linux)
(SKILL_DIR="$(cd "$(dirname "$0")" && pwd)" && cd "$SKILL_DIR" && node server.js &); sleep 3; curl -s "http://localhost:3456/render?url=<URL>&waitTime=5000"; pkill -f "node.*server.js" 2>/dev/null
```

### Step by Step

**1. Start the server:**
```bash
SKILL_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SKILL_DIR" && node server.js &
sleep 3
```

**2. Fetch the rendered page:**
```bash
curl -s "http://localhost:3456/render?url=<URL>&waitTime=5000"
```

**3. Stop the server (after use):**
```bash
# macOS/Linux
pkill -f "node.*server.js" 2>/dev/null

# Or using port (macOS)
lsof -ti:3456 | xargs kill -9 2>/dev/null

# Or using fuser (Linux)
fuser -k 3456/tcp 2>/dev/null
```

### Extract Text Content

For easier analysis, extract just the text:
```bash
curl -s "http://localhost:3456/render?url=<URL>&waitTime=5000" | jq -r '.textContent'
```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| url | The URL to render (required) | - |
| waitTime | Milliseconds to wait after page load | 3000 |
| waitFor | CSS selector to wait for | - |
| timeout | Page load timeout in ms | 30000 |

## Example: Fetch Lark Bot Documentation

```bash
# Start
SKILL_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SKILL_DIR" && node server.js &
sleep 3

# Fetch
curl -s "http://localhost:3456/render?url=https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot&waitTime=5000" | jq -r '.textContent'

# Stop
pkill -f "node.*server.js" 2>/dev/null
```

## Error Handling

### Server won't start
- Check dependencies: `npm install`
- Reinstall browsers: `npx playwright install chromium`
- Check if port is in use: see below

### Empty content
- Increase waitTime: `&waitTime=8000`
- Or use waitFor selector: `&waitFor=.content`

### Port in use (3456)
```bash
# macOS
lsof -ti:3456 | xargs kill -9 2>/dev/null

# Linux
fuser -k 3456/tcp 2>/dev/null

# Windows (PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3456).OwningProcess -Force
```

## Custom Port

To use a different port, set the PORT environment variable:
```bash
PORT=4000 node server.js &
curl -s "http://localhost:4000/render?url=<URL>"
```

## Project Location

The skill directory is dynamically detected. The server runs on port 3456 by default (configurable via PORT env var).
