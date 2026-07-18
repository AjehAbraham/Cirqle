import dotenv from "dotenv";
import mongoose from "mongoose";
import {InternalServerError} from "../utils/AppError.js";
dotenv.config();

const connectDB = async () => {
	console.log("URI:", process.env.MONGO_URI);
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI, {family: 4});
	}catch(error){
	  console.error(error);
		throw new InternalServerError("Server failed to connect to database", "DATABASE_INTERNAL_SERVER_ERROR");
		process.exit(1);
	}
}
export default connectDB;