const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/offers", (req, res) => {
  res.render("offers", { layout: "authRoutes" });
});

module.exports = router;
