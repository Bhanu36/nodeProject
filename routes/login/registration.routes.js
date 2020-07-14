const router = require("express").Router();
const { register, login, logout } = require("../../controllers/registration");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
