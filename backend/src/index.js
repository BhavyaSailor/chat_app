import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const port = process.env.PORT;
const frontendUrl= process.env.FRONTEND_URL;

app.use(express.json);
app.use(cors({ origin: frontendUrl , credentials: true}));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
