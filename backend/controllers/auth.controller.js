import User from "../models/user.model.js";
import bcrpyt from 'bcryptjs'
export const signup=async (req,res)=>{
   try{
      const {fullName,userName,email,password}=req.body;
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email)) {
         return res.status(400).json({ error: "Invalid email format" });
       }
      const existingUser=await User.findOne({userName});
      if(existingUser){
         return res.status(400).json({error:"userName is already taken"});
      }
      const existingEmail=await User.findOne({email});
      if(existingEmail){
         return res.status(400).json({error:"Email is already taken"});
      }
      //hash passowrd
      const salt=await bcrpyt.gensalt(10);
      const hashedpassword=await bcrpyt.hash(password,salt);
      const newUser=new User({
         fullName:fullName,
         userName:userName,
         email:email,
         password:hashedpassword,
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
            coverImg:newUser.coverImg
         })
      }
      else{
         res.status(400).json({error:"Invalid user data"});
      }
      }catch(error){
      res.status(500).json({error:"Internal Server Error"});
   }
}

export const login=async(req,res)=>{
   res.json({
      data:"You hit the login endpoint",
   });
}

export const logout=async(req,res)=>{
   res.json({
      data:"You hit the logput endpoint",
   })
}