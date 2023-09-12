import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./utils.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// Routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

const PORT = process.env.PORT;

const app = express();
let corsOptions = {
  origin: ["http://localhost:3000", "https://seefar.vercel.app/"],
  allowedHeaders: ['Accept', 'Content-Type'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  "Access-Control-Allow-Origin": "https://seefar.vercel.app/",
  credentials: true
};

// serve the images for public usage...
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors(corsOptions));

// Routes Initialization
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/upload", uploadRoute);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server running on http://localhost:${PORT}`);
});
