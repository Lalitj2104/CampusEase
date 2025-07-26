import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './config/database.js';

dotenv.config({path: "./config/.env"});

connectDB();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});