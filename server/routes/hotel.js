const express = require("express");
const formidable = require('express-formidable')
const requireSignin= require('../middlewares/requireSignin')

const router = express.Router();

const seller=require('../controllers/seller')
const func=require('../controllers/hotel')
const cProfile=require('../controllers/customerProfile')
const booking=require('../controllers/booking')
const mybooking=require('../controllers/myBookings')

router.post("/create-hotel",requireSignin,formidable(),func.createHotel)
router.post("/register-hotel",requireSignin,formidable(),func.registerHotel)

router.get("/hotels",func.hotels)

router.get('/hotels/image/:hotelID',func.image)

router.get('/seller-hotels',requireSignin, func.sellerHotels)
router.get('/hotel/:hotelId', func.read)
router.get('/sellerinfo',requireSignin,seller.sellerInfo)
router.put('/update-hotel/:hotelId',requireSignin, formidable(),func.update)
router.post('/search-listings',func.searchListing)

router.get('/user/:userId',cProfile.userInfo)

router.post('/confirm-booking/:userId/:hotelId',booking.confirmBooking)
router.get('/booked-hotels/:userId',requireSignin,mybooking.userBookings)
router.post('/cancel-booking/:room_id/:booking_id/:user',booking.cancelBooking)
router.post('/update-user/:userId',cProfile.userUpdate)
module.exports=router
