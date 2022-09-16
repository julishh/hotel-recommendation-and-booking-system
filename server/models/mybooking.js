const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const mybookingSchema= new Schema({
    user_id:{
      type:ObjectId,
      ref:"User"
    },
    room_id:{
        type:ObjectId,
        ref:"Hotel"
    },
    booking_id:{
       type:ObjectId,
       ref:"Booking"
    }
})

module.exports=mongoose.model("MyBooking",mybookingSchema)