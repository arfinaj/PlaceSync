import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import { createJob, getJobs, getJobById, getRecruiterJobs, updateJob } from "../controllers/jobController.js";
  

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Recruiter"),
  createJob
);
router.get("/", getJobs);
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("Recruiter"),
  getRecruiterJobs
);
router.put(
  "/:jobId",
  authMiddleware,
  roleMiddleware("Recruiter"),
  updateJob
);
router.get("/:jobId", getJobById);



export default router;