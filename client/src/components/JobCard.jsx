const JobCard = ({ job }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
      <p className="text-gray-700">{job.company}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {job.tags?.map((tag, idx) => (
          <span key={idx} className="bg-gray-200 text-sm px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={job.link}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 text-blue-500 underline"
      >
        View Job
      </a>
    </div>
  );
};

export default JobCard;
