const router = require("express").Router();
const offers = require("../data/myoffers.json");
const Offer = require("../models/Offer");
const User = require("../models/User");

router.get("/offers", (req, res) => {
  Offer.find()
    .lean()
    .exec((err, data) => {
      // console.log(offers);
      if (err) throw err;
      res.render("offers", {
        data,
        offers,
        layout: "authRoutes",
      });
    });
  // res.render("offers", { data, layout: "authRoutes" });
});

router.get("/createoffer", (req, res) => {
  res.render("createOffer");
});

router.post("/createoffer", async (req, res) => {
  let { title, category, description, price, offer_url, image_url } = req.body;
  let newOffer = new Offer({
    title,
    category,
    description,
    price,
    offer_url,
    image_url,
  });
  try {
    await newOffer.save();
    let curUser = await User.findById(req.user._id);
    curUser.offers.push(newOffer);
    curUser.save();
    console.log(JSON.stringify(curUser));
    res.redirect("/offers");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
