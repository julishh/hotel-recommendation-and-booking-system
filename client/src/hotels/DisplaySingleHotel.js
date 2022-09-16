import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PaymentInfo from "../components/booking/PaymentInfo";

import { useSelector } from "react-redux";
const DisplaySingleHotel = () => {
  const hotelId = useParams().h_id;
  console.log(hotelId);

  const { auth } = useSelector((state) => ({ ...state }));

  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    loadSellerhotel();
  }, []);

  const loadSellerhotel = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);

    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotels/image/${res.data._id}`);
    console.log(hotel);
  };

  const roomCard = () => {
    return (
      <div className="card">
      
        <div className="card-body">
          <h5 className="card-title">{hotel.hotel_name}</h5>
          <p className="alert alert-info w-50">{hotel.address}</p>
          <p className="card-text">{hotel.content}</p>
          <h6 className="text-muted">No. of bed: {hotel.bed}</h6>
          <h6 className="text-muted">no.of guest: {hotel.max_occupancy}</h6>
        </div>
      </div>
    );
  };
  return (
    <>
    <div className="row">
    <img
          className="card-img-top "
          width="auto"
          height="500"
          src={image}
          alt={hotel.title}
        />
    </div>
      <div
        className="row"
        
      >
        <div className="col-md-7 mt-1">{roomCard()}</div>

        <div
          className="col-md-5 mt-1" 
          
        >
          <PaymentInfo price={hotel.price} hotelId={hotelId} hotel={hotel} />
        </div>
      </div>

      {/* <div classNameName="row">
        <div className="col-md-7 mt-1">this is it </div>

          <div classNameName="col-md-4 ">
            <PaymentInfo price={hotel.price} hotelId={hotelId} hotel={hotel} />
          </div>
        </div> */}
    </>
  );
};

export default DisplaySingleHotel;
