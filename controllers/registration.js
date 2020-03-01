const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User").Model;
const UserSession = require("../model/UserSession").Model;
const {
  registrationValidation,
  loginValidation
} = require("../services/validations.service");

const register = async (req, res) => {
  try {
    console.log("@@@@@@@@@@@@@@@2");
    //validate the data before we make a user
    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).send("error in input");

    // checking if user already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(400)
        .json({ code: 200, message: "email already Exist" });
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //save user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    const responseObject = {
      code: 200,
      status: "success",
      data: savedUser
    };

    return res.send(responseObject);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    //validate the data before we make a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send("error in input");

    // checking if user email already exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("email or password is wrong");
    //checking if password exist or not
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("password wrong");

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    const sessionUser = new UserSession({
      email: req.body.email,
      password: req.body.password,
      authToken: token,
      date: Date.now()
    });
    const saveUserSession = await sessionUser.save();
    const responseObject = {
      code: 200,
      message: "logged In successfully",
      data: {
        userId: user._id,
        token: token
      }
    };
    return res.json(responseObject);
  } catch (err) {
    return res.status(400).send(err);
  }
};

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

module.exports = {
  register,
  login,
  logout
};
