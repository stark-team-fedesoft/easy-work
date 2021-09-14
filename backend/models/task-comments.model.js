const mongoose = require("mongoose");

const taskCommentsSchema = new mongoose.Schema({
  text    : { type : String, required: true },
  task_id : { type: mongoose.Schema.ObjectId, ref: "tasks" },
  user_id : { type: mongoose.Schema.ObjectId, ref: "user" },
  date    : { type: Date, default: Date.now },
});

const Comments = mongoose.model("comments", taskCommentsSchema);

module.exports = Comments;
