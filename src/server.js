const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");

const invoiceRoutes = require("./routes/invoices");
const authRoutes = require("./routes/auth");
const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/invoices", invoiceRoutes);
app.use("/auth", authRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
