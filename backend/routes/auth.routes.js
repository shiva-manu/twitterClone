import express from 'express';
import {signup,login,logout, getme} from "../controllers/auth.controller.js";
import { protectRoute } from '../middleware/protectRoute.js';
const router=express.Router();

router.get("/me",protectRoute,getme)
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout);
export default router;