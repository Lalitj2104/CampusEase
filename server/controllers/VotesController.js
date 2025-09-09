import Complaint from "../models/Complaint.js";
import Vote from "../models/Vote.js";
import { Response } from "../utils/response.js";

export const toggleVote = async (req, res) => {
	try {
		const { complaintId } = req.body;
		const userId = req.user._id;

		// Check if vote already exists
		const existingVote = await Vote.findOne({
			complaint: complaintId,
			user: userId,
		});

		if (existingVote) {
			// Remove vote
			await Vote.findByIdAndDelete(existingVote._id);
			await Complaint.findByIdAndUpdate(complaintId, {
				$pull: { upvotes: userId },
			});

			return Response(res, 200, true, "Vote removed");
		} else {
			// Add vote
			const vote = await Vote.create({ user: userId, complaint: complaintId });
			await Complaint.findByIdAndUpdate(complaintId, {
				$push: { upvotes: userId },
			});

			return Response(res, 201, true, "Complaint upvoted", vote);
		}
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
