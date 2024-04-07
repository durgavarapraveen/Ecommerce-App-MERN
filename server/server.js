import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import prductItemRoutes from "./routes/prductItemRoutes.js";
import cors from "cors";

// Configure dotenv
dotenv.config();

// Connect to the database
connectDB();

const corsOptions = {
  origin: "*",
};
// Create Express app
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Server is running");
});

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", prductItemRoutes);

// REST API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ecommerce APP",
  });
});

// Port
const port = 8000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgCyan.white);
});
