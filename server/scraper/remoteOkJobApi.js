import axios from "axios";

export async function scrapeRemoteOK(keyword) {
  try {
    const { data } = await axios.get("https://remoteok.com/api");

    // RemoteOK API returns the first item as metadata, skip it
    const jobs = data
      .slice(1)
      .filter(
        (job) =>
          job.position?.toLowerCase().includes(keyword.toLowerCase()) ||
          job.company?.toLowerCase().includes(keyword.toLowerCase())
      )
      .map((job) => ({
        title: job.position || "N/A",
        company: job.company || "N/A",
        link: job.url || "",
        datePosted: job.date || "N/A",
        location: job.location || "Remote",
        salary: job.salary || "N/A",
        jobType: job.tags?.join(", ") || "N/A",
      }));

    return jobs;
  } catch (err) {
    console.error("RemoteOK API Error:", err.message);
    throw err;
  }
}
