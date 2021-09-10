const Board = require("../models/board");
const mongoose = require("mongoose");

const create = async (req, res) => {
    let validId = mongoose.Types.ObjectId.isValid(req.body.creatorId);
    if (!validId) return res.status(400).send("Invalid id user");
    if(!req.body.name || !req.body.description || !req.body.permisos || !req.body.creatorId)
        return res.status(400).send("Incomplete data");
    const board = new Board({
        name: req.body.name,
        description: req.body.description,
        permisos: req.body.permisos,
        creatorId: req.body.creatorId,
        imageBackUrl: req.body.imageBackUrl? req.body.imageBackUrl : 'defaultImgBack.jpg',
    });
    const result = await board.save();
    if (!result) return res.status(400).send("Error registering board");
    return res.status(200).send({ result });
};

const list = async (req, res) => {
    const board = await Board.find({ creatorId: req.user._id });
    if (!board || board.length === 0)
        return res.status(400).send("You have no created bords");
    return res.status(200).send({ board });
};


module.exports = { create, list };