const router = require("express").Router();
const data = require("../data/myoffers.json");

router.get("/offers", (req, res) => {
  res.render("offers", { data, layout: "authRoutes" });
});

module.exports = router;
