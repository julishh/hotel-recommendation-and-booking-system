const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const  RegisteredHotel=require('./registeredHotels')

const hotelSchema = new Schema(
  {
    hotel_name:{type:String,
      required:'name is required'
    },
    room_no: {
      type: Number,
      required: "room number is require",
    },
    content: {
      type: String,
      required: "content is require",
      maxlength: 500,
    },
    address:{
      type:String,
    },
    
    
    price: {
      type: Number,
      required: "price is require",
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "RegisteredHotel",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    
    bed: {
      type: Number,
    },
    max_occupancy: {
      type: Number,
    },
    isavailable:{
      type: Boolean,
        default: false
    },

    bookingDates:[{
        type:Date,
    }]
  },
  { timestamps: true }
);




module.exports= mongoose.model("Hotel", hotelSchema);
