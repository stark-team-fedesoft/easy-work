const TasksList = require('../models/tasks-list.model');

const create = async(req, res) => {
    try {
        if( !req.body.name || !req.body.board_id ) return res.status(400).send('Incomplete data');

        // TODO validar board id

        const existingList = await TasksList.findOne({ name: req.body.name });
        if( existingList ) return res.status(400).send('Task list already exist');

        const taskList = new TasksList({
            name        : req.body.name,
            is_archived : false,
            board_id    : req.body.board_id
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
    const lists = await TasksList.find({ board_id: req.params.board_id });
    return res.status(200).send({ data: lists });
}

const update = async(req, res) => {
    try {
        if( !req.body.name || !req.body.board_id || !req.body.is_archived ) return res.status(400).send('Incomplete data');

        // TODO validar board id

        const result = await TasksList.findByIdAndUpdate(req.body._id, {
            name        : req.body.name,
            is_archived : req.body.is_archived,
            board_id    : req.body.board_id,
        });

        if( !result ) return res.status(400).send('An error ocurred. Please try again later');

        return res.status(200).send({ data: result });

    } catch(e) {
        console.log(`Tasks list controller create error: ${e}`);
        return res.status(400).send('An error ocurred. Please try again');
    }
}

const del = async(req, res) => {
    // TODO validar usuario
    const result = await TasksList.findByIdAndDelete( req.params._id );

    if( !result ) return res.status(400).send('An error ocurred. Please try again later');

    return res.status(200).send({ data: req.params._id });
}

module.exports = { create, list, update, del };
