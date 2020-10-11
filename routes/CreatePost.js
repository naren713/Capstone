const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Post = require("../models/Post");

router.get("/create", (req, res) => {
  res.render("createPost", { layout: "authRoutes" });
});

router.post("/create", async (req, res) => {
  let { title, description } = req.body;
  let newPost = new Post({ title, description });
  try {
    await newPost.save();
    res.redirect("/home");
  } catch {
    res.sendStatus(404);
  }
});

module.exports = router;
