import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from './routes/UserRoute.js';
import ResponseRoute from './routes/ResponseRoute.js';
import ComplaintRoute from './routes/ComplaintRoute.js';
import CategoryRoute from './routes/CategoryRoute.js';
import VoteRoute from './routes/VoteRoute.js';

dotenv.config({ path: "./config/.env" });


app.use(
	cors({
		origin: [process.env.LOCAL_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);



app.use(express.json({ limit: "50mb" }));
app.use(cookieParser({ extended: false }));
app.get("/", (req, res) => {
	res.send("server is working");
});


app.use("api/v1/user", UserRoute);
app.use("api/v1/response", ResponseRoute);
app.use("api/v1/complaint", ComplaintRoute);
app.use("api/v1/category", CategoryRoute);
app.use("api/v1/vote", VoteRoute);

export const app= express();