---
name: fetch-rendered
description: Fetch JavaScript-rendered web pages. Use when WebFetch fails to get content from SPAs, React/Vue pages, or client-side rendered sites.
license: MIT
compatibility: Requires Node.js 18+ and Playwright. Runs a local server on port 3456.
allowed-tools: Bash, Read
metadata:
  author: ""
  version: 1.0.0
---

# Fetch Rendered Page

Fetches fully rendered HTML from JavaScript-heavy pages.

## When to Use

- Standard WebFetch returns empty/incomplete content
- Page is a Single Page Application (SPA)
- Content renders client-side (React, Vue, Angular)
- Need text from modern documentation sites

## Auto-Setup

Dependencies are automatically installed on first use. No manual setup required.

## Usage

### Start Server (auto-installs if needed)
```bash
cd ${CLAUDE_SKILL_DIR} && [ ! -d node_modules ] && npm install && npx playwright install chromium; node scripts/server.js &
sleep 3
```

### Fetch Page
```bash
curl -s "http://localhost:3456/render?url=$ARGUMENTS&waitTime=5000"
```

### Extract Text
```bash
curl -s "http://localhost:3456/render?url=$ARGUMENTS" | jq -r '.textContent'
```

### Stop Server
```bash
pkill -f "node.*server.js"
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check endpoint |
| `/render` | GET | Render a URL and return HTML/text |

## Parameters

| Param | Description | Default |
|-------|-------------|---------|
| url | Target URL to render | required |
| waitTime | Milliseconds to wait after page load for JS rendering | 3000 |
| waitFor | CSS selector to wait for before capturing content | - |
| timeout | Page navigation timeout in milliseconds | 30000 |

## Example

Input: `/fetch-rendered https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot`

```bash
cd ${CLAUDE_SKILL_DIR} && [ ! -d node_modules ] && npm install && npx playwright install chromium; node scripts/server.js &
sleep 3
curl -s "http://localhost:3456/render?url=https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot&waitTime=5000" | jq -r '.textContent'
pkill -f "node.*server.js"
```

## Manual Setup (if needed)

If automatic installation fails, run manually:
```bash
cd ${CLAUDE_SKILL_DIR}
npm install
npx playwright install chromium
```

## Errors

- **Server won't start**: Run `npm install` in skill directory
- **Empty content**: Increase waitTime to 5000-10000
- **Port in use**: `lsof -ti:3456 | xargs kill -9`
