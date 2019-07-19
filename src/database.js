const mongoose = require("mongoose");
const { mongodb } = require("./keys");

mongoose
  .connect(mongodb.URI, { useNewUrlParser: true })
  .then(db => console.log("DataBase is connected"))
  .catch(err => console.error(err));
