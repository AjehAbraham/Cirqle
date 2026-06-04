import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI);
	}catch(error){
		throw new InternalServerError("Server failed to connect to database", "DATABASE_INTERNAL_SERVER_ERROR");
		process.exit(1);
	}
}
export default connectDB;