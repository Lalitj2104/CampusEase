import Vote from "../models/voteModel.js";
import Complaint from "../models/complaintModel.js";
import Response from "../utils/response.js";
import message from "../utils/message.js";

export const upvoteComplaint = async (req, res) => {
	try {
		const { complaintId } = req.body;
		const userId = req.user._id;

		const existing = await Vote.findOne({ complaint: complaintId, user: userId });
		if (existing) {
			return Response(res, 400, false, "You already upvoted this complaint");
		}

		const vote = await Vote.create({ user: userId, complaint: complaintId });
		await Complaint.findByIdAndUpdate(complaintId, { $push: { upvotes: userId } });

		Response(res, 201, true, "Complaint upvoted", vote);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const removeVote = async (req, res) => {
	try {
		const { complaintId } = req.body;
		const userId = req.user._id;

		const vote = await Vote.findOneAndDelete({ complaint: complaintId, user: userId });
		if (!vote) {
			return Response(res, 404, false, "Vote not found");
		}

		await Complaint.findByIdAndUpdate(complaintId, { $pull: { upvotes: userId } });

		Response(res, 200, true, "Vote removed");
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
