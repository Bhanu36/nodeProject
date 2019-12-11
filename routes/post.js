const router = require('express').Router();
const verify =  require('./verifyToken')
router.get('/',verify,(req,res)=>{
    res.json({title:"data you shoun't access"})
})











module.exports = router;