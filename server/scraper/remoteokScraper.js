import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapeRemoteOK = async (keyword = 'engineer') => {
  const url = `https://remoteok.com/remote-${keyword}-jobs`;

  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
  });

  const $ = cheerio.load(data);
  const jobs = [];

  $('tr.job').each((i, el) => {
    const title = $(el).find('.company_and_position [itemprop=title]').text().trim();
    const company = $(el).find('.company_and_position [itemprop=name]').text().trim();
    const tags = $(el).find('.tags h3').map((i, tag) => $(tag).text().trim()).get();
    const link = 'https://remoteok.com' + $(el).attr('data-href');

    if (title && company && link) {
      jobs.push({ title, company, tags, link });
    }
  });

  return jobs;
};
