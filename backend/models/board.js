const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    name: String,
    description: String,
    permisos: String,
    imageBackUrl: String,
    date: { type: Date, default: Date.now },
    status: { type: Number, default: 1},
    creatorId: { type: mongoose.Schema.ObjectId, ref: "user" },
});

const board = mongoose.model("board", boardSchema);
module.exports = board;