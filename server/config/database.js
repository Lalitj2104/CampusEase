import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`connected to MongoDB at ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error in connection: ${error}`);
	}
};

export default connectDB;
