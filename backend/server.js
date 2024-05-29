import express from 'express'
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDb.js';
dotenv.config();
const app=express();
app.use(express.json()); // to parse req.body
app.use(express.urlencoded({extended:true}))
const port=process.env.PORT

app.use("/api/auth",authRoutes)
console.log(process.env.MONGO_URI)
app.listen(port,()=>{
   console.log("Server is running on port ",port)
   connectMongoDB();
})
