import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserprofile,followUnfollowUser } from "../controllers/user.controller.js";
const router=express.Router();

router.get("/profile/:userName",protectRoute,getUserprofile);
// router.get("/suggested",protectRoute,getUserprofile);
router.post("/follow/:id",protectRoute,followUnfollowUser);
// router.post("/update",protectRoute,updateUserProfile);
export default router;