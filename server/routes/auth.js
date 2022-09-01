const express = require("express");

const router = express.Router();

const func=require('../controllers/auth')



router.post('/register',func.register);
router.post("/login",func.login)



module.exports = router;
