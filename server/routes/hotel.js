const express = require("express");
const formidable = require('express-formidable')
const requireSignin= require('../middlewares/requireSignin')

const router = express.Router();

const func=require('../controllers/hotel')

router.post("/create-hotel",requireSignin,formidable(),func.createHotel)

router.get("/hotels",func.hotels)

router.get('/hotels/image/:hotelID',func.image)

module.exports=router
