const express = require('express');
const router  = express.Router();
// controller
const tasksListController = require('../controllers/tasks-list.controller');
// Middleware
const auth         = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

console.log('\x1b[33m%s\x1b[0m', 'Registring tasks routing /api/tasks-list');

console.log('[POST] /create ');
router.post('/create', auth, validateUser, tasksListController.create);

console.log('[GET] /list/:board_id ');
router.get('/list/:board_id', auth, validateUser, tasksListController.list);

console.log('[GET] /list-archived/:board_id ');
router.get('/list-archived/:board_id', auth, validateUser, tasksListController.listArchived);

console.log('[PUT] /update ');
router.put('/update', auth, validateUser, tasksListController.update);

console.log('[DELETE] /delete/:_id ');
router.delete('/delete/:_id', auth, validateUser, tasksListController.del);

module.exports = router;
