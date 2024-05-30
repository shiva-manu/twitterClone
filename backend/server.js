import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv';
import connectMongoDB from "./db/connectMongoDb.js";


dotenv.config();
const app=express();
app.use(express.urlencoded({extended:true}));
const port=process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
   res.send("Server is ready");
});

app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
   connectMongoDB();
});