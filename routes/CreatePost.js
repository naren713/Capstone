const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/create", (req, res) => {
  res.render("createPost", { layout: "authRoutes" });
});

router.post("/create", async (req, res) => {
  let { title, description, category, price, image } = req.body;
  let newPost = new Post({
    title,
    description,
    category,
    price,
    image,
  });
  try {
    await newPost.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    let curUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { posts: newPost._id } },
      { new: true, useFindAndModify: false }
    );
    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
