const express = require('express');
const router  = express.Router();
// controller
const spaceWorkController = require('../controllers/spaceWork');

router.post('/registerSpaceWork', spaceWorkController.registerSpaceWork);
router.get('/listSpaceWork', spaceWorkController.listSpaceWork);
router.put('/updateSpaceWork', spaceWorkController.updateSpaceWork);
router.delete('/deleteSpaceWork', spaceWorkController.deleteSpaceWork);

module.exports = router;