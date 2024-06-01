import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import dotenv from 'dotenv';
import {v2 as cloudinary} from "cloudinary";
import connectMongoDB from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";

dotenv.config();
cloudinary.config({
   cloudName:process.env.CLOUDINARY_CLOUD_NAME,
   apiKey:process.env.CLOUDINARY_API_KEY,
   apiSecret:process.env.CLOUDINARY_API_SECRET,
})
const app=express();
app.use(express.urlencoded({extended:true}));
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);

app.get("/",(req,res)=>{
   res.send("Server is ready");
});

app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
   connectMongoDB();
});