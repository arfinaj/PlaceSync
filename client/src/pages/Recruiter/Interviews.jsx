import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Interviews() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);

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
          console.error(data.message);
          return;
        }

        setJobs(data.jobs);

        // Automatically select the first job
        if (data.jobs.length > 0) {
          setSelectedJob(data.jobs[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!selectedJob) {
        setApplications([]);
        return;
      }

      try {
        setLoadingApplications(true);

        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/applications/job/${selectedJob}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setApplications(data.applications);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoadingApplications(false);
      }
    };

    fetchApplications();
  }, [selectedJob]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

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

          <button
            onClick={() => navigate("/recruiter/my-jobs")}
            className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            My Jobs
          </button>

          <button
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left"
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

      {/* Main */}
      <main className="ml-64 p-8">

        {/* Header */}
        <header className="mb-10">

          <p className="text-sm text-slate-500">
            Recruiter Dashboard
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Interviews
          </h2>

          <p className="mt-2 text-slate-400">
            Review applicants and schedule interviews with candidates.
          </p>

        </header>

        {/* Job selector */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-xl font-semibold">
                Candidates
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Select a job to view its applicants.
              </p>
            </div>

            <div>
              {loadingJobs ? (
                <p className="text-sm text-slate-500">
                  Loading jobs...
                </p>
              ) : (
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  {jobs.length === 0 ? (
                    <option value="">
                      No jobs available
                    </option>
                  ) : (
                    jobs.map((job) => (
                      <option key={job._id} value={job._id}>
                        {job.title} — {job.company}
                      </option>
                    ))
                  )}
                </select>
              )}
            </div>

          </div>

          {/* Applicants */}
          <div className="mt-6">

            {loadingApplications ? (
              <div className="rounded-xl border border-slate-800 p-8 text-center text-slate-500">
                Loading applicants...
              </div>
            ) : applications.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">
                <p className="text-lg font-medium">
                  No applicants yet
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Applicants for this job will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">

                {applications.map((application) => (

                  <div
                    key={application._id}
                    className="rounded-xl border border-slate-800 p-5 hover:bg-slate-800/40"
                  >

                    <div className="flex items-start justify-between gap-6">

                      {/* Candidate */}
                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 font-semibold text-blue-400">
                          {application.applicantDetails?.name
                            ?.charAt(0)
                            .toUpperCase() || "?"}
                        </div>

                        <div>

                          <h4 className="text-lg font-semibold">
                            {application.applicantDetails?.name}
                          </h4>

                          <p className="text-sm text-slate-500">
                            {application.applicantDetails?.email}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">

                            <span className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
                              {application.applicantDetails?.branch}
                            </span>

                            <span className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
                              CGPA{" "}
                              {application.applicantDetails?.cgpa}
                            </span>

                            <span className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
                              {application.applicantDetails?.college}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* Status + action */}
                      <div className="flex flex-col items-end gap-3">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            application.status === "Interview"
                              ? "bg-purple-500/10 text-purple-400"
                              : application.status === "Shortlisted"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}
                        >
                          {application.status}
                        </span>

                        <button
  onClick={() =>
    navigate(
      `/recruiter/interviews/schedule/${selectedJob}/${application.student._id}`
    )
  }
  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
>
  Schedule Interview
</button>

                      </div>

                    </div>

                    {/* Candidate details */}
                    <div className="mt-5 border-t border-slate-800 pt-4">

                      <div className="grid gap-4 text-sm md:grid-cols-4">

                        <div>
                          <p className="text-slate-500">
                            Phone
                          </p>

                          <p className="mt-1 text-slate-300">
                            {application.applicantDetails?.phone}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">
                            Roll Number
                          </p>

                          <p className="mt-1 text-slate-300">
                            {application.applicantDetails?.rollNumber}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">
                            Graduation
                          </p>

                          <p className="mt-1 text-slate-300">
                            {application.applicantDetails?.graduationYear}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">
                            Skills
                          </p>

                          <p className="mt-1 text-slate-300">
                            {application.applicantDetails?.skills?.join(
                              ", "
                            ) || "Not provided"}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Interviews;