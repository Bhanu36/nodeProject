const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {ObjectId} = mongoose.Types;
const User = require("../model/User").Model;
const UserSession = require("../model/UserSession").Model;
const token = process.env.TOKEN_SECRET

async function getProfiles(userId) {
  const profile = await User.find({ _id: userId });
  return { userDetails: profile[0] };
}

async function getUserDetail(req, res) {
  try {
    const userId = ObjectId(req.params.id);
    const { userDetails } = await getProfiles(userId);
    return res.status(200).json({
      code: 200,
      data: {
        profile: userDetails,
      },
    });
  } catch (err) {
    return res.status(400).json({
      code: 200,
      error: err,
    });
  }
}

const logout = async (req, res) => {
  try {
    const { email, authKey } = req.body;
    const sessionEnd = await UserSession.updateOne(
      { email: email, authToken: authKey },
      { $set: { updatedAt: new Date(),authToken:"" } }
    )
      .then(data => {
        return res.status(200).json({
          code: 200,
          data: data
        });
      })
      .catch(err => {
        res.status(200).json({
          code: 200,
          message: "user not loggedOut"
        });
      });
  } catch (err) {
    return res.status(200).json({
      code: 200,
      message:`error in logout${err}`
    });
  }
};

const getAlluserLIst = async (req, res) => {
  try {
    //user those sessions were not yet completed;
    const date = new Date();
    const userData = await UserSession.find(
      { expiresAt: { $lte: date } },
      { userId: 1, authToken: 1, expiresAt: 1, email: 1 }
    );
    return res.status(200).json({
      code: 200,
      data: userData,
    });
  } catch (err) {
    return res.status(400).json({
      code: 200,
      message: err,
    });
  }
};

module.exports = {
  getUserDetail,
  getAlluserLIst,
  logout,
};
