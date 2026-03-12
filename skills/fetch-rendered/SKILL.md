---
name: fetch-rendered
description: Fetch JavaScript-rendered web pages. Use when WebFetch fails to get content from SPAs, React/Vue pages, or client-side rendered sites.
compatibility: Requires Node.js, npm, and Playwright. Runs a local server on port 3456.
allowed-tools: Bash, Read
---

# Fetch Rendered Page

Fetches fully rendered HTML from JavaScript-heavy pages.

## When to Use

- Standard WebFetch returns empty/incomplete content
- Page is a Single Page Application (SPA)
- Content renders client-side (React, Vue, Angular)
- Need text from modern documentation sites

## Setup

Install dependencies once:
```bash
cd ${CLAUDE_SKILL_DIR}
npm install
npx playwright install chromium
```

## Usage

### Start Server
```bash
cd ${CLAUDE_SKILL_DIR} && node server.js &
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

## Parameters

| Param | Description | Default |
|-------|-------------|---------|
| url | Target URL | required |
| waitTime | Wait after load (ms) | 3000 |
| waitFor | CSS selector to wait for | - |
| timeout | Page timeout (ms) | 30000 |

## Example

Input: `/fetch-rendered https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot`

```bash
cd ${CLAUDE_SKILL_DIR} && node server.js &
sleep 3
curl -s "http://localhost:3456/render?url=https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot&waitTime=5000" | jq -r '.textContent'
pkill -f "node.*server.js"
```

## Errors

- **Server won't start**: Run `npm install` in skill directory
- **Empty content**: Increase waitTime to 5000-10000
- **Port in use**: `lsof -ti:3456 | xargs kill -9`
