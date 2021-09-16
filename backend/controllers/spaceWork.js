const User = require("../models/user");
const Board = require("../models/board");
const mongoose = require("mongoose");
const SpaceWork = require("../models/spaceWork");

const registerSpaceWork = async (req, res) => {
  try {
    if( !req.body.name  ) return res.status(400).send('incomplete data');

    const existing = await SpaceWork.findOne({ name: req. body.name });

    if( existing ) return res.status(400).send('The work space already exists');

    const workspace = new SpaceWork({
      name: req.body.name,
      description: req.body.description,
      user_id: [ req.user._id ],
    });

    const result = await workspace.save();

    if( !result ) return res.status(400).send('An error ocurred. Please try again');

    return res. status(201).send({ data: workspace });

  } catch(e) {
    console.log(`controller spacework register error ${e}`);
    return res.status(400).send('An error ocurred please try again')
  }
};

const listSpaceWork = async (req, res) => {
  // only spaces linked to users
  const spaces = await SpaceWork.find({ user_id: req.user._id });

  return res.status(200).send({ data: spaces });
};

const updateSpaceWork = async (req, res) => {
  if (!req.body._id || !req.body.name ) return res.status(400).send("Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  const space = await SpaceWork.findOne({
    user_id: req.user._id,
    _id: req.body._id,
  });
  
  if( !space ) return res.status(400).send("Enter a valid space work");

  const spaceWork = await SpaceWork.findByIdAndUpdate(req.body._id, {
    description: req.body.description,
  });

  if (!spaceWork) return res.status(400).send("Error editing spaceWork");

  return res.status(200).send({ data: spaceWork });
};

const deleteSpaceWork = async(req, res) => {
  try {
    const space = await SpaceWork.findOne({
      user_id: req.user._id,
      _id: req.params._id,
    });
    
    if( !space ) return res.status(400).send("Enter a valid space work");

    const result = await SpaceWork.findByIdAndDelete(req.params._id);

    if( !result ) return res.status(400).send('An error ocurred deleting task');

    return res.status(200).send({ data: req.params._id });

  } catch (e) {
    console.log(`spaceWorks controller del error: ${e}`);
    return res.status(400).send('An error ocurred deleting spaceWork');
  }
}

const addUsers = async(req, res) => {
  try {
    if( !req.body.user_id || !req.body.workspace_id ) return res.status(400).send('incomplete data');

    const validUser = await User.findById( req.body.user_id );

    if( !validUser ) return res.status(400).send('enter a valid user');

    const space = await SpaceWork.findOne({
      _id: req.body.workspace_id,
      user_id: req.user._id,
    });

    const arrUsers = Object.keys(space.user_id).map( (key) => space.user_id[key] );

    let arrUs = [];

    for(let user_id of arrUsers ){
      const userstr = user_id.toString();
      
      if( userstr == req.body.user_id ) return res.status(400).send('user already added');

      arrUs.push(userstr);
      arrUs.push(req.body.user_id);
    }

    space.user_id = arrUs;

    const result = await space.save();
    
    if( !result ) return res.status(400).send('An error ocurred. Please try again later');

    return res.status(200).send({ data: space });

  } catch(e) {
    console.log(`spaceWorks controller addusers error: ${e}`);
    return res.status(400).send('An error ocurred adding users on spaceWork');
  }
}

module.exports = {
  registerSpaceWork,
  listSpaceWork,
  updateSpaceWork,
  deleteSpaceWork,
  addUsers,
};
