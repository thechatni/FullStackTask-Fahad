const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fleetSchema = new Schema({
  name: String,
  supplierId: String,
});

module.exports = mongoose.model("Fleet", fleetSchema);
