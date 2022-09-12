const User=require("../models/user")
const jwt = require("jsonwebtoken");

const userInfo = async (req, res) => {
    console.log(req.params.userId);
    let user = await User.findById(req.params.userId).select("-password").exec();
    console.log(user)
    res.json(user)
    
  };

  module.exports={userInfo}