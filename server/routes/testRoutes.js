import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { protectedTest } from "../controllers/testController.js";

const router = express.Router();

router.get(
  "/protected",
  authMiddleware,
  protectedTest
);

router.get(
  "/student",
  authMiddleware,
  roleMiddleware("Student"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Student!",
      user: req.user,
    });
  }
);

export default router;