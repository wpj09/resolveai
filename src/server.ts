import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { router } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
