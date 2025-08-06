const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-blue-700">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>

      <div className="text-sm text-gray-500 mt-2">
        {job.location && <p><strong>📍 Location:</strong> {job.location}</p>}
        {job.salary && <p><strong>💰 Salary:</strong> {job.salary}</p>}
        {job.datePosted && <p><strong>📅 Posted:</strong> {new Date(job.datePosted).toDateString()}</p>}
        {job.jobType && <p><strong>🧪 Type:</strong> {job.jobType}</p>}
      </div>

      <a
        href={job.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-blue-600 font-medium hover:underline"
      >
        View Job →
      </a>
    </div>
  );
};

export default JobCard;