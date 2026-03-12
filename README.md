# Fetch Rendered Page

Claude Code skill for fetching JavaScript-rendered web pages. Use when standard WebFetch can't get content from SPAs.

## Quick Install

### Claude Code

```bash
# Clone to your skills folder
git clone https://github.com/YOUR_USERNAME/claude-code-playwright-skill.git ~/.claude/skills/fetch-rendered

# Install dependencies
cd ~/.claude/skills/fetch-rendered
npm install
npx playwright install chromium
```

Then start the server: `npm start`

### Other Agents (Codex, Gemini CLI, OpenClaude, etc.)

This skill uses a simple HTTP server pattern - it should work with any agent that can run bash commands and make HTTP requests.

```bash
# Clone anywhere
git clone https://github.com/YOUR_USERNAME/claude-code-playwright-skill.git

# Install
cd claude-code-playwright-skill
npm install
npx playwright install chromium

# Start server
npm start

# Use via curl
curl -s "http://localhost:3456/render?url=https://example.com&waitTime=3000"
```

## Usage

```
/fetch-rendered https://example.com
```

Or manually:
```bash
curl -s "http://localhost:3456/render?url=<URL>&waitTime=3000"
```

| Parameter | Description | Default |
|-----------|-------------|---------|
| url | Page to render | required |
| waitTime | Wait after load (ms) | 3000 |
| waitFor | CSS selector | - |
| timeout | Page timeout (ms) | 30000 |

## Commands

```bash
npm start      # Start server (port 3456)
npm run stop   # Stop server
npm run restart
```

## Troubleshooting

**Port in use:**
```bash
lsof -ti:3456 | xargs kill -9   # macOS
fuser -k 3456/tcp               # Linux
```

**Browser error:** `npx playwright install chromium`

---

For details, see [SKILL.md](./SKILL.md)
