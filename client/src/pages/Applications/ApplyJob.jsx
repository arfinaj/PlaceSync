import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    rollNumber: "",
    branch: "",
    cgpa: "",
    graduationYear: "",
    resume: "",
    skills: "",
    github: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId,

          applicantDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            rollNumber: formData.rollNumber,
            branch: formData.branch,
            cgpa: Number(formData.cgpa),
            graduationYear: Number(formData.graduationYear),
            resume: formData.resume,

            skills: formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),

            github: formData.github,
            linkedin: formData.linkedin,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Application failed");
      return;
    }

    console.log("Application submitted:", data);

    alert("Application submitted successfully!");

    navigate("/jobs");
  } catch (error) {
    console.error("Application error:", error);
    setError("Something went wrong. Please try again.");
  }
};

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
          setError(data.message || "Failed to load job");
          return;
        }

        setJob(data.job);
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1220] p-10 text-white">
        Loading job...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1220] p-10 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Selected Job */}

        <div className="mb-8">
          <p className="text-blue-400">
            {job.company}
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Apply for {job.title}
          </h1>

          <p className="mt-3 text-gray-400">
            {job.location} • {job.jobType}
          </p>

          <p className="mt-2 text-gray-400">
            Minimum CGPA: {job.eligibility.minCGPA}
          </p>

          <p className="mt-2 text-gray-400">
            Eligible branches:{" "}
            {job.eligibility.branches.join(", ")}
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-700 bg-slate-900 p-8"
        >
          <h2 className="text-2xl font-semibold">
            Your Details
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
            />

            <input
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
            />

            <input
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
            />

            <input
              name="branch"
              placeholder="Branch (CSE, ECE, etc.)"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
            />

            <input
              name="cgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="CGPA"
              value={formData.cgpa}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
            />

            <input
              name="graduationYear"
              type="number"
              placeholder="Graduation Year"
              value={formData.graduationYear}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
            />

          </div>

          <input
            name="resume"
            placeholder="Resume URL"
            value={formData.resume}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
          />

          <input
            name="skills"
            placeholder="Skills (React, Node.js, MongoDB)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
          />

          <input
            name="github"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
          />

          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
          >
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}

export default ApplyJob;