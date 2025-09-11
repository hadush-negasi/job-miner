import axios from 'axios';

export async function getJobsFromCareerjet(keyword, location = '', userIp, page = 1) {
  // Your affiliate ID from the API URL they provided
  const affiliateId = process.env.API_KEY;
  
  // API endpoint
  const apiUrl = process.env.API_URL;
  
  // Parameters for the API request
  const params = {
    aff_id: affiliateId,
    user_ip: userIp, // Important: Use a real IP address here
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    locale_code: 'en_US',
    location: location,
    keywords: keyword,
    page: page,
    sort: 'title', // Sort by most recent
    pagesize: 20  // Number of results per page
  };

  try {
    //console.log(`Fetching jobs from Careerjet for: ${keyword}`);
    
    const response = await axios.get(apiUrl, { params });
    const data = response.data;
    //console.log(data);

    // Check if the request was successful
    if ((data.type === 'JOBS' || data.type === 'OK') && data.hits > 0) {
      const jobs = data.jobs.map(job => {
        let salary = 'Not specified';

        if (job.salary) {
          salary = job.salary; // already formatted by API
        } else if (job.salary_min && job.salary_max) {
          salary = `$${job.salary_min} - ${job.salary_max} ${job.salary_currency_code || ''}`.trim();
        } else if (job.salary_min) {
          salary = `$${job.salary_min} ${job.salary_currency_code || ''}`.trim();
        } else if (job.salary_max) {
          salary = `Up to $${job.salary_max} ${job.salary_currency_code || ''}`.trim();
        }

        return {
          title: job.title,
          company: job.company,
          link: job.url,
          datePosted: job.date,
          location: job.locations,
          salary,
          jobType: job.contract || 'Not specified',
          description: job.description,
          source: 'Careerjet'
        };
      });
      //console.log(jobs);
      return{
          jobs,
          hits: response.data.hits || 0,
          page: page,
          totalPages: Math.ceil(response.data.hits / 20)
        };
    } else {
      console.log('No jobs found or API error:');
      return [];
    }
  } catch (error) {
    console.error('Error fetching from Careerjet API:', error.message);
    throw new Error('Failed to fetch jobs from Careerjet');
  }
}