import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import * as cheerio from 'cheerio';

puppeteer.use(StealthPlugin());

export async function scrapeRemoteOK(keyword) {
  console.log("launching browser");
  const browser = await puppeteer.launch({
    headless: "new",              // run headless in production
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"], // required on Render/Netlify etc.
  });
  console.log("browser launchec");
  const page = await browser.newPage();
  console.log("page created, going to url");
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0 Safari/537.36");

  const url = `https://remoteok.com/remote-${keyword}-jobs`;
  //console.log("Fetching:", url);
  
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  console.log("page loaded");
  await page.screenshot({ path: "debug.png", fullPage: true });
  try {
    await page.waitForSelector("#jobsboard tr.job", { timeout: 10000 }); // shorter timeout
    console.log("Selector found!");
  } catch (err) {
    console.warn("Selector not found, continuing anyway...");
  }
  
  //await page.waitForFunction(() => 
  //  document.querySelectorAll("#jobsboard tr.job").length > 0
  //);
  // extra small delay to let JS populate rows
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const content = await page.content();
  console.log(content);
  const $ = cheerio.load(content);

  const jobs = [];
  $("#jobsboard tr.job").each((_, el) => {
    const title = $(el).find(".company_and_position [itemprop=title]").text().trim();
    const company = $(el).find(".company_and_position [itemprop=name]").text().trim();
    const link = "https://remoteok.com" + ($(el).attr("data-href") || "");
    const datePosted = $(el).find("time").attr("datetime") || "N/A";
    const location = $(el).find(".location").text().trim();
    const salary = $(el).find(".salary").text().trim();
    const jobType = $(el).find('.tags h3:contains("full-time"), .tags h3:contains("contract")').text().trim();

    if (title && company) {
      jobs.push({ title, company, link, datePosted, location, salary, jobType });
    }

  });

  // Explicitly close the page
  if (page) await page.close();

  await browser.close();
  return jobs;
}
