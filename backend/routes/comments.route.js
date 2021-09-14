const express = require('express');
const router  = express.Router();
// controller
const commentsController = require('../controllers/task-comments.controller');
// Middleware
const auth         = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

console.log('\x1b[33m%s\x1b[0m', 'Registring comments routing /api/task-comments');

console.log('[POST] /create ');
router.post('/create', auth, validateUser, commentsController.create);

console.log('[GET] /list/:task_id');
router.get('/list/:task_id', auth, validateUser, commentsController.list);

console.log('[PUT] /update ');
router.put('/update', auth, validateUser, commentsController.update);

// console.log('[DELETE] /delete/:_id ');
// router.delete('/delete/:_id', auth, validateUser, tasksController.del);

module.exports = router;
