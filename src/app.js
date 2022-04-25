const express = require("express");
require("dotenv").config({ path: ".env" });
const cors = require("cors");
const db = require("mongoose");
const user = require("./routes/todos");
const authentication = require("./routes/authentication");

const app = express();
const port = process.env.PORT || 3000;

// connect db
const DB =
  "mongodb+srv://root:root@mallucoder.fhzzu.mongodb.net/my-todo?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
db.connect(DB, options)
  .then(() => console.log("connection successfuly"))
  .catch((err) => console.log("connection failed", err));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//route middleware
app.use("/todos", user);
app.use("/auth", authentication);

// routes
app.get("/", (req, res) => {
  res.send("welcome MyTodo server");
});

// server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
