const { register, login, listUser } = require("../controller/authController");

const router = require("express").Router();

router.post("/register", register);
router.post("/loginn", login);
router.get("/listUser", listUser);

module.exports = router;
