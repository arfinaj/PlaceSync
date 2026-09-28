import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  applyForJob,
  getJobApplications, 
  getMyApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Student"),
  applyForJob
);

router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("Recruiter"),
  getJobApplications
);

router.get(
  "/my-applications",
  authMiddleware,
  roleMiddleware("Student"),
  getMyApplications
);

export default router;