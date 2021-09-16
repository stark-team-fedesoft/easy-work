const express = require('express');
const router  = express.Router();
// controller
const tasksController = require('../controllers/tasks.controller');
// Middleware
// const auth         = require('../middleware/auth');
// const validateUser = require('../middleware/validateUser');
// const upload       = require('../middleware/file');

console.log('\x1b[33m%s\x1b[0m', 'Registring tasks routing /api/tasks');
router.get('/list', tasksController.listAll);

console.log('[POST] /create ');
router.post('/create', tasksController.create);

console.log('[GET] /list/:list_id ');
router.get('/list/:list_id', tasksController.list);

console.log('[PUT] /update ');
router.put('/update', tasksController.update);

console.log('[DELETE] /delete/:_id ');
router.delete('/delete/:_id', tasksController.del);

module.exports = router;
