import express from "express";
import {
  createInterview,
  showAllInterview,
  getInterviewById,
  deleteInterview,
} from "../controllers/Interviewcontrollers.js";

const InterviewRoute = express.Router();

InterviewRoute.post("/create", createInterview);
InterviewRoute.get("/", showAllInterview);
InterviewRoute.get("/:id", getInterviewById)
InterviewRoute.delete("/:id", deleteInterview);

export default InterviewRoute;
