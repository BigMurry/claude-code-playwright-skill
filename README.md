# Fetch Rendered Page

A Claude Code skill that fetches JavaScript-rendered web pages. Use this when standard WebFetch can't get content from SPAs.

## Quick Start

```bash
# 1. Install
git clone https://github.com/YOUR_USERNAME/claude-code-playwright-skill.git
cd claude-code-playwright-skill
npm install
npx playwright install chromium

# 2. Start server
npm start

# 3. Fetch a page
curl -s "http://localhost:3456/render?url=https://example.com&waitTime=3000"
```

## Add to Claude Code

### Global (all projects)
```bash
mkdir -p ~/.claude/skills/fetch-rendered
git clone https://github.com/YOUR_USERNAME/claude-code-playwright-skill.git ~/.claude/skills/fetch-rendered
cd ~/.claude/skills/fetch-rendered && npm install
```

### Project-specific
```bash
mkdir -p .claude/skills/fetch-rendered
git clone https://github.com/YOUR_USERNAME/claude-code-playwright-skill.git .claude/skills/fetch-rendered
cd .claude/skills/fetch-rendered && npm install
```

Then start the server: `npm start`

## Usage

```
GET http://localhost:3456/render?url=<URL>&waitTime=3000
```

| Parameter | Description | Default |
|-----------|-------------|---------|
| url | Page to render | required |
| waitTime | Wait after load (ms) | 3000 |
| waitFor | CSS selector to wait for | - |
| timeout | Page timeout (ms) | 30000 |

## Commands

```bash
npm start      # Start server (port 3456)
npm run stop   # Stop server
npm run restart # Restart server
```

## Troubleshooting

**Port in use:**
```bash
# macOS
lsof -ti:3456 | xargs kill -9
# Linux
fuser -k 3456/tcp
```

**Browser error:** `npx playwright install chromium`

---

For technical details, see [SKILL.md](./SKILL.md)
