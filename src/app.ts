import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Welcome to API",
  });
});

export default app;
