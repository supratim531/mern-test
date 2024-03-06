const router = require("express").Router();
const { handleToken } = require("../middlewares/tokenHandler");
const {
  login,
  current,
  register
} = require("../controllers/authController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/current").get(handleToken, current);

module.exports = router;
