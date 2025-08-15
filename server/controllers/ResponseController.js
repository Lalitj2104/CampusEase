import ResponseModel from "../models/response.js";
import Complaint from "../models/Complaint.js";
import {Response} from "../utils/response.js";
import {message} from "../utils/message.js";

export const addResponse = async (req, res) => {
	try {
		const { complaintId, message: msg, status } = req.body;

		const complaint = await Complaint.findById(complaintId);
		if (!complaint) {
			return Response(res, 404, false, "Complaint not found.");
		}

		const response = await ResponseModel.create({
			complaint: complaintId,
			message: msg,
			status,
			responder: "Admin", // default responder
		});

		Response(res, 201, true, "Response added successfully", response);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getResponsesByComplaint = async (req, res) => {
	try {
		const { complaintId } = req.params;

		const responses = await ResponseModel.find({ complaint: complaintId }).sort("createdAt");

		Response(res, 200, true, "Responses fetched", responses);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
