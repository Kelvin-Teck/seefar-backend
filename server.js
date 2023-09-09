import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./utils.js";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

// Routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js"

const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes Initialization
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server running on http://localhost:${PORT}`);
});
