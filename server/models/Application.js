import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicantDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      college: {
        type: String,
        required: true,
        trim: true,
      },

      rollNumber: {
        type: String,
        required: true,
        trim: true,
      },

      branch: {
        type: String,
        required: true,
        trim: true,
      },

      cgpa: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },

      graduationYear: {
        type: Number,
        required: true,
      },

      resume: {
        type: String,
        required: true,
      },

      skills: {
        type: [String],
        default: [],
      },

      github: {
        type: String,
        trim: true,
      },

      linkedin: {
        type: String,
        trim: true,
      },
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Rejected",
        "Interview",
        "Selected",
      ],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;