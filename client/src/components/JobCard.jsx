const JobCard = ({ job }) => {
  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified';
    return salary;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    return new Date(dateString).toLocaleDateString();
  };

  // Function to safely render HTML content
  const createDescription = (htmlContent) => {
    if (!htmlContent) return null;
    return { __html: htmlContent };
  };

  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{job.title}</h3>
      <p className="text-gray-800 font-medium mb-3">{job.company}</p>

      {job.description && (
        <div 
          className="text-gray-600 text-sm mb-4 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={createDescription(job.description)}
        />
      )}

      <div className="space-y-2 text-sm text-gray-600">
        {job.locations && (
          <p className="flex items-center">
            <span className="w-5 h-5">📍</span>
            <span className="ml-2">{Array.isArray(job.locations) ? job.locations.join(', ') : job.locations}</span>
          </p>
        )}
        
        {job.salary && (
          <p className="flex items-center">
            <span className="w-5 h-5">💰</span>
            <span className="ml-2">{formatSalary(job.salary)}</span>
          </p>
        )}
        
        {job.date && (
          <p className="flex items-center">
            <span className="w-5 h-5">📅</span>
            <span className="ml-2">Posted: {formatDate(job.date)}</span>
          </p>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {job.location}
        </span>
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;