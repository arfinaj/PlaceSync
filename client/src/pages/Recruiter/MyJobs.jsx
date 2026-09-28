import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/jobs/my",
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-white">
        Loading your jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-900 p-6">

        <div className="mb-10">
          <h1 className="text-2xl font-bold">
            Place<span className="text-blue-500">Sync</span>
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Recruiter Portal
          </p>
        </div>

        <nav className="space-y-2">

          <button
            onClick={() => navigate("/recruiter/dashboard")}
            className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Dashboard
          </button>

          {/* Active */}
          <button
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left"
          >
            My Jobs
          </button>

          <button
            onClick={() => navigate("/recruiter/interviews")}
            className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Interviews
          </button>

          <button
            className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Profile
          </button>

        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">

        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-10">
            <p className="text-sm text-slate-500">
              Recruiter Portal
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              My Jobs
            </h1>

            <p className="mt-2 text-slate-400">
              Manage the jobs and placement opportunities you have posted.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {/* No jobs */}
          {jobs.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
              <h2 className="text-xl font-semibold">
                No jobs posted yet
              </h2>

              <p className="mt-2 text-slate-400">
                Your posted jobs will appear here.
              </p>
            </div>
          ) : (

            /* Jobs */
            <div className="grid gap-6 md:grid-cols-2">

              {jobs.map((job) => (

                <div
                  key={job._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >

                  {/* Job header */}
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h2 className="text-xl font-semibold">
                        {job.title}
                      </h2>

                      <p className="mt-1 text-blue-400">
                        {job.company}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        job.status === "Open"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {job.status}
                    </span>

                  </div>

                  {/* Job details */}
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

                    <div>
                      <p className="text-slate-500">
                        Location
                      </p>

                      <p className="mt-1">
                        {job.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        Job Type
                      </p>

                      <p className="mt-1">
                        {job.jobType}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        Minimum CGPA
                      </p>

                      <p className="mt-1">
                        {job.eligibility?.minCGPA}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        Deadline
                      </p>

                      <p className="mt-1">
                        {new Date(
                          job.deadline
                        ).toLocaleDateString()}
                      </p>
                    </div>

                  </div>

                  {/* Branches */}
                  <div className="mt-5">

                    <p className="text-sm text-slate-500">
                      Eligible Branches
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">

                      {job.eligibility?.branches?.map(
                        (branch) => (
                          <span
                            key={branch}
                            className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300"
                          >
                            {branch}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={() =>
                        navigate(
                          `/recruiter/jobs/${job._id}/applicants`
                        )
                      }
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium hover:bg-blue-700"
                    >
                      View Applicants
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/recruiter/jobs/${job._id}/edit`
                        )
                      }
                      className="rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
                    >
                      Edit
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default MyJobs;