import express from "express";
import {
  createInterview,
  showAllInterview,
  getInterviewById,
} from "../controllers/Interviewcontrollers.js";

const InterviewRoute = express.Router();

InterviewRoute.post("/create", createInterview);
InterviewRoute.get("/", showAllInterview);
InterviewRoute.get("/:id", getInterviewById)

export default InterviewRoute;
