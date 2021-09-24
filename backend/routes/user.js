const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Admin = require("../middleware/admin");

router.post("/registerUser", UserController.registerUser);
router.post("/login", UserController.login);
router.get(
  "/listUsers/:name?",
  Auth,
  ValidateUser,
  UserController.listUser
);
router.get(
  "/listUsers/:name?",
  Auth,
  ValidateUser,
  UserController.listUserAll
);
router.put("/updateUser", Auth, ValidateUser, Admin, UserController.updateUser);
router.put("/deleteUser", Auth, ValidateUser, Admin, UserController.deleteUser);
router.post(
  "/registerAdmin",
  Auth,
  ValidateUser,
  Admin,
  UserController.registerAdmin
);
router.get("/getRole/:email", UserController.getRole);
router.get("/getEmailAdmin/", UserController.getEmailAdmin);
router.get("/getMyInfo", Auth, ValidateUser, UserController.getMyInfo);

module.exports = router;
