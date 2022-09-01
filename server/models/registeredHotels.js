const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const { Schema } = mongoose;

const registeredHotelSchema = new Schema(
  {
    owner_name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    hotel_name: {
      type: String,
      trim: true,
      required: "Hotel Name is required",
      
    },
    pan_number: {
      type: Number,
      trim: true,
      required: "Pan number  is required",
      unique: true,
    },
    phone_number: {
      type: Number,
      trim: true,
      required: "Phone number  is required",
    },
    location: {
      type: String,
    },

    registeredBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegisteredHotel", registeredHotelSchema);
