const Tasks = require('../models/tasks.model');
// TODO agregar modelo de listas

const create = async(req, res) => {
    try {
        if( !req.body.name || !req.body.list_id ) return res.status(400).send('Incomplete data');

        // TODO validar id de lista

        const task = new Tasks({
            name        : req.body.name,
            description : req.body.description,
            is_archived : false,
            list_id     : req.body.list_id,
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
    const tasks = await Tasks.find();
    return res.status(200).send({ data: tasks });
}

const update = async(req, res) => {
    try {
        if( !req.body._id || !req.body.name || !req.body.list_id || !req.body.is_archived ) return res.status(400).send('Incomplete data');

        const result = await Tasks.findByIdAndUpdate(req.body._id, {
            name        : req.body.name,
            description : req.body.description,
            is_archived : req.body.is_archived,
            list_id     : req.body.list_id,
        });

        if( !result ) return res.status(400).send('An error ocurred updating task');

        return res.status(200).send({ data: task });

    } catch (e) {
        console.log(`tasks controller update error: ${e}`);
        return res.status(400).send('An error ocurred creating task');
    }
}

const del = async(req, res) => {
    try {

        const result = await Tasks.findByIdAndDelete(req.params._id);

        if( !result ) return res.status(400).send('An error ocurred deleting task');

        return res.status(200).send({ data: req.params._id });

    } catch (e) {
        console.log(`tasks controller del error: ${e}`);
        return res.status(400).send('An error ocurred creating task');
    }
}

module.exports = { create, list, update, del };
