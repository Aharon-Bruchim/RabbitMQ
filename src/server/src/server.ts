import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";

import setupRouter from "./routes/setupRouter";

import { errorMiddleware } from "./middleware/errorHandler";

dotenv.config();

const app = express();

const httpServer = createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);




app.use("/setup", setupRouter);

app.use(errorMiddleware);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🚀`);
});
