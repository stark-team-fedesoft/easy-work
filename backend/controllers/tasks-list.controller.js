const TasksList  = require('../models/tasks-list.model');
const Tasks      = require('../models/tasks.model');
const Boards     = require('../models/board');
const Workspaces = require('../models/spaceWork');

const create = async(req, res) => {
    try {
        if( !req.body.name || !req.body.board_id ) return res.status(400).send('Incomplete data');

        const board = await Boards.findById( req.body.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid board');

        const existingList = await TasksList.findOne({ name: req.body.name, board_id: req.body.board_id });

        if( existingList ) return res.status(400).send('Task list already exist');

        const lists = await TasksList.find({ board_id: req.body.board_id });

        const taskList = new TasksList({
            name        : req.body.name,
            is_archived : false,
            board_id    : req.body.board_id,
            priority    : lists.length + 1,
        });

        const result = await taskList.save();

        if( !result ) return res.status(400).send('An error ocurred. Please try again later');

        return res.status(201).send({ data: taskList });

    } catch(e) {
        console.log(`Tasks list controller create error: ${e}`);
        return res.status(400).send('An error ocurred. Please try again');
    }
}

const list = async(req, res) => {
    try {
        const board = await Boards.findById( req.params.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid board');

        const lists = await TasksList.find({ board_id: req.params.board_id }).sort({priority: "asc"});
        return res.status(200).send({ data: lists });

    } catch(e) {
        console.log(`Tasks list controller create error: ${e}`);
        return res.status(400).send('An error ocurred. Please try again');
    }
}

const update = async(req, res) => {
    try {
        if( !req.body._id || !req.body.name || !req.body.board_id || !req.body.priority ) return res.status(400).send('Incomplete data');

        const board = await Boards.findById( req.body.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid board');

        const result = await TasksList.findByIdAndUpdate(req.body._id, {
            name        : req.body.name,
            is_archived : req.body.is_archived,
            priority    : req.body.priority,
        });

        if( !result ) return res.status(400).send('An error ocurred. Please try again later');

        return res.status(200).send({ data: result });

    } catch(e) {
        console.log(`Tasks list controller create error: ${e}`);
        return res.status(400).send('An error ocurred. Please try again');
    }
}

const del = async(req, res) => {
    try{
        const tasks = await Tasks.find({ list_id: req.params._id });

        for(let task of tasks ) {
            const resTask = await Tasks.findByIdAndDelete( task._id );
            
            if( !resTask )  return res.status(400).send('An error ocurred removing tasks of list. Please try again later');
        }

        const result = await TasksList.findByIdAndDelete( req.params._id );
        if( !result ) return res.status(400).send('An error ocurred. Please try again later');
        
        setTimeout(() => {        
            return res.status(200).send({ data: req.params._id });
        }, 2000);

    } catch(e) {
        console.log(`tasks list controller del error: ${e}`);
        return res.status(400).send('An error ocurred creating task');
    }
}

module.exports = { create, list, update, del };
