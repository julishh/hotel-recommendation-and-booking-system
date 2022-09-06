const User= require('../models/user')
const RegisteredHotel=require("../models/registeredHotels")
const jwt=require('jsonwebtoken')


const register=async(req,res)=>{

try{
  console.log(req.body)
const {name,email,password}=req.body
if(!name) return res.status(400).send("name is required")
if(!password || password.length<4)
return res.status(400).send("password is required and should be more than 4 letter")

let userExist=await User.findOne({email}).exec()
if(userExist) return res.status(400).send("user already exist")

const user=new User(req.body)
  await user.save();
  console.log('user Created',user);
  return res.json({ok:true})
}
catch(err){
console.log("create user failed",err)
return res.status(400).send("error, Try again")
}

}

const registerHotel=async(req,res)=>{
  try{
    console.log(req.body)
    const {pan_number, hotel_name, phone_number, owner_name, location,email,password}=req.body
    if(!pan_number) return res.status(400).send("pan number is required")
    if(!hotel_name) return res.status(400).send("name of hotel is required")
    if(!phone_number) return res.status(400).send("phone number  is required")
    if(!owner_name) return res.status(400).send("owner name is required")
    if(!location) return res.status(400).send("location is required")

if(!password || password.length<4)
return res.status(400).send("password is required and should be more than 4 letter")

let hotelExist=await RegisteredHotel.findOne({email}).exec()
if(hotelExist) return res.status(400).send("user already exist")
const hotel=new RegisteredHotel(req.body)
  await hotel.save();
  console.log('hotel registered',hotel);
  return res.json({ok:true})
  }catch(err){
    console.log("create user failed",err)
    return res.status(400).send("error, Try again")
    }
}


const login=async(req,res)=>{
 // console.log(req.body)
  const {email,password}=req.body
  try{

    let user= await User.findOne({email}).exec()
    if(!user) return res.status(400).send('user dont exist')
    user.comparePassword(password,(err,match)=>{
      console.log("compare password in login",err)
      if(!match || err) return res.status(400).send("wrong password")
      //create a token then send as resposne to client
      let token=jwt.sign({_id:user._id},process.env.JWT_SECRETE,{expiresIn:'7d'})
      res.json({token,user:{
        _id:user._id,
        
        name:user.name,
        email:user.email,
        seller:user.isSeller,
      }})
    })

  }catch(err){
    console.log("login error",err)
    res.status(400).send('login failed')
  }
}

const loginHotel=async(req,res)=>{
  // console.log(req.body)
   const {email,password}=req.body
   try{
 
     let hotel= await RegisteredHotel.findOne({email}).exec()
     if(!hotel) return res.status(400).send('user dont exist')
     hotel.comparePassword(password,(err,match)=>{
       console.log("compare password in login",err)
       if(!match || err) return res.status(400).send("wrong password")
       //create a token then send as resposne to client
       let token=jwt.sign({_id:hotel._id},process.env.JWT_SECRETE,{expiresIn:'7d'})
       res.json({token,user:{
         _id:hotel._id,
         
         name:hotel.name,
         email:hotel.email,
         seller:hotel.isSeller,
       }})
     })
 
   }catch(err){
     console.log("login error",err)
     res.status(400).send('login failed')
   }
 }
module.exports={register,login,registerHotel,loginHotel}

