const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true },
  cr_date: { type: Number, default: Date.now },
  active: { type: Boolean, default: false },
  profilePic: { type: String, required: false },
  refreshToken: { type: String, required: true },
});
module.exports = mongoose.model("User", User);
