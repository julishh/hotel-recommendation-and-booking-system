const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const mapSchema=new Schema(
    {
        longitutude:{
            type:Float,
        },
        latitude:{
            type:float
        }
    }
)