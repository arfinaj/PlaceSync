import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/applications/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch applicants");
          return;
        }

        setApplications(data.applications);
      } catch (error) {
        console.error("Fetch applicants error:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1220] p-10 text-white">
        Loading applicants...
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
    <div className="min-h-screen bg-[#0B1220] px-8 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-4xl font-bold">
            Applicants
          </h1>

          <p className="mt-2 text-gray-400">
            Review students who applied for this job.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {applications.length} applicant
            {applications.length !== 1 ? "s" : ""}
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center">
            <p className="text-gray-400">
              No applications received yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {applications.map((application) => {
              const applicant = application.applicantDetails;

              return (
                <div
                  key={application._id}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {applicant.name}
                      </h2>

                      <p className="mt-1 text-blue-400">
                        {applicant.email}
                      </p>
                    </div>

                    <span className="h-fit rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        College
                      </p>
                      <p className="mt-1">
                        {applicant.college}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Roll Number
                      </p>
                      <p className="mt-1">
                        {applicant.rollNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Branch
                      </p>
                      <p className="mt-1">
                        {applicant.branch}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        CGPA
                      </p>
                      <p className="mt-1">
                        {applicant.cgpa}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Graduation Year
                      </p>
                      <p className="mt-1">
                        {applicant.graduationYear}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Phone
                      </p>
                      <p className="mt-1">
                        {applicant.phone}
                      </p>
                    </div>

                    <div className="lg:col-span-2">
                      <p className="text-sm text-gray-500">
                        Skills
                      </p>
                      <p className="mt-1">
                        {applicant.skills?.join(", ") || "None listed"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    {applicant.resume && (
                      <a
                        href={applicant.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-700"
                      >
                        View Resume
                      </a>
                    )}

                    {applicant.github && (
                      <a
                        href={applicant.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-600 px-5 py-2 font-medium hover:bg-slate-800"
                      >
                        GitHub
                      </a>
                    )}

                    {applicant.linkedin && (
                      <a
                        href={applicant.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-600 px-5 py-2 font-medium hover:bg-slate-800"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;