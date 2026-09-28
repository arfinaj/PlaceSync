import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  scheduleInterview,
  getMyInterviews
} from "../controllers/interviewController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Recruiter"),
  scheduleInterview
);

router.get(
  "/my-interviews",
  authMiddleware,
  roleMiddleware("Student"),
  getMyInterviews
);

export default router;