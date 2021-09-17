const Tasks      = require('../models/tasks.model');
const TasksList  = require('../models/tasks-list.model');
const Boards     = require('../models/board');
const Workspaces = require('../models/spaceWork');

const create = async(req, res) => {
    try {
        if( !req.body.name || !req.body.list_id ) return res.status(400).send('Incomplete data');

        const list = await TasksList.findById(req.body.list_id);

        if( !list ) return res.status(400).send('Enter a valid task list');

        const board = await Boards.findById( list.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid board');
        
        let end_date = new Date().setDate( new Date().getDate() + 30 );
        
        end_date = new Date(end_date);
        
        if( req.body.end_date ) {
            const arr_date = req.body.end_date.split("-");
            const current  = new Date().getTime(); // current timestamp
            const end      = new Date(arr_date[0], arr_date[1] - 1, arr_date[2]).getTime(); // user req timestamp
            
            if( current > end ) return res.status(400).send('The end date is greather than current date');
            
            end_date = new Date(arr_date[0], arr_date[1] - 1, arr_date[2]);
        }

        const tks = await Tasks.find({ list_id: req.body.list_id });

        const task = new Tasks({
            name        : req.body.name,
            description : req.body.description,
            is_archived : false,
            list_id     : req.body.list_id,
            priority    : tks.length + 1,
            end_date,
        });

        const result = await task.save();

        if( !result ) return res.status(400).send('An error ocurred creating task');

        return res.status(200).send({ data: task });

    } catch (e) {
        console.log(`tasks controller create error: ${e}`);
        return res.status(400).send('An error ocurred creating task');
    }
}

const list = async(req, res) => {
    try {
        const list = await TasksList.findById(req.params.list_id);

        if( !list ) return res.status(400).send('Enter a valid task list');

        const board = await Boards.findById( list.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid board');

        const tasks = await Tasks
            .find({ list_id: req.params.list_id })
            .sort( { "priority": "asc" } )
            .exec();

            // console.log(tasks);
        return res.status(200).send({ data: tasks });

    } catch (e) {
        console.log(`tasks controller create error: ${e}`);
        return res.status(400).send('An error ocurred listing tasks');
    }
}

const update = async(req, res) => {
    try {
        if( !req.body._id || !req.body.name || !req.body.list_id || !req.body.priority ) return res.status(400).send('Incomplete data');

        const list = await TasksList.findById(req.body.list_id);

        if( !list ) return res.status(400).send('Enter a valid task list');

        const board = await Boards.findById( list.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid board');

        const priority = parseInt( req.body.priority );

        if( priority > 5 || priority < 0 ) return res.status(400).send('Enter a valid priority');

        let end_date = new Date().setDate( new Date().getDate() + 30 );
        
        end_date = new Date(end_date);
        
        if( req.body.end_date ) {
            const arr_date = req.body.end_date.split("-");
            const current  = new Date().getTime(); // current timestamp
            const end      = new Date(arr_date[0], arr_date[1] - 1, arr_date[2]).getTime(); // user req timestamp
            
            if( current > end ) return res.status(400).send('The end date is greather than current date');
            
            end_date = new Date(arr_date[0], arr_date[1] - 1, arr_date[2]);
        }

        const task = await Tasks.findByIdAndUpdate(req.body._id, {
            name        : req.body.name,
            description : req.body.description,
            is_archived : req.body.is_archived,
            list_id     : req.body.list_id,
            priority,
            end_date,
        });

        const result = await task.save();

        if( !result ) return res.status(400).send('An error ocurred updating task');

        return res.status(200).send({ data: task._id });

    } catch (e) {
        console.log(`tasks controller update error: ${e}`);
        return res.status(400).send('An error ocurred creating task');
    }
}

const del = async(req, res) => {
    try {
        const task = await Tasks.findById(req.params._id);

        if( !task ) return res.status(401).send('Enter a valid task');

        const list = await TasksList.findById(task.list_id);

        if( !list ) return res.status(400).send('Enter a valid task list');

        const board = await Boards.findById( list.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid board');

        const result = await Tasks.findByIdAndDelete(req.params._id);

        if( !result ) return res.status(400).send('An error ocurred deleting task');

        return res.status(200).send({ data: req.params._id });

    } catch (e) {
        console.log(`tasks controller del error: ${e}`);
        return res.status(400).send('An error ocurred creating task');
    }
}

module.exports = { create, list, update, del };
