const Board = require("../models/board");
const Workpspace = require("../models/spaceWork");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const create = async (req, res) => {
    try {
        if( !req.body.name || !req.body.workspace_id ) return res.status(400).send('iIncomplete data');

        const existingBoard = await Board.findOne({
            name         : req.body.name,
            workspace_id : req.body.workspace_id,
        });

        if( existingBoard ) return res.status(400).send('The board already exist');
        
        const space = await Workpspace.findOne({
            user_id: req.user._id,
            _id: req.body.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter valid workspace');


        const board = new Board({
            name         : req.body.name, 
            imageBackUrl : '', 
            description  : req.body.description,
            status       : true,
            workspace_id : req.body.workspace_id,
        });

        const result = await board.save();

        if( !result ) return res.status(400).send('An error ocurred please try agian later');

        return res.status(201).send({ data : board });

    } catch(e) {
        console.log(`board controller create error ${e}`);
        return res.status(400).send('An error ocurred please try agian later');
    }
};

const createImgBack = async (req, res) => {
    let validId = mongoose.Types.ObjectId.isValid(req.body.creatorId);
    if (!validId) return res.status(400).send("Invalid id user");
    if (!req.body.name || !req.body.description || !req.body.permisos || !req.body.creatorId)
        return res.status(400).send("Incomplete data");
    let imageUrl = "";
    if (req.files.image) {
        if (req.files.image.type != null) {
            const url = req.protocol + "://" + req.get("host") + "/";
            const serverImg =
                "./uploads/" + moment().unix() + path.extname(req.files.image.path);
            fs.createReadStream(req.files.image.path).pipe(
                fs.createWriteStream(serverImg)
            );
            imageUrl =
                url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
        }
    }
    const board = new Board({
        name: req.body.name,
        description: req.body.description,
        permisos: req.body.permisos,
        creatorId: req.body.creatorId,
        imageBackUrl: imageUrl ? imageUrl : 'defaultImgBack.jpg',
    });
    const result = await board.save();
    if (!result) return res.status(400).send("Error registering board");
    return res.status(200).send({ result });
};

const list = async (req, res) => {
    try{
        const space = await Workpspace.findOne({
            _id: req.params.workspace_id,
            user_id: req.user._id,
        });

        if( !space ) return res.status(400).send('Enter a valid workspace');

        const boards = await Board.find({ workspace_id: req.params.workspace_id })

        return res.status(200).send({ data : boards });
    } catch(e) {
        console.log(`board controller list error ${e}`);
        return res.status(400).send('An error ocurred please try agian later');
    }
};

const update = async (req, res) => {
    try {
        if( !req.body._id || !req.body.name || !req.body.workspace_id || req.body.status ) return res.status(400).send('iIncomplete data');

        const space = await Workpspace.findOne({
            user_id: req.user._id,
            _id: req.body.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter valid workspace');

        const board = await Board.findByIdAndUpdate(req.body._id, {
            name         : req.body.name, 
            imageBackUrl : req.body.imageBackUrl, 
            description  : req.body.description,
            status       : req.body.status,
            workspace_id : req.body.workspace_id,
        });

        if( !board ) return res.status(400).send('An error ocurred please try agian later');

        return res.status(201).send({ data : board._id });

    } catch(e) {
        console.log(`board controller create error ${e}`);
        return res.status(400).send('An error ocurred please try agian later');
    }
};

// TODO crear metodo delete

module.exports = {
    create,
    createImgBack,
    list,
    update,
};
