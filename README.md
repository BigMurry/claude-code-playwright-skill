# Claude Code Playwright Skill

Fetch JavaScript-rendered web pages using headless Playwright. Use when standard WebFetch can't get content from SPAs, React/Vue pages, or client-side rendered sites.

## Install

```bash
npx skills add BigMurry/claude-code-playwright-skill
```

Dependencies are automatically installed on first use.

## Usage

```
/fetch-rendered https://example.com
```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| url | Page to render | required |
| waitTime | Wait after load (ms) | 3000 |
| waitFor | CSS selector to wait for | - |
| timeout | Page timeout (ms) | 30000 |

## Manual Setup

If automatic installation fails:

```bash
cd ~/.claude/skills/fetch-rendered
npm install
npx playwright install chromium
```

## Troubleshooting

**Port in use:**
```bash
lsof -ti:3456 | xargs kill -9   # macOS
fuser -k 3456/tcp               # Linux
```

**Browser error:**
```bash
npx playwright install chromium
```

## License

MIT
