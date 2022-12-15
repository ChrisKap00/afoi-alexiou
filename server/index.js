import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.js";
import productsRoutes from "./routes/products.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/admin", adminRoutes);
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
