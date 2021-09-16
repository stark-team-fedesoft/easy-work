const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  name        : { type : String, required: true },
  description : { type : String, required: false },
  is_archived : { type : Boolean, required: true },
  priority    : { type : Number, required: true },
  list_id     : { type: mongoose.Schema.ObjectId, ref: "lists" },
  end_date   : { type: Date, required: true },
  date        : { type: Date, default: Date.now },
});

const Tasks = mongoose.model("tasks", tasksSchema);

module.exports = Tasks;
