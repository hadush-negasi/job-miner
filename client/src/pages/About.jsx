import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white shadow-md rounded-lg px-8 py-10"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">About Job Miner</h2>

        <p className="text-gray-700 mb-4 text-lg">
          <strong>Job Miner</strong> is a modern full-stack web application that scrapes live remote job listings from trusted sources like RemoteOK. The goal is to help tech professionals discover opportunities in real-time with intelligent keyword matching and category-based search.
        </p>

        <p className="text-gray-700 mb-6">
          The project was built using the following technologies:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>⚛️ React & Tailwind CSS for frontend UI</li>
          <li>🚀 Node.js & Express for backend API</li>
          <li>🕸️ Cheerio & Puppeteer for web scraping</li>
          <li>🔐 Firebase (planned) for authentication and saved jobs</li>
        </ul>

        <div className="text-gray-700 space-y-2 text-sm">
          <p><strong>👨‍💻 Developer:</strong> Hadush Negasi</p>
          <p><strong>📧 Email:</strong> <a href="mailto:hadush7512@gmail.com" className="text-blue-600 hover:underline">hadush7512@gmail.com</a></p>
          <p><strong>📱 Phone:</strong> <a href="tel:+251998317320" className="text-blue-600 hover:underline">+251 9983 17320</a></p>
          <p><strong>💼 GitHub:</strong> <a href="https://github.com/hadush-negasi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/hadush-negasi</a></p>
          <p><strong>🌐 Portfolio:</strong> <a href="https://hadushnegasi.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">hadushnegasi.netlify.app</a></p>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
