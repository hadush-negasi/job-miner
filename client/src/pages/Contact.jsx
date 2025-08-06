import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-white shadow-md rounded-lg px-8 py-10"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Contact Us</h2>
        <form
          action="https://formsubmit.co/hadush7512@gmail.com" // 🔁 Replace with your real FormSubmit email
          method="POST"
          className="space-y-4"
        >
          {/* Optional: Prevent spam */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="http://localhost:3000/thank-you" /> {/* Optional redirect */}
          
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default Contact;
