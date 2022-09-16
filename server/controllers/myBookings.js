const Bookings = require("../models/bookings");
const Hotel=require("../models/hotel")
const MyBooking=require("../models/mybooking")

const userBookings=async(req,res)=>{
try{

    let all=await Bookings.find({user:req.user._id}).exec()
    
    
    
    console.log("all info")
    res.json(all)
}catch(err){
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
}

}





module.exports = { userBookings };
