import express from 'express';
import { addResponse, getResponsesByComplaint } from '../controllers/ResponseController.js';




const ResponseRoute = express.Router();

ResponseRoute.post("/add",addResponse);
ResponseRoute.get("/:complaintId",getResponsesByComplaint);

export default ResponseRoute;