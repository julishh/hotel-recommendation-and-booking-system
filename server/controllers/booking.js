const Bookings = require("../models/bookings");
const Hotel=require("../models/hotel");
const { findById } = require("../models/user");

const confirmBooking = async (req, res) => {
  try {
    const { hotel, date } = req.body;
     const userId=req.params.userId
     const hotelId=req.params.hotelId
    let book = new Bookings(req.body);
    book.booking_id = Math.floor(Math.random() * 100 + 1);
    book.checkin = new Date(date.split(",")[0]);
    book.checkout = new Date(date.split(",")[1]);
    book.expireAt=new Date(date.split(",")[1])
    book.belongsTo = hotel;
    book.room_id=hotelId
    book.user=userId
    book.payment=req.body.total

    let dates=getDatesInRange(new Date(date.split(",")[0]),new Date(date.split(",")[1]))
    let bookingDates=await Hotel.findByIdAndUpdate(hotelId,{$push:{bookingDates:dates}},{new:true})
      console.log(bookingDates)
    await book.save((err,result)=>{
        if(err) {
            console.log("saving hotel error", err);
            res.status(400).send("error saving");
          }
          res.json(result);
    });
    console.log("booked", book);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};


const cancelBooking=async(req,res)=>{
  try{
  let room_id=req.body.room_id
  let booking_id=req.body.booking_id
  let user=req.body.user
  let checkin=req.body.checkin.substring(0,10)
  let checkout=req.body.checkout.substring(0,10)
  
  let dates=getDatesInRange(new Date(checkin),new Date(checkout))
  let bookedDates=await Hotel.findById(room_id).select("bookingDates").exec()

  console.log("dates",dates)
  bookedDates=bookedDates["bookingDates"]
  console.log("bookedDates",bookedDates)
// console.log(unique)
  let update=bookedDates.filter((val)=>dates.includes(val))
  
  let result=await Hotel.findByIdAndUpdate(room_id,{bookingDates:update},{
    new: true
  })
  res.json(result)
  }catch(err){
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }

}

//let c=a.filter((val )=>!b.includes(val ))

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

module.exports = { confirmBooking,cancelBooking};
