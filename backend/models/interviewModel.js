import mongoose from "mongoose";

const Schema = mongoose.Schema;

const interviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    companyId: {
      type: String, 
      required: true,
    },
    roleId: {
      type: String, 
      required: true,
    },
    interviewDate: {
      type: Date,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    tags: [
      {
        type: String, 
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;