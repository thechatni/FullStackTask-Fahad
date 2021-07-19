const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  name: String,
  available: String,
});

module.exports = mongoose.model("Driver", driverSchema);
