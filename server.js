import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './utils.js';
import dotenv from 'dotenv';
dotenv.config();

// Routes
import authRoutes from './routes/authRoutes.js';

const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Routes Initialization
app.use('/auth', authRoutes);


app.listen(PORT, async () => {
    await connectDB()
    console.log(`server running on http://localhost:${PORT}`);
})