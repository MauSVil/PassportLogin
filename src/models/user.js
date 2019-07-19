const mongoose = require("mongoose");
const bycrypt = require("bcrypt-nodejs");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String
});

userSchema.methods.encryptPassword = password => {
  return bycrypt.hashSync(password, bycrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password) {
  return bycrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", userSchema);
