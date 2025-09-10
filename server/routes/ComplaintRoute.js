import express from 'express';
import { createComplaint, deleteComplaint, getAllComplaints, getComplaintById, getMyComplaints, markComplaintResolved, updateComplaint } from '../controllers/ComplaintController.js';
import { isAuthenticated } from './../middlewares/Auth.js';

const ComplaintRoute = express.Router();

ComplaintRoute.post("/create",isAuthenticated,createComplaint);
ComplaintRoute.get("/all",getAllComplaints);
ComplaintRoute.get("/my",getMyComplaints);
ComplaintRoute.get("/:id",getComplaintById);
ComplaintRoute.put("/update/:id",updateComplaint);
ComplaintRoute.delete("/delete/:id",deleteComplaint);
ComplaintRoute.put("/status/:id",markComplaintResolved);


export default ComplaintRoute;