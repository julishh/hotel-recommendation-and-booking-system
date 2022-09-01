
const User=require("../models/user")
const RegisteredHotel=require("../models/registeredHotels")

const sellerInfo=async(req,res)=>{
    console.log("seller info")
    
    let seller= await User.findById(req.user._id).select('-password').exec()
    
    res.send(seller)
}

module.exports={sellerInfo}