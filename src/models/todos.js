const mongoose = require("mongoose");

const Todos = new mongoose.Schema({
  msg: { type: String, required: true },
  cr_date: { type: Number, default: Date.now },
  up_date: { type: Number, default: Date.now },
  time: { type: Number, default: Date.now },
  status: { type: Number, default: 1 },
  type: { type: Number, default: 1 },
  remindme: { type: Number, default: 300000 },
  phone: { type: String, required: true },
  todoId: { type: Number, unique: true },
});
module.exports = mongoose.model("Todos", Todos);
