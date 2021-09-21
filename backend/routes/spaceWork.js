const express = require('express');
const router  = express.Router();
// controller
const spaceWorkController = require('../controllers/spaceWork');
// middleware
const auth = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

router.post('/create', auth, validateUser, spaceWorkController.registerSpaceWork);
router.get('/list', auth, validateUser, spaceWorkController.listSpaceWork);
router.get('/list-users/:workspace_id', auth, validateUser, spaceWorkController.getUsers);
router.get('/get/:_id', auth, validateUser, spaceWorkController.get);
router.put('/update', auth, validateUser, spaceWorkController.updateSpaceWork);
router.delete('/delete/:_id', auth, validateUser, spaceWorkController.deleteSpaceWork);
router.post('/add-users', auth, validateUser, spaceWorkController.addUsers);
router.post('/remove-users', auth, validateUser, spaceWorkController.removeUser);

module.exports = router;