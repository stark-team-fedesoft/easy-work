const mongoose = require("mongoose");

const history_activitiesSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.ObjectId, ref: "user" },
  description: String,
  date: { type: Date, default: Date.now },
});

const history_activities = mongoose.model(
  "history_activities",
  history_activitiesSchema
);
module.exports = history_activities;
