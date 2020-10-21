const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// require("../config/passportfb");

const Offer = require("../models/Offer");

router.get("/category/:category", (req, res) => {
  Offer.find({ category: req.params.category })
    .lean()
    .exec((err, data) => {
      console.log(data);
      if (err) throw err;
      res.render("offerCategories", {
        data,
        layout: "authRoutes",
      });
    });
});

module.exports = router;
