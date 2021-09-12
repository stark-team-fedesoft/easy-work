const mongoose = require("mongoose");

const spaceWorkSchema = new mongoose.Schema({
  // TODO validar permisos
  name        : { type: String, required: true},
  description : { type: String, required: false},
  user_id     : [ { type: mongoose.Schema.ObjectId, ref: "user" } ],
  date        : { type: Date, default: Date.now },
});

const spaceWork = mongoose.model("spaceWork", spaceWorkSchema);
module.exports = spaceWork;
