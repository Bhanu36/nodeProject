const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  authToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: Date.now(),
  },
});

const userSession = mongoose.model("UserSession", UserSessionSchema);
module.exports = {
  Model: userSession
};
