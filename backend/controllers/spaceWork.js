const User = require("../models/user");
const Board = require("../models/board");
const mongoose = require("mongoose");
const SpaceWork = require("../models/spaceWork");

const registerSpaceWork = async (req, res) => {
  if (!req.body.description || !req.body.boardId || !req.body.userId)
    return res.status(400).send("Process failed: Incomplete data");

  const validboardId = await mongoose.Types.ObjectId.isValid(req.body.boardId);
  if (!validboardId) return res.status(400).send("Invalid board ID");

  const validUserId = await mongoose.Types.ObjectId.isValid(req.body.creatorId);
  if (validUserId) return res.status(400).send("Invalid user ID");

  const existingSpaceWork = await User.findOne({ email: req.body.description });
  if (existingSpaceWork)
    return res.status(400).send("The SpaceWork is already registered");

  const spaceWork = new SpaceWork({
    description: req.body.description,
    boardId: req.body.boardId,
    userId: req.body.userId,
  });

  const result = await spaceWork.save();
  if (!result) return res.status(400).send("Failed to register spaceWork");
  return res.status(200).send({ result });
};

const listSpaceWork = async (req, res) => {
  const spaceWork = await SpaceWork.find();
  if (!spaceWork || spaceWork.length === 0)
    return res.status(400).send("Empty spaceWork list");
  return res.status(200).send({ spaceWork });
};

const updateSpaceWork = async (req, res) => {
    const validId = mongoose.Types.ObjectId.isValid(req.body._id);
    if (!validId) return res.status(400).send("Invalid id");
  
    if (!req.body._id || !req.body.description)
      return res.status(400).send("Incomplete data");
  
    const spaceWork = await SpaceWork.findByIdAndUpdate(req.body._id, {
      description: req.body.description,
    });
    if (!spaceWork) return res.status(400).send("Error editing spaceWork");
    return res.status(200).send({ spaceWork });
  };

  const deleteSpaceWork = async(req, res) => {
    try {

        const result = await SpaceWork.findByIdAndDelete(req.params._id);

        if( !result ) return res.status(400).send('An error ocurred deleting task');

        return res.status(200).send({ data: req.params._id });

    } catch (e) {
        console.log(`spaceWorks controller del error: ${e}`);
        return res.status(400).send('An error ocurred creating spaceWork');
    }
}


module.exports = {
  registerSpaceWork,
  listSpaceWork,
  updateSpaceWork,
  deleteSpaceWork
};
