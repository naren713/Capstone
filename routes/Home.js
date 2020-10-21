const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// require("../config/passportfb");

const Post = require("../models/Post");

router.get("/home", (req, res) => {
  Post.find({})
    .lean()
    .populate("postedBy")
    .exec((err, data) => {
      // console.log(data.postedBy.displayName);
      if (err) throw err;
      res.render("home", {
        posts: data,
        layout: "authRoutes",
        dp: req.user.image,
        name: req.user.displayName,
      });
    });
});

module.exports = router;
