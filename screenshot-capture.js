/**
 * Captures screenshots of each section of the portfolio page.
 * Run with: npx playwright install chromium && node screenshot-capture.js
 * Or: npx puppeteer screenshot-capture.js (if using puppeteer)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SECTIONS = [
  { id: 'hero', name: 'Hero' },
  { id: 'about', name: 'About' },
  { id: 'experience', name: 'Experience' },
  { id: 'skills', name: 'Skills' },
  { id: 'education', name: 'Education' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
  { id: 'footer', name: 'Footer' },
];

const OUTPUT_DIR = path.join(__dirname, 'screenshots');

async function capture() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto('http://localhost:2001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // Wait for preloader + initial animations

  for (const { id, name } of SECTIONS) {
    let selector;
    if (id === 'hero') {
      selector = '#hero';
    } else if (id === 'footer') {
      selector = 'footer';
    } else {
      selector = `#${id}`;
    }

    const element = await page.$(selector);
    if (element) {
      await element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      const box = await element.boundingBox();
      if (box) {
        await page.screenshot({
          path: path.join(OUTPUT_DIR, `${id}.png`),
          clip: box,
        });
        console.log(`Captured: ${name} (${id})`);
      }
    } else {
      console.log(`Element not found: ${selector}`);
    }
  }

  // Full page screenshot
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'full-page.png'),
    fullPage: true,
  });
  console.log('Captured: Full page');

  await browser.close();
  console.log('Done. Screenshots saved to', OUTPUT_DIR);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
