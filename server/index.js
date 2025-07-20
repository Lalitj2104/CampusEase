import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './config/database.js';

dotenv.config({path: "./config/.env"});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});