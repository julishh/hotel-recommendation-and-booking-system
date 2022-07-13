const User= require('../models/user')


const register=async(req,res)=>{
console.log(req.body)
const {name,email,password}=req.body
if(!name) return res.status(400).send("name is required")
if(!password || password.length<4)
return res.status(400).send("password is required and should be more than 4 letter")

let userExist=await User.findOne({email}).exec()
if(userExist) return res.status(400).send("user already exist")

const user=new User(req.body)
try{
  await user.save();
  console.log('user Created',user);
  return res.json({ok:true})
}
catch(err){
console.log("create user failed",err)
return res.status(400).send("error, Try again")
}

}
module.exports={register}

