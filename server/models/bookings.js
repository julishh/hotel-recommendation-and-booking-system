const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const bookingSchema = new Schema(
  {
    booking_id: {
      type: Number,
      
    },
    room_id:{
      type:String,
    },
    user:{
      type:ObjectId,
        ref:"User"
    },
    room_no:{
      type:Number,
      required:"yes"
    },
   
    name: {
      type: String,
      required: "yes",
    },
    email:{
      type:String
    },

    phone: {
      type: Number,
      trim: true,
      required: "Phone number  is required",
    },

    payment: {
      type: String,
      trim: true,
     
    },

    checkin: Date,
    checkout:Date,
    expireAt:Date,

    validity:{
        type:Boolean ,
        default:true
    },

    

    belongsTo:{
        type:ObjectId,
        ref:"RegisterdHotel"
    },

  },
  { timestamps: true }
);


module.exports=mongoose.model("Bookings",bookingSchema)
