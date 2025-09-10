import express from 'express';
import { changePassword, deleteUser, forgetPassword, getAllUsers, getUserProfile, loginUser, logoutUser, registerUser, resendOtp, resetPassword, updateUserProfile, verifyUser } from '../controllers/UserController.js';
import { isAuthenticated } from './../middlewares/Auth.js';




const UserRoute = express.Router();


UserRoute.post("/register",registerUser);
UserRoute.post("/login",loginUser);
UserRoute.post("/verify/:id",verifyUser);
UserRoute.get("/resend/:id",resendOtp);
UserRoute.post("/forget",forgetPassword);
UserRoute.post("/reset/:id",resetPassword);
UserRoute.post("/changepassword/:id",changePassword);
UserRoute.post("/logout",logoutUser);
UserRoute.get("/me",getUserProfile);
UserRoute.put("/update",isAuthenticated,updateUserProfile);
UserRoute.get("/all",getAllUsers);
UserRoute.delete("/delete/:id",deleteUser);
export default UserRoute;