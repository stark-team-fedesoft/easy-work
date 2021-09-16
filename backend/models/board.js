const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    name         : { type: String, required: true },
    imageBackUrl : { type: String, required: false },
    description  : { type: String, required: false },
    status       : { type: Boolean, required: true},
    workspace_id : { type: mongoose.Types.ObjectId, ref: "spaceWork" },
    date         : { type: Date, default: Date.now },
    // permisos: { type: String, required: true },
    // imageBackUrl: { type: String, required: true },
});

const board = mongoose.model("board", boardSchema);
module.exports = board;