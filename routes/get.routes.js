const router = require('express').Router();
const {auth} =  require('../middleware/authCheck.service')
const { dashboard} = require('../controllers/dashboard')

router.get('/dashboard',auth,dashboard)











module.exports = router;