const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


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
    email:{
      type:String,
      trim:true,
      required:"Email is required",
      unique:true

      
  },

    password:{

      type:String,
      trim:true,
      required:"password is required",

  },

    isSeller:{
      type:Boolean,
      default:true,
  },

  },
  { timestamps: true }
);

registeredHotelSchema.pre("save",function(next){
  let hotel=this;
  if(hotel.isModified('password')){
      return bcrypt.hash(hotel.password,8,function(err,hash){
          if(err){
              console.log('BCRYPT HASH ERR',err);
              return next(err)
          }
          hotel.password=hash;
          return next()
      })
  }
  else{
      return next();
  }
})


registeredHotelSchema.methods.comparePassword=function(password,next){
  bcrypt.compare(password,this.password,function(err,match){
      if(err){
          console.log("compare password err",err)
          return next(err,false)
      }

      console.log("match paasword",match)
      return next(null,match)
  })
}

module.exports = mongoose.model("RegisteredHotel", registeredHotelSchema);
