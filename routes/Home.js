const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Post = require("../models/Post");

router.get("/home", (req, res) => {
  Post.find({})
    .lean()
    .exec((err, data) => {
      // console.log(data);
      if (err) throw err;
      res.render("home", {
        posts: data,
        layout: "authRoutes",
        name: req.user.firstName,
      });
    });
});

module.exports = router;
