import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { PresetColorTypes } from "antd/lib/_util/colors";
const UserRoomBooking = (props) => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    loadSellerhotel();
  }, []);

  const loadSellerhotel = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_API}/hotel/${props.h.room_id}`
    );

    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotels/image/${res.data._id}`);
  };

  const cancelBooking = async () => {
    console.log(props.h.room_id, props.h.booking_id, props.h.user);
    let res = await axios.post(
      `${process.env.REACT_APP_API}/cancel-booking/${props.h.room_id}/${props.h.booking_id}/${props.h.user}`,
      {
        room_id:props.h.room_id,
        booking_id:props.h.booking_id,
        user:props.h.user,
        checkin:props.h.checkin,
        checkout:props.h.checkout
      }
    );
    console.log("booking cancelled===>", res);
      toast.success("booking cancelled");
  };

  const bookingDetails = () => {
    return (
      <div class="card bt-3">
        <div class="card-header">
          <h5>Booking Id: {props.h.booking_id}</h5>
        </div>
        <div class="card-body">
          <h6 className="card-title alert alert-info ">
            Checkin Date : {props.h.checkin.split("T")[0]}
          </h6>
          <h6 className="card-title alert alert-info ">
            Checkout Date : {props.h.checkout.split("T")[0]}
          </h6>
          <div className="text-secondary">
            <h6>payment : {props.h.payment}</h6>
          </div>

          <div className="text-secondary">
            <h6>validity : {props.h.validity}</h6>
          </div>

          {props.h.validity && (
            <div className=" row d-flex justify-content-end  h4">
              <button className="btn btn-success  col-md-4  w-25 mx-auto">
                Edit
              </button>
              <button
                className="btn btn-danger col-md-4 w-25 mx-auto"
                onClick={cancelBooking}
              >
                Cancel booking
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="card m-3">
        <div className="row">
          <div className="col-md-4">
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotels/image/${hotel._id}`}
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+recomendation"
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            )}
          </div>

          <div className="col-md-8">
            <h3 className="card-title">
              {hotel.hotel_name}
              <span className="float-right text-primary">
                NRS {hotel.price}
              </span>
            </h3>

            <p className="alert alert-info">{hotel.address}</p>
            <p className="card-text">{`${hotel.content}`}</p>
          </div>
        </div>

        {bookingDetails()}
      </div>
    </>
  );
};

export default UserRoomBooking;
