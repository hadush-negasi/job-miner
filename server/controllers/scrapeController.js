import { scrapeRemoteOK } from '../scraper/remoteokScraper.js';

export const scrapeRemoteJobs = async (req, res) => {
  const { keyword } = req.query;
  //console.log(keyword);

  try {
    const jobs = await scrapeRemoteOK(keyword.toLowerCase());
    res.json(jobs);
    //console.log(jobs);
  } catch (err) {
    console.error('RemoteOK Scraping Error:', err.message);
    res.status(500).json({ message: 'Scraping failed', error: err.message });
  }
};
