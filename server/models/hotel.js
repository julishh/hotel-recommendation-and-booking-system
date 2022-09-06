const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const hotelSchema = new Schema(
  {
    title: {
      type: String,
      required: "tiltle is require",
    },
    content: {
      type: String,
      required: "content is require",
      maxlength: 500,
    },
    location: {
      type: String,
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
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    bed: {
      type: Number,
    },
    isbooked:{
      type: Boolean,
        default: false
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Hotel", hotelSchema);
