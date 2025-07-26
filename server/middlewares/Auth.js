import jwt from "jsonwebtoken";
import { Response } from "../utils/response.js";
import { message } from "../utils/message.js";
import User from "../models/User.js";


export const isAuthenticated = async (req, res, next)=> {
    try{
        //parsing cookies
        const { token } = req.cookies;

        //check token
        if(!token){
            return Response(res, 401, false, message.unAuthorizedMessage);
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //find user from token 
        const user = await User.findById(decoded.id);

        //check user
        if(!user){
            return Response(res, 400, false, message.unAuthorizedMessage);
        }

        req.user = user;
        next();

    } catch(error){
        Response(res, 500, false, error.message);
    }
}
