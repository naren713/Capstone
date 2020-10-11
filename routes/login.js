const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/login", ensureGuest, (req, res) => {
  res.render("login");
});

module.exports = router;
