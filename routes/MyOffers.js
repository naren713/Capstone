const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// require("../config/passportfb");

const Post = require("../models/Post");

const User = require("../models/User");

router.get("/myoffers", async (req, res) => {
  await User.findById(req.user._id)
    .lean()
    .populate("offers")
    .then((myuser) => {
      //   console.log(myuser);
      res.render("myOffers", { layout: "authRoutes", myuser });
    });
});

module.exports = router;
