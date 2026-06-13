import dotenv from "dotenv";
import mongoose from "mongoose";
import {InternalServerError} from "../utils/AppError.js";
dotenv.config();

const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI);
	}catch(error){
	  console.error(error);
		throw new InternalServerError("Server failed to connect to database", "DATABASE_INTERNAL_SERVER_ERROR");
		process.exit(1);
	}
}
export default connectDB;