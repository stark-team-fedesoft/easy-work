const mongoose = require("mongoose");

const spaceWorkSchema = new mongoose.Schema({
  description: String,
  boardId: { type: mongoose.Schema.ObjectId, ref: "board" },
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
});

const spaceWork = mongoose.model("spaceWork", spaceWorkSchema);
module.exports = spaceWork;
