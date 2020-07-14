const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User").Model;
const UserSession = require("../model/UserSession").Model;
const token = process.env.TOKEN_SECRET
const {
  registrationValidation,
  loginValidation
} = require("../services/validations.service");
const client = require("../services/redisConnection.service");

const register = async (req, res) => {
  try {
    //validate the data before we make a user
    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).send({error:"error in input"});

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
    return res.status(400).send({
      code:200,
      message:err
    });
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
    const timeLimit = 60 * 3*1000; // 3mins
    const expires = Math.floor(Date.now()) + timeLimit;
    const token = jwt.sign({ _id: user._id,expiresAt: new Date(expires) }, process.env.TOKEN_SECRET);
    const sessionObj = {
      userId: user.id,
      email: req.body.email,
      password: req.body.password,
      authToken: token,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(expires),
    }
    const sessionUser = new UserSession(sessionObj);
    const saveUserSession = await sessionUser.save();
    const redisSave = await client.hmset("tokens", sessionObj); //hget frameworks authToken
    const responseObject = {
      code: 200,
      message: "logged In successfully",
      data: {
        userId: user.id,
        email: req.body.email,
        password: req.body.password,
        authToken: token,
        createdAt: Date.now(),
        expiresAt: expires,
      },
    };
    return res.json(responseObject);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

module.exports = {
  register,
  login
};
