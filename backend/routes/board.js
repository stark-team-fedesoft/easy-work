const express = require("express");
const router = express.Router();
const BoardController = require("../controllers/board");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Upload = require("../middleware/file");
const multiparty = require("connect-multiparty");
const mult = multiparty();

router.post("/create", Auth, ValidateUser, BoardController.create);
router.post("/createImgBack", mult, Upload, Auth, ValidateUser, BoardController.createImgBack);
router.get("/list", Auth, ValidateUser, BoardController.list);

module.exports = router;