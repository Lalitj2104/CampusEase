import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
	{
		complaint: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Complaint",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		responder: {
			type: String,
			default: "Admin",
		},
		status: {
			type: String,
			enum: ["Pending", "In Progress", "Resolved"],
			default: "Pending",
		},
	},
	{
		timestamps: true,
	},
);

const Response = mongoose.model("Response", responseSchema);
export default Response;
