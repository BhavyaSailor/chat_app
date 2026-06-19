import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT;
const frontendUrl= process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd() , "public");

app.use(express.json());
app.use(cors({ origin: frontendUrl , credentials: true}));
app.use(clerkMiddleware());

app.use("api/webhook/clerk", express.raw({ type: "application/json"}), clerkWebhook);
 
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});



if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get((req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
