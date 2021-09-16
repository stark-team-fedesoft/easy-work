const Comment    = require('../models/task-comments.model');
const Tasks      = require('../models/tasks.model');
const TasksList  = require('../models/tasks-list.model');
const Boards     = require('../models/board');
const Workspaces = require('../models/spaceWork');

const create = async(req,res) => {
    try {
        if( !req.body.task_id || !req.body.text ) return res.status(400).send('incomplete data');

        const task = await Tasks.findById(req.body.task_id);

        if( !task ) return res.status(400).send('enter a valid task');

        const list = await TasksList.findById(task.list_id);

        if( !list ) return res.status(400).send('Enter a valid task list');

        const board = await Boards.findById( list.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid task');

        const comment = new Comment({
            text    : req.body.text,
            task_id : req.body.task_id,
            user_id : req.user._id,
        });

        const result = await comment.save();

        if( !result ) return res.status(400).send('An error ocurred creating comment.')

        return res.status(201).send({ data : comment });

    } catch(e) {
        console.log(`task comment controller error ${e}`);
        return res.status(400).send('An error ocured creating comment. Please try again later');
    }
}

const list = async(req, res) => {
    try {
        const task = await Tasks.findById(req.params.task_id);

        if( !task ) return res.status(400).send('enter a valid task');

        const list = await TasksList.findById(task.list_id);

        if( !list ) return res.status(400).send('Enter a valid task list');

        const board = await Boards.findById( list.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid task');

        const comments = await Comment.find({ task_id : req.params.task_id });

        return res.status(200).send({ data: comments });

    } catch(e) {
        console.log(`task comment controller list error ${e}`);
        return res.status(400).send('An error ocured creating comment. Please try again later');
    }
}

const update = async(req,res) => {
    try {
        if( !req.body._id || !req.body.text ) return res.status(400).send('incomplete data');

        const comment = await Comment.findById(req.body._id);

        if( !comment ) return res.status(400).send('enter a valid comment');

        const task = await Tasks.findById(comment.task_id);

        if( !task ) return res.status(400).send('enter a valid task');

        const list = await TasksList.findById(task.list_id);

        if( !list ) return res.status(400).send('Enter a valid task list');

        const board = await Boards.findById( list.board_id );

        if( !board ) return res.status(400).send('Enter a valid board');

        const space = await Workspaces.findOne({
            user_id: req.user._id,
            _id: board.workspace_id,
        });

        if( !space ) return res.status(400).send('Enter a valid task');

        const result = await Comment.findByIdAndUpdate( req.body._id, {
            text    : req.body.text,
        });

        if( !result ) return res.status(400).send('An error ocurred creating comment.')

        return res.status(201).send({ data : comment._id });

    } catch(e) {
        console.log(`task comment controller error ${e}`);
        return res.status(400).send('An error ocured creating comment. Please try again later');
    }
}

module.exports = {
    create,
    update,
    list,
}
