const mongoose = require("mongoose");

const tasksListSchema = new mongoose.Schema({
  name        : { type : String, required: true },
  is_archived : { type : Boolean, required: true },
  priority    : { type : String },
  board_id    : { type: mongoose.Schema.ObjectId, ref: "boards" },
  date        : { type: Date, default: Date.now },
  color       : { type: String, default: null }
});

const TasksList = mongoose.model("tasks_list", tasksListSchema);

module.exports = TasksList;
