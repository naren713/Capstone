const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// require("../config/passportfb");

const Post = require("../models/Post");

const User = require("../models/User");

router.get("/myposts", async (req, res) => {
  await User.findById(req.user._id)
    .lean()
    .populate("posts")
    .then((myuser) => {
      //   console.log(myuser);
      res.render("myPosts", { layout: "authRoutes", myuser });
    });
});

module.exports = router;
