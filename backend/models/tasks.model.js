const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  name        : { type : String, required: true },
  description : { type : String, required: false },
  id_archived : { type : Boolean, required: true },
  list_id     : { type: mongoose.Schema.ObjectId, ref: "lists" },
  date        : { type: Date, default: Date.now },
});

const Tasks = mongoose.model("tasks", tasksSchema);

module.exports = Tasks;
