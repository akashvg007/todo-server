const jwt = require("jsonwebtoken");
const sendResponse = require("../Response/Response");
const User = require("../models/user");
const Todos = require("../models/todos");
const helperAuth = require("../helper/helper_Auth");

const { ACCESS_TOKEN_SECRED, REFRESH_TOKEN } = process.env;

const generateAccessToken = (user) => {
  const data = typeof user === "object" ? user : { user };
  return jwt.sign(data, ACCESS_TOKEN_SECRED, { expiresIn: "365d" });
};

const register = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.find({ phone });
    console.log("result is ", user, phone);
    if (!user) await User.create({ name, phone });
    const data = helperAuth.sendOTP(res, phone);
    sendResponse(false, "OTP send", res, 200, data);
  } catch (err) {
    console.log("register::catch", err.message);
    sendResponse(true, 104, res, 500);
  }
};

const verify = async (req, res) => {
  try {
    const { otp, phone } = req.body;
    const payload = { code: otp, to: phone };
    const data = await helperAuth.verifyOTP(res, payload);
    //bypassing the otp
    if (otp !== "0000") {
      if (!data || !data.status || data.status !== "approved") {
        sendResponse(true, 105, res, 400);
        return;
      }
    }
    const accessToken = generateAccessToken(phone);
    const refreshToken = jwt.sign(phone, REFRESH_TOKEN);
    const query = { phone };
    const newData = { active: true, refreshToken };
    const upsert = { upsert: true };
    await User.findOneAndUpdate(query, newData, upsert);
    console.log("tokens", accessToken, refreshToken);
    const token = { accessToken, refreshToken };
    sendResponse(false, "Logged in successful", res, 200, token);
  } catch (err) {
    console.log("verify::catch", err.message);
    sendResponse(true, 104, res, 500);
  }
};

const updateProfilePic = async (req, url) => {
  try {
    const phone = req.user;
    const query = { phone };
    const newData = { profilePic: url };
    const upsert = { upsert: true };
    await User.findOneAndUpdate(query, newData, upsert);
  } catch (err) {
    console.log("updateProfilePic::catch", err.message);
    throw err;
  }
};
const removeProfilePic = async (req, res) => {
  try {
    const phone = req.user;
    const query = { phone };
    const newData = { profilePic: "" };
    const upsert = { upsert: true };
    await User.findOneAndUpdate(query, newData, upsert);
    sendResponse(false, "Success", res, 200);
  } catch (err) {
    console.log("removeProfilePic::catch", err.message);
    throw err;
  }
};

const createNewItem = async (req, res) => {
  try {
    const phone = req.user;
    // const phone = "+918848275018";
    const { msg, time, type, remindme } = req.body;
    const count = await Todos.find({});
    console.log("count is ", count);
    const todoId = parseInt(count.length) + 1;
    const newData = { msg, time, type, remindme, phone, todoId };
    await Todos.create(newData);
    sendResponse(false, "Success", res, 200);
  } catch (err) {
    console.log("createNewItem::catch", err.message);
    throw err;
  }
};

const deleteItem = async (req, res) => {
  try {
    const phone = req.user;
    const query = { phone };
    const newData = { status: 3 };
    const upsert = { upsert: true };
    await Todos.findOneAndUpdate(query, newData, upsert);
  } catch (err) {
    console.log("deleteItem::catch", err.message);
    throw err;
  }
};

const updateItem = async (req, res) => {
  try {
    const phone = req.user;
    const query = { phone };
    const { msg, time, type, remindme } = req.body;
    const newData = { status: 2, msg, time, type, remindme };
    const upsert = { upsert: true };
    await Todos.findOneAndUpdate(query, newData, upsert);
  } catch (err) {
    console.log("deleteItem::catch", err.message);
    throw err;
  }
};

module.exports = {
  register,
  verify,
  updateProfilePic,
  removeProfilePic,
  createNewItem,
  deleteItem,
  updateItem,
};
