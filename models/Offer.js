const mongoose = require("mongoose");

const User = require("./User");

const OfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  offer_url: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;
