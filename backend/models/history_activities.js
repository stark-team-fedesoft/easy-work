const mongoose = require("mongoose");

const history_activitiesSchema = new mongoose({
  idUser: { type: mongoose.Schema.ObjectId, ref: "User" },
  description: String,
  date: { type: Date, default: Date.now },
});

const history_activities = mongoose.model(
  "history_activities",
  history_activitiesSchema
);
module.exports = history_activitiesSchema;
