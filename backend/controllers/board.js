const Board      = require("../models/board");
const Lists      = require("../models/tasks-list.model");
const Tasks      = require("../models/tasks.model");
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
            imageBackUrl : req.body.imageBackUrl, 
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

const getById = async(req, res) => {
    try{
        const board = await Board.findById(req.params.board_id);

        if( !board ) return res.status(400).send('enter a valid board');

        const space = await Workpspace.findOne({
            _id: board.workspace_id,
            user_id: req.user._id,
        });

        if( !space ) return res.status(400).send('Enter a valid board');

        return res.status(200).send({ data : board });
    } catch(e) {
        console.log(`board controller getBtId error ${e}`);
        return res.status(400).send('An error ocurred please try agian later');
    }
}

const update = async (req, res) => {
    try {
        if( !req.body._id || !req.body.name || !req.body.workspace_id || !req.body.status ) return res.status(400).send('iIncomplete data');

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

const del = async(req, res) => {
    try{
        const lists = await Lists.find({ board_id: req.params._id });

        for(let list of lists) {
            const tasks = await Tasks.find({ list_id: list._id });
            
            for(let task of tasks ) {
                const resTask = await Tasks.findByIdAndDelete( task._id );
                if( !resTask )  return res.status(400).send('An error ocurred removing tasks of list. Please try again later');
            }

            const resList = await Lists.findByIdAndDelete( list._id );
            if( !resList )  return res.status(400).send('An error ocurred removing lists of board. Please try again later');
        }

        const result = await Board.findByIdAndDelete( req.params._id );
        if( !result ) return res.status(400).send('An error ocurred. Please try again later');

        
        setTimeout(() => {        
            return res.status(200).send({ data: req.params._id });
        }, 2000);

    } catch(e) {
        console.log(`tasks list controller del error: ${e}`);
        return res.status(400).send('An error ocurred creating task');
    }
}

module.exports = {
    create,
    list,
    getById,
    update,
    del,
};
