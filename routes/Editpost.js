const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// require("../config/passportfb");

const Post = require("../models/Post");

const User = require("../models/User");

router.get("/editpost/:_id", async (req, res) => {
  let editPost = await Post.findById(req.params._id).lean();
  res.render("editPost", { layout: "authRoutes", editPost });
});

router.put("/editpost/:_id", async (req, res) => {
  let postToUpdate;
  try {
    postToUpdate = await Post.findById(req.params._id);
    postToUpdate.title = req.body.title;
    postToUpdate.description = req.body.description;
    postToUpdate.category = req.body.category;
    postToUpdate.price = req.body.price;
    postToUpdate.image = req.body.image;
    await postToUpdate.save();
    res.redirect("/myposts");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
