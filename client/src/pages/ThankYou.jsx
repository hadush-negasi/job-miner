// src/pages/ThankYou.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-md max-w-lg w-full p-8 text-center"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Thank You!</h2>
        <p className="text-gray-700 mb-6">
          Your message has been received. I’ll get back to you as soon as possible.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </motion.section>
    </div>
  );
};

export default ThankYou;
