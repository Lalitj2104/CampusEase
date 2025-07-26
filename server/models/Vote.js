import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		complaint: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
	},
	{ timestamps: true },
);

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
