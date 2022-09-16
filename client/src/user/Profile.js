import React from "react";
import ProfileNav from "../components/ProfileNav";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";
import "../auth/Login.css";
import UserRoomBooking from "../components/cards/UserRoomBooking";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [bookedHotels, setBookedHotels] = useState([]);
  const { user } = auth;
  const userId = user._id;

  
 
  
  useEffect(() => {
    loadBookedsHotels();
  }, []);

  const loadBookedsHotels = async () => {
    let { data } = await axios.get(
      `${process.env.REACT_APP_API}/booked-hotels/${userId}`,
      {
        headers: { Authorization: `Bearer ${auth.token}` },
      }
    );
    setBookedHotels(data);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-7 mt-1">
          <div className="row">
           {bookedHotels.map((h)=>(

              <UserRoomBooking  h={h}/>
            ))
           }
            
          </div>
        </div>

        <div className="col-md-5 mt-1 p-3">
          <UserInfo />
        </div>
      </div>
    </>
  );
};

export default Profile;
