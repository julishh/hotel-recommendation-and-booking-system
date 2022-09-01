const express = require("express");
const formidable = require('express-formidable')
const requireSignin= require('../middlewares/requireSignin')

const router = express.Router();

const seller=require('../controllers/seller')
const func=require('../controllers/hotel')

router.post("/create-hotel",requireSignin,formidable(),func.createHotel)
router.post("/register-hotel",requireSignin,formidable(),func.registerHotel)

router.get("/hotels",func.hotels)

router.get('/hotels/image/:hotelID',func.image)

router.get('/seller-hotels',requireSignin, func.sellerHotels)
router.get('/hotel/:hotelId', func.read)
router.get('/sellerinfo',requireSignin,seller.sellerInfo)
router.put('/update-hotel/:hotelId',requireSignin, formidable(),func.update)
router.post('/search-listings',func.searchListing)
module.exports=router
