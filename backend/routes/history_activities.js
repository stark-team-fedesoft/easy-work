const express = require("express");
const router = express.Router();
const ActivityController = require("../controllers/history_activities");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");

router.post("/registerActivity", Auth, ValidateUser,ActivityController.registerActivies);
router.get("/listActivities/:idBoard?",  Auth, ValidateUser,ActivityController.listActivities);

module.exports = router;
