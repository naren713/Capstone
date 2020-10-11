const mongoose = require("mongoose");

const Fb_userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  profileUrl: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fb_user", Fb_userSchema);
