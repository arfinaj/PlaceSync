import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch jobs");
          return;
        }

        setJobs(data.jobs);
      } catch (error) {
        console.error("Fetch jobs error:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="p-8 text-white">Loading jobs...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B1220] px-8 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold">
          Available Jobs
        </h1>

        <p className="mt-2 text-gray-400">
          Explore placement opportunities and apply for jobs.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
            >
              <h2 className="text-xl font-bold">
                {job.title}
              </h2>

              <p className="mt-1 text-blue-400">
                {job.company}
              </p>

              <p className="mt-4 text-gray-400">
                {job.location}
              </p>

              <p className="mt-2 text-gray-400">
                {job.jobType}
              </p>

              <p className="mt-2 text-gray-400">
                Minimum CGPA: {job.eligibility.minCGPA}
              </p>

              <p className="mt-2 text-gray-400">
                Branches: {job.eligibility.branches.join(", ")}
              </p>

              <button
                onClick={() => navigate(`/apply/${job._id}`)}
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;