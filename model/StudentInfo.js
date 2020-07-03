const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 6
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  isWeekEnd: {
    type: Boolean,
    default:false
  }, 
  date: {
    type: Date,
    default: Date.now
  }
});

const registrations = mongoose.model("registrations", registrationSchema);
module.exports = {
  Model: registrations
};
