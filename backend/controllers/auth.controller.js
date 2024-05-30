import User from '../models/user.model.js';
import bcrpyt from "bcryptjs";
import {generateTokenAndSetCookie} from '../lib/utils/generateTokens.js';

export const signup =async (req,res)=>{
   try{
      const {userName,fullName,email,password}=req.body;
      const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
         return res.status(400).json({error:"Invalid email format"});
      }
      const existingUser=await User.findOne({userName});
      if(existingUser){
         return res.status(400).json({error:"Username is already taken"});
      }
      const existingEmail=await User.findOne({email});
      if(existingEmail){
         return res.status(400).json({error:"Email is already taken"});
      }
      if(password.length<6){
         return res.status(400).json({error:"password must be a at least 6 characters long"});
      }
      const salt=await bcrpyt.genSalt(10);
      const hashedPassword=await bcrpyt.hash(password,salt);
      const newUser=new User({
         fullName,
         userName,
         email,
         password:hashedPassword
      });
      if(newUser){
         generateTokenAndSetCookie(newUser._id,res);
         await newUser.save();
         res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            userName:newUser.userName,
            email:newUser.email,
            followers:newUser.followers,
            following:newUser.following,
            profileImg:newUser.profileImg,
            coverImg:newUser.coverImg,
         })
      }
      else{
         res.status(400).json({error:"Invalid user data"});
      }
   }catch(error){
      console.log("Error in signup controller",error.message);
      res.status(500).json({error:"Internal Server Error"});
   }
}
export const login=async(req,res)=>{
   try{

   }catch(error){
      console.log(`Error in login controller:${error.message}`);
      res.status(500).json({error:"Internal Server Error"})
   }
};
export const logout=async(req,res)=>{
   res.json({data:"You hit the logout endpoint"});
}