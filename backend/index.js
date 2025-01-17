import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/suyena-sca';
const PORT = process.env.PORT || 8268;
const app = express();
app.use(cors());
app.use(express.json());

if(!MONGODB_URI) {
    console.error('MONGODB_URI is not set');
}
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Database connected successfully'))
    .catch(error => console.error('Error connecting to the database:', error));



    
app.get('/', (req, res) => {
    res.send(`Server is running on port ${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`)
})

