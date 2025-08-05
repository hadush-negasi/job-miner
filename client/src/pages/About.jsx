const About = () => {
  return (
    <section className="max-w-3xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-bold mb-4">About Job Miner</h2>
      <p className="text-gray-700 mb-3">
        Job Miner is a modern full-stack web app that scrapes real-time job listings from RemoteOK.
        It's built with:
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>React + TailwindCSS frontend</li>
        <li>Node.js + Express backend</li>
        <li>Cheerio / Puppeteer for scraping</li>
        <li>Firebase (planned) for authentication and saved jobs</li>
      </ul>
      <p className="text-gray-700 mt-4">
        Created by Hadush as a practical, real-world portfolio project.
      </p>
    </section>
  );
};

export default About;
