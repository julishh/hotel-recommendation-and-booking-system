const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userInfo = async (req, res) => {
  console.log(req.params.userId);
  let user = await User.findById(req.params.userId).select("-password").exec();
  console.log(user);
  res.json(user);
};

const userUpdate = async (req, res) => {
  try{
    let updated = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    }).exec();
    res.json(updated)
  }catch(err){
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
  
};

module.exports = { userInfo, userUpdate };
