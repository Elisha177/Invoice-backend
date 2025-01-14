
const express = require("express");

const mongoose = require("mongoose")
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();
const connectDB = require('./config/db')

const invoiceRoutes = require('./routes/invoices')

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use('/invoices', invoiceRoutes);

// Database Connection
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})