import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
	{
		image: {
			public_id: {
				type: String,
				default: "",
			},
			url: {
				type: String,
				default: "",
			},
		},
		title: { type: String, required: true },
		description: { type: String, required: true },
		category: {type:String},
		status: {
			type: String,
			enum: ["pending", "in progress", "resolved"],
			default: "pending",
		},
		upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		location: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

	},
	{
		timestamps: true,
	},
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;