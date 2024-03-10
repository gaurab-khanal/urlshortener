import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const PORT = process.env.PORT;

// routes
import urlRoutes from "./routes/urlroute.js";

app.use("/api/v1", urlRoutes);

app.listen(PORT, () => console.log("Server is running on port: ", PORT));

console.log(PORT);
