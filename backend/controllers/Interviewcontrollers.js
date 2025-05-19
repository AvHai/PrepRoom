import Interview from "../models/interviewModel.js"; 
import User from "../models/userModel.js"; 
import { handleError } from "../helpers/handleError.js";

export const createInterview = async (req, res,next) => {
  try {
    console.log(req.body);
    const {
      title,
      companyId,
      roleId,
      experience,
      difficultyLevel,
      tags,
      interviewDate,
      userId,
    } = req.body;

    if (!userId) {
      next ( handleError(400, "User ID is missing in the request."));
    }

    const user = await User.findById(userId);
    if (!user) {
      next (handleError(400, "User not found in DB."));
    }

    const newInterview = new Interview({
      title,
      companyId,
      roleId,
      interviewDate: new Date(interviewDate),
      experience,
      difficultyLevel,
      tags,
      author: userId,
    });

    const savedInterview = await newInterview.save();

    return res.status(201).json({
      message: "Interview created successfully",
      interview: savedInterview,
    });
  } catch (error) {
    console.error("Error in createInterview:", error);
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};

export const showAllInterview = async (req, res) => {
  try {
    const interviews = await Interview.find().populate("author", "name email");
    res.status(200).json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    const err = handleError(500, "Internal Server Error");
    res.status(err.statusCode).json({ message: err.message });
  }
};


export const getInterviewById = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id).populate('author', 'name email') ;

    if (!interview) {
      throw handleError(404, "Interview not found");
    }
    res.json(interview);
  } catch (err) {
    console.error(err);
    next(err); 
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Interview.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};