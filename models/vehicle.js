const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: String,
  capacity: String,
  price: String,
  driverId: String,
  fleetId: String,
  available: String,
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
