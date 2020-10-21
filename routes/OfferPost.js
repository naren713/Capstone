const router = require("express").Router();
// const offers = require("../data/myoffers.json");
const Offer = require("../models/Offer");
const Post = require("../models/Post");
const mongoose = require("mongoose");
require("./CreatePost");

router.get("/offers/:_id", async (req, res) => {
  try {
    const offerPost = await Offer.findById(req.params._id).lean();
    // console.log(offerPost);
    res.render("offerPost", { offerPost, layout: "authRoutes" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/offers/:_id", async (req, res) => {
  // let { title, description, category, image } = req.body;
  let offerToPost = new Post({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
  });
  // console.log(offerToPost);
  try {
    await offerToPost.save((err, offPost) => {
      if (!err) {
        res.redirect("/home");
      } else {
        console.log(err);
        res.redirect("/offers");
      }
    });
  } catch {
    if (offerToPost == null) {
      res.render("offers");
    }
  }
});

module.exports = router;
