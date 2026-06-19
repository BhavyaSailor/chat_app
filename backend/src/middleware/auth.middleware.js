import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";

export async function protectRoute(req, res, next){
    try {
        const {userId} = getAuth(req)
        if (!userId) {
             return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const user = await User.findOne({
            clerkId: userId
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                messgage: "User profile is not synced Yet"
            })
        }

        req.user = user;
        next()
    } catch (error) {
        console.error("Error in protecRoute middleware");
        
        res.status(500).json({
            success: false,
            message : "Error Occured at authnetication"
        })
    }
}