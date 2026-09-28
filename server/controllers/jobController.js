import Job from "../models/Job.js";
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId)
      .populate("recruiter", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const createJob = async (req, res) => {
  try {
    
    const {
      company,
      title,
      description,
      location,
      jobType,
      salary,
      minCGPA,
      branches,
      deadline,
    } = req.body;

    if (
      !company ||
      !title ||
      !description ||
      !location ||
      !jobType ||
      !minCGPA ||
      !branches ||
      !deadline
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const job = await Job.create({
      recruiter: req.user.id,
      company,
      title,
      description,
      location,
      jobType,
      salary,
      eligibility: {
        minCGPA,
        branches,
      },
      deadline,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "Open" })
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const {
      company,
      title,
      description,
      location,
      jobType,
      salary,
      minCGPA,
      branches,
      deadline,
      status,
    } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Only the recruiter who created the job can edit it
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to edit this job",
      });
    }

    job.company = company;
    job.title = title;
    job.description = description;
    job.location = location;
    job.jobType = jobType;
    job.salary = salary;

    job.eligibility = {
      minCGPA,
      branches,
    };

    job.deadline = deadline;

    if (status) {
      job.status = status;
    }

    const updatedJob = await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};