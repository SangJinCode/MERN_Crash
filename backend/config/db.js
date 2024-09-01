import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

console.log(process.env.DB_URI)

const uri =  process.env.DB_URI;

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(uri);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
	}
};