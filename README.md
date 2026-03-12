# Fetch Rendered Page

Claude Code skill for fetching JavaScript-rendered web pages. Use when standard WebFetch can't get content from SPAs.

## Install

### Option 1: npx skills add (Recommended)

```bash
npx skills add YOUR_USERNAME/claude-code-playwright-skill
```

Then install dependencies:
```bash
cd ~/.claude/skills/fetch-rendered
npm install
npx playwright install chromium
```

### Option 2: Git Clone

```bash
git clone https://github.com/YOUR_USERNAME/claude-code-playwright-skill.git ~/.claude/skills/fetch-rendered
cd ~/.claude/skills/fetch-rendered
npm install
npx playwright install chromium
```

### Option 3: Claude Code Plugin (Coming Soon)

```
/plugin marketplace add YOUR_USERNAME/claude-code-playwright-skill
```

## Usage

```
/fetch-rendered https://example.com
```

Or manually:
```bash
npm start
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

For details, see [skills/fetch-rendered/SKILL.md](./skills/fetch-rendered/SKILL.md)
