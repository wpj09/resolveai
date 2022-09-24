import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
