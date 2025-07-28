import express from 'express';
import { createComplaint, deleteComplaint, getAllComplaints, getComplaintById, getMyComplaints, markComplaintResolved, updateComplaint } from '../controllers/ComplaintController.js';

const ComplaintRoute = express.Router();

ComplaintRoute.post("/create",createComplaint);
ComplaintRoute.get("/all",getAllComplaints);
ComplaintRoute.get("/:id",getComplaintById);
ComplaintRoute.get("/my",getMyComplaints);
ComplaintRoute.put("/update/:id",updateComplaint);
ComplaintRoute.delete("/delete/:id",deleteComplaint);
ComplaintRoute.put("/status/:id",markComplaintResolved);


export default ComplaintRoute;