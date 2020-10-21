const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// require("../config/passportfb");

const Post = require("../models/Post");

router.get("/category/:category", (req, res) => {
  Post.find({ category: req.params.category })
    .lean()
    .exec((err, data) => {
      // console.log(data);
      if (err) throw err;
      res.render("categories", {
        posts: data,
        layout: "authRoutes",
      });
    });
});

module.exports = router;
