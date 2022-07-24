const Hotel = require("../models/hotel");
const fs = require("fs");

const createHotel = async (req, res) => {
  // console.log("req fields",req.fields)
  // console.log("req files",req.files)

  try {
    let fields = req.fields;
    let files = req.files;
    console.log(files.image.contentType);

    let hotel = new Hotel(fields);
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
      hotel.save((err, result) => {
        if (err) {
          console.log("saving hotel error", err);
          res.status(400).send("error saving");
        }
        res.json(result);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const hotels = async (req, res) => {
  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  res.json(all);
};

const image=async(req,res)=>{
  let hotel=await Hotel.findById(req.params.hotelID).exec()
  if(hotel && hotel.image && hotel.image.data !==null){
    res.set('Content-Type',hotel.image.contentType)
    return res.send(hotel.image.data)
  }
  else{
     res.status(400).send("image dont found")
  }
}

module.exports = { createHotel, hotels,image };
