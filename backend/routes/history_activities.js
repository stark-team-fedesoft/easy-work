const express = require("express");
const router = express.Router();
const ActivityController = require("../controllers/history_activities");

router.post("/registerActivity", ActivityController.registerActivies);
router.get("/listActivities", ActivityController.listActivities);

module.exports = router;
