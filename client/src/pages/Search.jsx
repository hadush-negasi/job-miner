import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";

const Search = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchParams, setSearchParams] = useState({ keyword: "", location: "" }); // <-- NEW

  const [filters, setFilters] = useState({
    sortBy: "date",
    salaryMin: "",
  });

  // --- Helper: Apply filters without changing allJobs
  const applyFilters = useCallback((jobs, currentFilters) => {
    let result = [...jobs];

    // Min salary filter
    if (currentFilters.salaryMin) {
      const minSalary = parseInt(currentFilters.salaryMin);
      result = result.filter((job) => {
        if (!job.salary) return false;
        const salaryNumbers = job.salary.match(/\d+/g);
        if (salaryNumbers && salaryNumbers.length > 0) {
          const salary = parseInt(salaryNumbers[0]);
          return salary >= minSalary;
        }
        return false;
      });
    }

    // Sorting
    switch (currentFilters.sortBy) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "salary":
        result.sort((a, b) => {
          const getSalaryValue = (job) => {
            if (!job.salary) return 0;
            const numbers = job.salary.match(/\d+/g);
            return numbers ? parseInt(numbers[0]) : 0;
          };
          return getSalaryValue(b) - getSalaryValue(a);
        });
        break;
      case "company":
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "date":
      default:
        break; // Keep API order
    }

    return result;
  }, []);

  // --- Fetch jobs only when searchParams or page changes
  useEffect(() => {
    const fetchJobs = async () => {
      if (!searchParams.keyword && !searchParams.location) return;

      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchParams.keyword) params.append("keyword", searchParams.keyword);
        if (searchParams.location) params.append("location", searchParams.location);
        params.append("page", currentPage.toString());

        const res = await axios.get(
          `${BASE_URL}/api/scrape/careerjet?${params}`
        );

        const rawJobs = res.data.jobs || [];
        setAllJobs(rawJobs); // Save untouched jobs
        setTotalHits(res.data.hits);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        alert(err.response?.data?.error || "Failed to fetch jobs.");
      }
      setLoading(false);
    };

    fetchJobs();
  }, [BASE_URL, searchParams, currentPage]); // 👈 depends only on submitted searchParams & page

  // --- Recompute filteredJobs whenever allJobs or filters change
  useEffect(() => {
    if (allJobs.length > 0) {
      setFilteredJobs(applyFilters(allJobs, filters));
    } else {
      setFilteredJobs([]);
    }
  }, [allJobs, filters, applyFilters]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim() || searchLocation.trim()) {
      setCurrentPage(1); // reset to first page
      setSearchParams({ keyword: searchKeyword.trim(), location: searchLocation.trim() }); // 👈 trigger fetch
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // triggers fetch
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // triggers filtering only
  };

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

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-lg shadow-sm mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title or Keywords
              </label>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="e.g., Data Scientist, React Developer"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="e.g., Remote, New York, USA"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full md:w-auto"
          >
            Search Jobs
          </button>
        </form>

        {/* Filters */}
        {allJobs.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleFilterChange({ ...filters, sortBy: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="date">Most Recent</option>
                  <option value="title">Job Title</option>
                  <option value="salary">Highest Salary</option>
                  <option value="company">Company Name</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Salary ($)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 50000"
                  value={filters.salaryMin}
                  onChange={(e) =>
                    handleFilterChange({ ...filters, salaryMin: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {/* Loading / No Results */}
        {loading && (
          <div className="flex justify-center items-center mt-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-blue-600 font-medium">Loading jobs...</span>
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (searchKeyword || searchLocation) && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            No jobs found. Try different keywords or location.
          </p>
        )}

        {!loading && filteredJobs.length === 0 && !searchKeyword && !searchLocation && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            Enter job keywords and/or location to start searching.
          </p>
        )}

        {/* Job Results */}
        {!loading && filteredJobs.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                Showing {filteredJobs.length} of {allJobs.length} jobs ({totalHits} total hits)
              </p>
              <p className="text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-6 mb-8"
            >
              {filteredJobs.map((job, idx) => (
                <JobCard key={`${job.id || idx}-${job.title}`} job={job} />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(
                    1,
                    Math.min(currentPage - 2, totalPages - 4)
                  ) + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 border rounded-md ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </motion.section>
    </div>
  );
};

export default Search;
