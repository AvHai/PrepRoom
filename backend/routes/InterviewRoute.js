import express from "express";
import {
  createInterview,
  showAllInterview,
} from "../controllers/Interviewcontrollers.js";

const InterviewRoute = express.Router();

InterviewRoute.post("/create", createInterview);
InterviewRoute.get("/", showAllInterview);

export default InterviewRoute;
