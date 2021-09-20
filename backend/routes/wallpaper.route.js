const express = require('express');
const router  = express.Router();
// controller
const tasksController     = require('../controllers/tasks.controller');
const wallpaperController = require('../controllers/wallpaper.controller');
// Middleware
const auth         = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

console.log('\x1b[33m%s\x1b[0m', 'Registring wallpapers routing /api/wallpapers');

console.log('[GET] /list/:query ');
router.get('/list/:query', auth, validateUser, wallpaperController.getWallpapers);

module.exports = router;
