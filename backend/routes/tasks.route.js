const express = require('express');
const router  = express.Router();
// controller
const tasksController = require('../controllers/tasks.controller');
// Middleware
const auth         = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

console.log('[POST] /create ');
router.post('/create', auth, validateUser, tasksController.create);

console.log('[GET] /list/:list_id ');
router.get('/list/:list_id', auth, validateUser, tasksController.list);

console.log('[GET] /list-archived/:list_id ');
router.get('/list-archived/:list_id', auth, validateUser, tasksController.listArchived);

console.log('[PUT] /update ');
router.put('/update', auth, validateUser, tasksController.update);

console.log('[DELETE] /delete/:_id ');
router.delete('/delete/:_id', auth, validateUser, tasksController.del);

module.exports = router;
