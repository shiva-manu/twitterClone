import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserprofile,followUnfollowUser,getSuggestedUser,updateUserProfile} from "../controllers/user.controller.js";
const router=express.Router();

router.get("/profile/:userName",protectRoute,getUserprofile);
router.get("/suggested",protectRoute,getSuggestedUser);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.post("/update",protectRoute,updateUserProfile);
export default router;