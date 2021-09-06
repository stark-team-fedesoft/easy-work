const express = require("express");
const cors = require("cors");
const { dbconnection } = require("./db/db");
const History_activities = require("./routes/history_activities");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/Activities", History_activities);

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

dbconnection();
