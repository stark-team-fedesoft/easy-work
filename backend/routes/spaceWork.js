const express = require('express');
const router  = express.Router();
// controller
const spaceWorkController = require('../controllers/spaceWork');
// middleware
const auth = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

router.post('/create', auth, validateUser, spaceWorkController.registerSpaceWork);
router.get('/list', auth, validateUser, spaceWorkController.listSpaceWork);
router.put('/update', auth, validateUser, spaceWorkController.updateSpaceWork);
router.delete('/delete/:_id', auth, validateUser, spaceWorkController.deleteSpaceWork);
router.post('/add-users', auth, validateUser, spaceWorkController.addUsers);

module.exports = router;