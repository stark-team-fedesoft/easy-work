const express = require('express');
const router  = express.Router();
// controller
const tasksListController = require('../controllers/tasks-list.controller');
// Middleware
// const auth         = require('../middleware/auth');
// const validateUser = require('../middleware/validateUser');
// const upload       = require('../middleware/file');

console.log('\x1b[33m%s\x1b[0m', 'Registring tasks routing /api/tasks-list');

console.log('[POST] /create ');
router.post('/create', tasksListController.create);

console.log('[GET] /list/:board_id ');
router.get('/list/:board_id', tasksListController.list);

console.log('[PUT] /update ');
router.put('/update', tasksListController.update);

console.log('[DELETE] /delete/:_id ');
router.delete('/delete/:_id', tasksListController.del);

module.exports = router;