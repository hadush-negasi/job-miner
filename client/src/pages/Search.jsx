import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import JobSearchForm from '../components/JobSearchForm';
import JobCard from '../components/JobCard';

const Search = () => {
  const location = useLocation();
  const { keyword } = queryString.parse(location.search);
  //console.log(keyword);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (kw) => {
    if(!kw) return;
    setLoading(true);
    setJobs([]); // clear old jobs before fetching
    try {
      const res = await axios.get(`http://localhost:5000/api/scrape/remoteok?keyword=${kw}`);      
      setJobs(res.data || []);
      //console.log(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (keyword) {
      fetchJobs(keyword);
    }
  }, [keyword]);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Search Remote Jobs</h2>
      <JobSearchForm onSearch={fetchJobs} />

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-blue-600">Scraping jobs...</span>
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Try searching for something like <b>React</b> or <b>Backend</b>.</p>
      )}

      {!loading && jobs.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {jobs.map((job, idx) => (
            <JobCard key={idx} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
