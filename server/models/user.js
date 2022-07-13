const bcrypt = require("bcrypt");
const mongoose=require('mongoose')

const {Schema}=mongoose

const userSchema=new Schema(
    {
        name:{
            type:String,
            trim:true,
            required:"Name is required",

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
        stripe_account_id:'',
        stripe_seller:{},
        stripeSession:{},
    },{timestamps:true}
)



userSchema.pre("save",function(next){
    let user=this;
    if(user.isModified('password')){
        return bcrypt.hash(user.password,8,function(err,hash){
            if(err){
                console.log('BCRYPT HASH ERR',err);
                return next(err)
            }
            user.password=hash;
            return next()
        })
    }
    else{
        return next();
    }
})


module.exports=mongoose.model("User",userSchema)