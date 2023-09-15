import express from "express";
import cors from "cors";

const app = express();

// Apply imported middleware
app.use(cors());
app.use(express.json());

// Create room route

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});