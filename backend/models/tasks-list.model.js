const mongoose = require("mongoose");

const tasksListSchema = new mongoose.Schema({
  name        : { type : String, required: true },
  is_archived : { type : Boolean, required: true },
  board_id    : { type: mongoose.Schema.ObjectId, ref: "boards" },
  date        : { type: Date, default: Date.now },
});

const TasksList = mongoose.model("tasks_list", tasksListSchema);

module.exports = TasksList;
