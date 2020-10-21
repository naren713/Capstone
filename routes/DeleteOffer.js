const router = require("express").Router();

const Offer = require("../models/Offer");

router.delete("/deleteoffer/:_id", async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params._id).then(() => {
      res.redirect("/myoffers");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
