const authRouter = require("express").Router();
require("dotenv").config({ path: ".env" });
const { register, verify } = require("../controller/controller");

authRouter.post("/register", (req, res) => {
  register(req, res);
});

authRouter.post("/verify", (req, res) => {
  verify(req, res);
});

module.exports = authRouter;
