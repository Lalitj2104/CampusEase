import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		middleName: {
			type: String,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		department: {
			type: String,
		},
		password: {
			type: String,
			required: true,
			select: false,
			minlength: [8, "Password must be of at least 8 characters"],
		},location:{
			type: String,
		},
		bio:{
			type: String,
		},
		phoneNumber: {
			type: String,
			required: true,
			minlength: 10,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPassword: {
			type: Number,
		},
		resetPasswordExpire: {
			type: Date,
		},
		resetPasswordAttempts: {
			type: Number,
			default: 0,
		},
		resetPasswordLock: {
			type: Date,
		},
		registerOtp: {
			type: Number,
		},
		registerOtpExpire: {
			type: Date,
		},
		registerOtpAttempts: {
			type: Number,
			default: 0,
		},
		registerOtpLockUntil: {
			type: Date,
			default: undefined,
		},
		loginAttempts: {
			type: Number,
			default: 0,
		},
		lockUntil: {
			type: Date,
		},
		complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],
		votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.generateToken = async function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
