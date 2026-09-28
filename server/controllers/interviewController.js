import Interview from "../models/Interview.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

// Schedule an interview
export const scheduleInterview = async (req, res) => {
  try {
    const {
      jobId,
      studentId,
      title,
      date,
      mode,
      meetingLink,
      notes,
    } = req.body;

    // 1. Validate required fields
    if (!jobId || !studentId || !title || !date || !mode) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // 2. Find the job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // 3. Make sure recruiter owns this job
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to schedule interviews for this job",
      });
    }

    // 4. Make sure the student actually applied for this job
    const application = await Application.findOne({
      job: jobId,
      student: studentId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found for this student",
      });
    }

    // 5. Prevent scheduling another active interview
    const existingInterview = await Interview.findOne({
      job: jobId,
      student: studentId,
      status: "Scheduled",
    });

    if (existingInterview) {
      return res.status(400).json({
        message: "An interview is already scheduled for this candidate",
      });
    }

    // 6. Create interview
    const interview = await Interview.create({
      student: studentId,
      recruiter: req.user.id,
      job: jobId,
      company: job.company,
      title,
      date,
      mode,
      meetingLink,
      notes,
    });

    // 7. Update application status
    application.status = "Interview";
    await application.save();

    // 8. Return response
    return res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      interview,
    });

  } catch (error) {
    console.error("Schedule interview error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      student: req.user.id,
    })
      .populate("job", "title company location jobType")
      .populate("recruiter", "name email")
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    console.error("Get student interviews error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};