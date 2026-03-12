const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');

const app = express();
const PORT = process.env.PORT || 3456;

app.use(cors());
app.use(express.json());

let browser = null;

// Initialize browser
async function initBrowser() {
  if (!browser) {
    console.log('Launching Chromium browser...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('Browser launched successfully');
  }
  return browser;
}

// Cleanup on shutdown
async function cleanup() {
  console.log('Shutting down...');
  if (browser) {
    await browser.close();
    browser = null;
  }
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await initBrowser();
    res.json({ status: 'ok', browser: browser ? 'running' : 'stopped' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Main render endpoint
app.get('/render', async (req, res) => {
  const { url, waitFor, waitTime, timeout } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let playwrightBrowser = null;

  try {
    playwrightBrowser = await initBrowser();
    const context = await playwrightBrowser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();

    // Set timeout
    const pageTimeout = parseInt(timeout) || 30000;

    console.log(`Rendering: ${url}`);

    // Navigate to the page
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: pageTimeout });

    // Wait for specific selector if provided
    if (waitFor) {
      await page.waitForSelector(waitFor, { timeout: pageTimeout });
    }

    // Wait for additional time if specified (for JS to render)
    const waitTimeMs = parseInt(waitTime) || 3000;
    if (waitTimeMs > 0) {
      await page.waitForTimeout(waitTimeMs);
    }

    // Get the rendered HTML
    const html = await page.content();

    // Extract page title
    const title = await page.title();

    // Get text content (for easier parsing)
    const textContent = await page.evaluate(() => document.body.innerText);

    await context.close();

    console.log(`Successfully rendered: ${url}`);

    res.json({
      success: true,
      url,
      title,
      html,
      textContent: textContent.substring(0, 50000) // Limit text content
    });

  } catch (error) {
    console.error(`Error rendering ${url}:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      url
    });
  }
});

const http = require('http');

// Check if server is already running
function isServerRunning(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/health`, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Check and start server
async function checkAndStart() {
  const running = await isServerRunning(PORT);
  if (running) {
    console.log(`Server already running on port ${PORT}`);
    return;
  }

  const server = app.listen(PORT, () => {
    console.log(`Playwright render server running on http://localhost:${PORT}`);
    console.log(`Endpoints:`);
    console.log(`  GET /health - Health check`);
    console.log(`  GET /render?url=<url>&waitTime=<ms>&timeout=<ms> - Render page`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Kill existing process:`);
      console.error(`  # macOS: lsof -ti:${PORT} | xargs kill -9`);
      console.error(`  # Linux: fuser -k ${PORT}/tcp`);
      console.error(`  # Windows (PowerShell): Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force`);
    } else {
      console.error('Server error:', err);
    }
  });
}

// Start the server
checkAndStart();
