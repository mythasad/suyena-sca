import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Import the database connection
import studentRoutes from './routes/studentRoutes.js';
import optionRoutes from './routes/optionRoutes.js';
dotenv.config();
const PORT = process.env.PORT || 8268;
const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Connect to the database

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/students', studentRoutes);
app.use('/api/options', optionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.get('/', (req, res) => {
    res.send(`Server is running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`)
});
