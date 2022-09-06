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

 

  const getSessionId = async (token, hotelId) => {
    await axios.post(
      `${process.env.REACT_APP_API}/stripe-session-id`,
      {
        hotelId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <>
      <div className="container-fluid navimage p-5 text-center">
        <h1>Hotel Booking App</h1>
      </div>
      
      <div className="container-fluid">
      <div>
            <br></br>
            <img
              src={image}
              alt={hotel.title}
              className="img img-fluid m-2"
            ></img>
          </div>
        <div className="row">
          
          <div className="col-md-6">
            <br></br>
            <h1>{hotel.title}</h1>
            <br />
            <h3>Description</h3>
            <h4>Location</h4>
            <p className="alert alert-info">{hotel.location}</p>
            <b>{hotel.content}</b>

            
            
            
          </div>

          <div className="col-md-6 ">
            <PaymentInfo price={hotel.price} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplaySingleHotel;
