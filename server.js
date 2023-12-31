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
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";

const PORT = process.env.PORT;

const app = express();

// let corsOptions = {
//   origin: ["http://localhost:3000", "https://seefar.vercel.app/"],
//   allowedHeaders: ['Accept', 'Content-Type'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   "Access-Control-Allow-Origin": "https://seefar.vercel.app/" ,
//   credentials: true
// };

// serve the images for public usage...
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// Routes Initialization
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/upload", uploadRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);



const startService = async () => {
  const startDB = connectDB()
  startDB.then( () => app.listen(PORT, () => console.log(`server running on port => ${PORT}`)))
};

startService();
