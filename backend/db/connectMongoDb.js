import mongoose from "mongoose";

const connectMongoDB=async ()=>{
   try{
      const user=await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected: ${user.connection.host}`);
   }catch(error){
      console.log(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1)
   }
}

export default connectMongoDB