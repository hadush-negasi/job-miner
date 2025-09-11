import { getJobsFromCareerjet } from "../scraper/careerjetApi.js";

export const getCareerjetJobs = async (req, res) => {
  try {
    const { keyword, location, page = 1 } = req.query;
    // Get the user's IP address properly
    const user_ip = req.ip || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
      '11.22.33.44'; // Fallback for development
    //console.log(user_ip);
    //console.log(page);
    
    if (!keyword && !location) {
      return res.status(400).json({ 
        error: 'At least one search parameter (keyword or location) is required' 
      });
    }

    const jobsData = await getJobsFromCareerjet(keyword, location, user_ip, parseInt(page));
    
    res.json(jobsData);
  } catch (error) {
    console.error('Careerjet controller error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch jobs',
      details: error.message 
    });
  }
};