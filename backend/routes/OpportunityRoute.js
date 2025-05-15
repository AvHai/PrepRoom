import express from "express";
import {
  createOpportunity,
  getOpportunities,
  // getOpportunityById,
  // updateOpportunity,
  // deleteOpportunity,
} from "../controllers/OpportunityController.js";

const OpportunityRoute = express.Router();

OpportunityRoute.post("/", createOpportunity);
OpportunityRoute.get("/", getOpportunities);
// OpportunityRoute.get("/:id", getOpportunityById);
// OpportunityRoute.put("/:id", updateOpportunity);
// OpportunityRoute.delete("/:id", deleteOpportunity);

export default OpportunityRoute
