import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export const scrapeIndeed = async (keyword, location) => {
  const query = `${keyword}+${location}`.replace(/\s+/g, '+');
  const url = `https://www.indeed.com/jobs?q=${query}&l=${location}`;

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36'
  );

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.screenshot({ path: 'indeed-page.png' }); // 👈 Optional, helpful
    // Wait for job cards
    await page.waitForSelector('.job_seen_beacon', { timeout: 20000 });

    const jobs = await page.evaluate(() => {
      const jobCards = document.querySelectorAll('.job_seen_beacon');
      const results = [];

      jobCards.forEach(card => {
        const title = card.querySelector('h2 span')?.innerText?.trim();
        const company = card.querySelector('.companyName')?.innerText?.trim();
        const location = card.querySelector('.companyLocation')?.innerText?.trim();
        const link = 'https://www.indeed.com' + card.querySelector('a')?.getAttribute('href');

        if (title && company && link) {
          results.push({ title, company, location, link });
        }
      });

      return results;
    });

    await browser.close();
    return jobs;
  } catch (error) {
    console.error('🛑 Puppeteer error:', error);
    await browser.close();
    throw error;
  }
};
