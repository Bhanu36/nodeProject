const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken');
const User = require('./../model/User')
const {registrationValidation,loginValidation} =require('./../validation.js')


router.post('/register', async (req, res) => {
 //validate the data before we make a user
   const {error} = registrationValidation(req.body)
   if(error)return res.status(400).send("error in input")

    // checking if user already exist 
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send("email already Exist")
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

//save user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    
    try {
        const savedUser = await user.save();
        res.send({user:user._id})
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/login',async(req,res)=>{
//validate the data before we make a user
    const {error} = loginValidation(req.body)
    if(error)return res.status(400).send("error in input")

    // checking if user email already exist 
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("email or password is wrong");
    //checking if password exist or not
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send("password wrong");


    //create and assign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)

});



module.exports = router;