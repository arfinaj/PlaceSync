import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ScheduleInterview() {
  const { jobId, studentId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [student, setStudent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    mode: "Online",
    meetingLink: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Get job
        const jobResponse = await fetch(
          `http://localhost:5000/api/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jobData = await jobResponse.json();

        if (!jobResponse.ok) {
          throw new Error(jobData.message || "Failed to fetch job");
        }

        setJob(jobData.job);

        // Get applicants for this job
        const applicantsResponse = await fetch(
          `http://localhost:5000/api/applications/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const applicantsData = await applicantsResponse.json();

        if (!applicantsResponse.ok) {
          throw new Error(
            applicantsData.message || "Failed to fetch applicants"
          );
        }

        const selectedApplication = applicantsData.applications.find(
          (application) =>
            application.student?._id === studentId
        );

        if (!selectedApplication) {
          throw new Error("Student application not found");
        }

        setStudent(selectedApplication);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [jobId, studentId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/interviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId,
            studentId,
            title: formData.title,
            date: formData.date,
            mode: formData.mode,
            meetingLink: formData.meetingLink,
            notes: formData.notes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to schedule interview");
        return;
      }

      alert("Interview scheduled successfully!");

      navigate("/recruiter/interviews");
    } catch (error) {
      console.error("Schedule interview error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-white">
        Loading...
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-white">
        <p className="text-red-400">{error}</p>
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

          <button
            onClick={() => navigate("/recruiter/my-jobs")}
            className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            My Jobs
          </button>

          <button
            onClick={() => navigate("/recruiter/interviews")}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left"
          >
            Interviews
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
            Profile
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 p-8">
        <button
          onClick={() => navigate("/recruiter/interviews")}
          className="mb-6 text-sm text-slate-400 hover:text-white"
        >
          ← Back to Interviews
        </button>

        <div className="mb-8">
          <p className="text-sm text-slate-500">
            Interview Management
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Schedule Interview
          </h2>

          <p className="mt-2 text-slate-400">
            Schedule an interview with the selected candidate.
          </p>
        </div>

        {/* Candidate + Job */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Candidate
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {student?.applicantDetails?.name}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {student?.applicantDetails?.email}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              {student?.applicantDetails?.branch} •{" "}
              {student?.applicantDetails?.cgpa} CGPA
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Job
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {job?.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {job?.company}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              {job?.location} • {job?.jobType}
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-8"
        >
          <h3 className="text-xl font-semibold">
            Interview Details
          </h3>

          <div className="mt-6 space-y-6">

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Interview Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Technical Interview"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Date & Time
              </label>

              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Mode */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Interview Mode
              </label>

              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {/* Meeting Link */}
            {formData.mode === "Online" && (
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Meeting Link
                </label>

                <input
                  type="url"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleChange}
                  placeholder="https://meet.google.com/..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Interview instructions or preparation details..."
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Scheduling..."
                : "Schedule Interview"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ScheduleInterview;