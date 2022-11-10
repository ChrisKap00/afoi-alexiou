import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import adminRoutes from "./routes/admin.js";
import productsRoutes from "./routes/products.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/admin", adminRoutes);
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

const PORT = 5000;

mongoose.connect(
  "mongodb+srv://chriskap:chriskap123@cluster0.spfqlkk.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
