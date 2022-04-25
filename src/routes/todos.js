const router = require("express").Router();
const authCheck = require("../middlewares/auth");
const {
  createNewItem,
  deleteItem,
  updateItem,
} = require("../controller/controller");

router.post("/create", authCheck, (req, res) => {
  createNewItem(req, res);
});

router.post("/delete", authCheck, (req, res) => {
  createNewItem(req, res);
});

router.post("/update", authCheck, (req, res) => {
  createNewItem(req, res);
});

module.exports = router;
