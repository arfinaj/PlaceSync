import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    })
      .populate(
        "job",
        "company title location jobType salary deadline status"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Only the recruiter who created the job can view its applicants
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to view these applications",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const { jobId, applicantDetails } = req.body;

    // 1. Validate basic input
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
      });
    }

    if (!applicantDetails) {
      return res.status(400).json({
        message: "Applicant details are required",
      });
    }

    // 2. Validate applicant details
    const {
      name,
      email,
      phone,
      college,
      rollNumber,
      branch,
      cgpa,
      graduationYear,
      resume,
      skills,
      github,
      linkedin,
    } = applicantDetails;

    if (
      !name ||
      !email ||
      !phone ||
      !college ||
      !rollNumber ||
      !branch ||
      cgpa === undefined ||
      !graduationYear ||
      !resume
    ) {
      return res.status(400).json({
        message: "Please fill all required applicant details",
      });
    }

    // 3. Find the job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // 4. Check whether job is open
    if (job.status !== "Open") {
      return res.status(400).json({
        message: "This job is no longer accepting applications",
      });
    }

    // 5. Check deadline
    if (new Date() > new Date(job.deadline)) {
      return res.status(400).json({
        message: "Application deadline has passed",
      });
    }

    // 6. Check CGPA eligibility
    if (cgpa < job.eligibility.minCGPA) {
      return res.status(400).json({
        message: `Minimum CGPA required is ${job.eligibility.minCGPA}`,
      });
    }

    // 7. Check branch eligibility
    if (!job.eligibility.branches.includes(branch)) {
      return res.status(400).json({
        message: "Your branch is not eligible for this job",
      });
    }

    // 8. Prevent duplicate applications
    const existingApplication = await Application.findOne({
      student: req.user.id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    // 9. Create application
    const application = await Application.create({
      student: req.user.id,
      job: jobId,
      applicantDetails: {
        name,
        email,
        phone,
        college,
        rollNumber,
        branch,
        cgpa,
        graduationYear,
        resume,
        skills: skills || [],
        github,
        linkedin,
      },
    });

    // 10. Return response
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};