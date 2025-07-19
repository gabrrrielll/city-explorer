import express from "express";
import cors from "cors";
import cityRouter from "./cities.router";
import "./database"; // Initialize database

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", cityRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on ${process.env.BASE_URL || `http://localhost`}:${process.env.PORT}`,
  );
});

export default app;
