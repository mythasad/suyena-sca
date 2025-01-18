import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/suyena-sca';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default connectDB;
