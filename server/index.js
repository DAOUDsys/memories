import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB, PORT } from "./config/connectDB.js";
import postRouter from "./routes/post.js";
import authRouter from './routes/auth.js'
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.disable('etag');

// use dependencies
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

// routers
app.use("/posts", postRouter);
app.use("/auth", authRouter);

// connect mongoose
connectDB();

const server = app.listen(PORT, console.log(`server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error ${err.message}`);
    // close server & exit process
    server.close(() => process.exit(1));
  });