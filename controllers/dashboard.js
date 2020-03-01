const mongoose = require("mongoose");
const User = require("../model/User").Model;

async function getProfiles(userId) {
  const profile = await User.find({ _id: userId }, { name: 1, email: 1 });
  return profile[0];
}

async function dashboard(req, res) {
  const userId = mongoose.Types.ObjectId(req.user._id);
  const profileData = await getProfiles(userId);
  return res.status(200).json({
    code: 200,
    data: {
      profile: profileData
    }
  });
}

module.exports = {
  dashboard
};
