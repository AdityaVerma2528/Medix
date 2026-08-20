import { Router } from "express"; 
import {
    signup,
    loginWithPassword,
    requestLoginOtp,
    verifyLoginOtp,
    logout,
    requestPasswordResetOtp,
    verifyPasswordResetOtp,
    resetPassword,
} from "../controllers/auth.controller.js";

const router = Router(); 

router.post("/signup", signup); 
router.post("/login/password", loginWithPassword); 
router.post("/login/otp/request", requestLoginOtp);
router.post("/login/otp/verify", verifyLoginOtp);  
router.post("/logout", logout); 
router.post("/forgot-password/request", requestPasswordResetOtp); 
router.post("/forgot-password/verify", verifyPasswordResetOtp); 
router.post("/forgot-password/reset", resetPassword); 

export default router; 