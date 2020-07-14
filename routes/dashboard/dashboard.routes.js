const router = require("express").Router();
const { auth } = require("../../middleware/authCheck.service");
const {
  getUserDetail,
  logout,
  getAlluserLIst,
} = require("../../controllers/dashboard");

router.get("/getUserDetail/:id", auth, getUserDetail);
router.get("/userList", auth, getAlluserLIst);
router.post("/logout", auth, logout);

module.exports = router;
