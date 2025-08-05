import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import RemoteWorker from '../assets/remote-worker.svg';
const categories = [
  "Frontend",
  "Backend",
  "DevOps",
  "Full Stack",
  "React",
  "Python",
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto px-6 py-16 gap-12"
      >
        {/* Text content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
            Find Your Next Remote Tech Job
          </h1>
          <p className="text-gray-700 mb-8 text-lg max-w-md mx-auto md:mx-0">
            Get access to live job listings scraped in real-time from trusted platforms.
          </p>
          <NavLink
            to="/search"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Searching
          </NavLink>
        </div>

        {/* Illustration */}
        <div className="md:w-1/2 max-w-md mx-auto">
          <img
            src={RemoteWorker}
            alt="Remote worker illustration"
            className="w-full"
          />
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-12 bg-white shadow-sm"
      >
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-700">
          Explore Top Job Categories
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 px-6">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/search?keyword=${category.toLowerCase().replace(' ', '-')}`}
              className="bg-blue-50 border border-blue-200 text-blue-600 rounded-lg py-3 font-medium text-center hover:bg-blue-100 transition"
            >
              {category}
            </NavLink>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white py-16 max-w-6xl mx-auto px-6"
      >
        <div className="grid sm:grid-cols-3 gap-10 text-center text-gray-700">
          <div>
            <h3 className="text-blue-600 text-xl font-semibold mb-3">
              Live Scraping
            </h3>
            <p>Jobs fetched in real-time from trusted job boards.</p>
          </div>
          <div>
            <h3 className="text-blue-600 text-xl font-semibold mb-3">
              Tech Focused
            </h3>
            <p>Only remote tech jobs — curated just for you.</p>
          </div>
          <div>
            <h3 className="text-blue-600 text-xl font-semibold mb-3">
              Keyword Smart
            </h3>
            <p>Search using keywords, tags, or job titles.</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;