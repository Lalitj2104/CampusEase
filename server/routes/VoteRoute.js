import express from "express";
import { removeVote, upvoteComplaint } from "../controllers/VotesController.js";




const VoteRoute = express.Router();

VoteRoute.post("/upvote",upvoteComplaint);
VoteRoute.post("/remove",removeVote);

export default VoteRoute;