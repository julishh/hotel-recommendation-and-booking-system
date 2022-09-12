const express = require("express");
//const requireSignin=require("../middlewares/requireSignin")
const router = express.Router();

const func=require('../controllers/auth')



router.post('/register',func.register);
router.post("/login",func.login)

router.post('/register/newhotel',func.registerHotel)
router.post('/login/hotel',func.loginHotel)



module.exports = router;
