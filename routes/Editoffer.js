const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// require("../config/passportfb");

const Post = require("../models/Post");

const User = require("../models/User");

const Offer = require("../models/Offer");

router.get("/editoffer/:_id", async (req, res) => {
  let editOffer = await Offer.findById(req.params._id).lean();
  res.render("editOffer", { layout: "authRoutes", editOffer });
});

router.put("/editoffer/:_id", async (req, res) => {
  let offerToUpdate;
  try {
    offerToUpdate = await Offer.findById(req.params._id);
    offerToUpdate.title = req.body.title;
    offerToUpdate.description = req.body.description;
    offerToUpdate.category = req.body.category;
    offerToUpdate.price = req.body.price;
    offerToUpdate.offer_url = req.body.offer_url;
    offerToUpdate.image_url = req.body.image_url;
    await offerToUpdate.save();
    res.redirect("/myoffers");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
