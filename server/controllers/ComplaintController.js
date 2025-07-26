import Complaint from "../models/complaintModel.js";
import Response from "../utils/response.js";
import message from "../utils/message.js";

export const createComplaint = async (req, res) => {
	try {
		const { title, description, category, location, image } = req.body;

		if (!title || !description || !category) {
			return Response(res, 400, false, "Title, Description, and Category are required");
		}
        let result;
		if (image) {
			result = await cloudinary.v2.uploader.upload(image, {
				folder: "blog",
			});
		}
		const complaint = await Complaint.create({
			title,
			description,
			category,
			location,
			image:{
                public_id: result ? result.public_id : null,
                url: result ? result.secure_url : null
            },
			createdBy: req.user._id,
		});

		Response(res, 201, true, message.complaintCreatedMessage, complaint);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllComplaints = async (req, res) => {
	try {
		const complaints = await Complaint.find()
			.populate("category", "name")
			.populate("createdBy", "firstName lastName")
			.sort("-createdAt");

		Response(res, 200, true, message.complaintsFetchedMessage, complaints);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getComplaintById = async (req, res) => {
	try {
		const complaint = await Complaint.findById(req.params.id)
			.populate("category", "name")
			.populate("createdBy", "firstName lastName");

		if (!complaint) {
			return Response(res, 404, false, message.complaintNotFoundMessage);
		}

		Response(res, 200, true, message.complaintFetchedMessage, complaint);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getMyComplaints = async (req, res) => {
	try {
		const complaints = await Complaint.find({ createdBy: req.user._id })
			.populate("category", "name")
			.sort("-createdAt");

		Response(res, 200, true, message.complaintsFetchedMessage, complaints);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const updateComplaint = async (req, res) => {
	try {
		const { id } = req.params;

		const complaint = await Complaint.findById(id);
		if (!complaint) {
			return Response(res, 404, false, message.complaintNotFoundMessage);
		}

		if (complaint.createdBy.toString() !== req.user._id.toString()) {
			return Response(res, 403, false, message.unauthorizedUserMessage);
		}

		const updatedComplaint = await Complaint.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		Response(res, 200, true, message.complaintUpdatedMessage, updatedComplaint);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const deleteComplaint = async (req, res) => {
	try {
		const { id } = req.params;

		const complaint = await Complaint.findById(id);
		if (!complaint) {
			return Response(res, 404, false, message.complaintNotFoundMessage);
		}

		if (complaint.createdBy.toString() !== req.user._id.toString()) {
			return Response(res, 403, false, message.unauthorizedUserMessage);
		}

		await complaint.deleteOne();

		Response(res, 200, true, message.complaintDeletedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const markComplaintResolved = async (req, res) => {
	try {
		const { id } = req.params;

		const complaint = await Complaint.findById(id);
		if (!complaint) {
			return Response(res, 404, false, message.complaintNotFoundMessage);
		}

		complaint.status = "resolved";
		await complaint.save();

		Response(res, 200, true, "Complaint marked as resolved");
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
