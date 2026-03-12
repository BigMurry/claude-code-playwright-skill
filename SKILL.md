---
name: fetch-rendered
description: Fetches JavaScript-rendered web pages using headless Playwright. Use when WebFetch fails to get content from JavaScript-heavy pages (SPAs).
disable-model-invocation: false
allowed-tools: Bash, Read
---

# Fetch Rendered Page Skill

This skill fetches JavaScript-rendered web pages using headless Playwright.

## When to Use

- WebFetch fails to get content from a URL
- Page is a Single Page Application (SPA)
- Content is rendered client-side (React, Vue, Angular)
- Need to extract text from modern documentation sites

## How It Works

1. Start the Playwright server
2. Call the `/render` endpoint with the target URL
3. Extract `textContent` from the JSON response
4. Stop the server (optional)

## Setup

The skill directory must have dependencies installed:
```bash
npm install
npx playwright install chromium
```

## Usage Pattern

### Start Server
```bash
cd "$(dirname "$0")" && node server.js &
sleep 3
```

### Fetch Rendered Page
```bash
curl -s "http://localhost:3456/render?url=<URL>&waitTime=5000"
```

### Stop Server
```bash
pkill -f "node.*server.js" 2>/dev/null
```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| url | Page to render | required |
| waitTime | Milliseconds to wait after load | 3000 |
| waitFor | CSS selector to wait for | - |
| timeout | Page load timeout (ms) | 30000 |

## Example

```bash
cd "$(dirname "$0")" && node server.js &
sleep 3
curl -s "http://localhost:3456/render?url=https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot&waitTime=5000" | jq -r '.textContent'
pkill -f "node.*server.js"
```

## Extract Text Content

The response includes `textContent` - the extracted text from the rendered page:
```bash
curl -s "http://localhost:3456/render?url=<URL>" | jq -r '.textContent'
```

## Error Handling

- **Server won't start**: Run `npm install` in the skill directory
- **Empty content**: Increase waitTime to 5000-10000ms
- **Port in use**: `lsof -ti:3456 | xargs kill -9`

## Custom Port

To use a different port, set PORT before starting:
```bash
PORT=4000 node server.js &
curl -s "http://localhost:4000/render?url=<URL>"
```
