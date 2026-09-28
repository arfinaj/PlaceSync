import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

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
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-white">
        Loading dashboard...
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
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left"
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
          onClick={()=> navigate("/recruiter/interviews")}
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


      {/* Main content */}

      <main className="ml-64 p-8">

        {/* Header */}

        <header className="mb-10 flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Recruiter Dashboard
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              Good morning
              {user ? `, ${user.name}` : ""} 👋
            </h2>

            <p className="mt-2 text-slate-400">
              Here's what's happening with your recruitment.
            </p>

          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold">
            {user?.name?.charAt(0).toUpperCase() || "?"}
          </div>

        </header>


        {/* Stats */}

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Active Jobs
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              {jobs.length}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Total Applicants
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              —
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Shortlisted
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              —
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Interviews
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              —
            </h3>
          </div>

        </section>


        {/* Recruitment Activity */}

        <section className="mt-8">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div>
              <h3 className="text-xl font-semibold">
                Recruitment Activity
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Manage applicants, interviews and hiring.
              </p>
            </div>


            <div className="mt-6 grid gap-5 md:grid-cols-3">

              {/* Applicants */}

              <div className="rounded-xl border border-slate-800 p-5">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  👥
                </div>

                <h4 className="mt-4 text-lg font-semibold">
                  Applicants
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Review students who have applied to your job postings.
                </p>

                {jobs.length > 0 ? (
                  <div className="mt-5 space-y-3">

                    {jobs.slice(0, 2).map((job) => (
                      <button
                        key={job._id}
                        onClick={() =>
                          navigate(
                            `/recruiter/jobs/${job._id}/applicants`
                          )
                        }
                        className="block w-full rounded-lg border border-slate-800 px-3 py-3 text-left hover:bg-slate-800"
                      >
                        <p className="text-sm font-medium text-white">
                          {job.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {job.company}
                        </p>

                        <p className="mt-2 text-xs text-blue-400">
                          View applicants →
                        </p>
                      </button>
                    ))}

                  </div>
                ) : (
                  <p className="mt-5 text-sm text-slate-500">
                    No jobs posted yet.
                  </p>
                )}

              </div>


              {/* Interviews */}

              <div className="rounded-xl border border-slate-800 p-5">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  📅
                </div>

                <h4 className="mt-4 text-lg font-semibold">
                  Interviews
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Schedule and manage interviews with shortlisted candidates.
                </p>

                <button
                  onClick={() =>
                    navigate("/recruiter/interviews")
                  }
                  className="mt-5 text-sm text-blue-400 hover:text-blue-300"
                >
                  View interviews →
                </button>

              </div>


              {/* Hiring */}

              <div className="rounded-xl border border-slate-800 p-5">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                  ✓
                </div>

                <h4 className="mt-4 text-lg font-semibold">
                  Hiring
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Track shortlisted, selected and rejected candidates.
                </p>

                <button
                  onClick={() =>
                    navigate("/recruiter/applicants")
                  }
                  className="mt-5 text-sm text-blue-400 hover:text-blue-300"
                >
                  Manage hiring →
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default RecruiterDashboard;