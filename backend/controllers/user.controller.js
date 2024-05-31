import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
export const getUserprofile=async(req,res)=>{
   const {userName}=req.params;
   try{
      const user=await User.findOne({userName}).select("-password");
      if(!user){
         return res.status(404).json({message:"User not found"});
      }
      res.status(200).json(user);
   }catch(error){
      console.log(`Error in getUserProfile controller: ${error.message}`);
      res.status(500).json({error:error.message});
   }
}

export const followUnfollowUser=async(req,res)=>{
   try{
      const {id}=req.params;
      const userToModify=await User.findById(id);
      const currentUser=await User.findById(req.user._id);
      if(id===req.user._id.toString()){
         return res.status(400).json({error:"You can't found follow or Unfollow yourself"});
      }
      if(!userToModify || !currentUser) 
         return res.status(400).json({error:"User not found"});
      const isfollowing=currentUser.following.includes(id);
      if(isfollowing){
         await User.findByIdAndUpdate(id,{$pull:{following:req.user._id}});
         await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});
         res.status(200).json({message:"User unfollowed successfully"});
      }
      else{
         await User.findByIdAndUpdate(id,{$push:{following:req.user._id}});
         await User.findByIdAndUpdate(id,{$push:{following:id}});
         const newNotification=new Notification({
            type:"follow",
            from:req.user._id,
            to:userToModify._id,
         });
         await newNotification.save();
         res.status(200).json({message:"User followed successfully"});
      }
   }catch(error){
      console.log(`Error in followUnfollowUser: ${error.message}`);
      res.status(500).json({error:error.message});
   }
}