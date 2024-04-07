
import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    }
    catch (error) {
        console.log(`Error: ${error}`.red);
    }
}

export default connectDB;