import { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { motion } from 'framer-motion';
import JobSearchForm from '../components/JobSearchForm';
import JobCard from '../components/JobCard';

const Search = () => {
  const location = useLocation();
  const { keyword } = queryString.parse(location.search);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(async (kw) => {
    if (!kw) return;
    setLoading(true);
    setJobs([]);
    try {
      const res = await axios.get(`${BASE_URL}/api/scrape/remoteok?keyword=${kw}`);
      setJobs(res.data || []);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
    setLoading(false);
  }, [BASE_URL]); // no dependencies or add needed ones

  useEffect(() => {
    if (keyword) fetchJobs(keyword);
  }, [keyword, fetchJobs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <motion.section
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <h2 className="text-4xl font-bold text-blue-700 mb-6 text-center md:text-left">
          Search Remote Jobs
        </h2>

        <JobSearchForm onSearch={fetchJobs} />

        {loading && (
          <div className="flex justify-center items-center mt-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-blue-600 font-medium">Scraping jobs...</span>
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            Try searching for something like <span className="font-semibold text-blue-600">React</span> or <span className="font-semibold text-blue-600">Backend</span>.
          </p>
        )}

        {!loading && jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6 mt-10"
          >
            {jobs.map((job, idx) => (
              <JobCard key={idx} job={job} />
            ))}
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default Search;
