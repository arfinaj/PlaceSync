import { useEffect, useState } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";


function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
    const location = useLocation();

  
    const [successMessage,setSuccessMessage]=useState(location.state?.successMessage || "");

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    minCGPA: "",
    branches: "",
    deadline: "",
    status: "Open",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch job");
          return;
        }

        const job = data.job;

        setFormData({
          company: job.company || "",
          title: job.title || "",
          description: job.description || "",
          location: job.location || "",
          jobType: job.jobType || "Full-time",
          salary: job.salary || "",
          minCGPA: job.eligibility?.minCGPA || "",
          branches: job.eligibility?.branches?.join(", ") || "",
          deadline: job.deadline
            ? new Date(job.deadline).toISOString().split("T")[0]
            : "",
          status: job.status || "Open",
        });
      } catch (error) {
        console.error("Fetch job error:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            company: formData.company,
            title: formData.title,
            description: formData.description,
            location: formData.location,
            jobType: formData.jobType,
            salary: formData.salary,
            minCGPA: Number(formData.minCGPA),
            branches: formData.branches
              .split(",")
              .map((branch) => branch.trim())
              .filter(Boolean),
            deadline: formData.deadline,
            status: formData.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update job");
        return;
      }

      navigate("/recruiter/dashboard",{
        state:{
            successMessage: "Updated successfully",
        },
      });
      
    } catch (error) {
      console.error("Update job error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-white">
        Loading job...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10">
          <p className="text-sm text-slate-500">
            Recruiter Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Edit Job
          </h1>

          <p className="mt-2 text-slate-400">
            Update the details of your job posting.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="text-sm text-slate-400">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Job Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Job Type
              </label>

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Salary
              </label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 12 LPA"
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Minimum CGPA
              </label>

              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="minCGPA"
                value={formData.minCGPA}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Eligible Branches
              </label>

              <input
                type="text"
                name="branches"
                value={formData.branches}
                onChange={handleChange}
                placeholder="CSE, IT, ECE"
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Application Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

          </div>

          <div className="mt-6">
            <label className="text-sm text-slate-400">
              Job Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/recruiter/jobs")}
              className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJob;