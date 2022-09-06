import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
// //import Algoliaplaces from "algolia-places-react";
// import { useSelector } from "react-redux";
// import {registerHotel} from '../actions/hotel'
// import { DatePicker, Select } from "antd";
// import moment from "moment";
// import "antd/dist/antd.css";
// import ProfileNav from "./ProfileNav";

// const { Option } = Select;
// const Hotelregister = () => {
//   const { auth } = useSelector((state) => ({ ...state }));
//   const { token } = auth;



const Hotelregister = () => {
  const history = useNavigate();

  const [values, setValues] = useState({
    pan_number: "",
    hotel_name: "",
    phone_number: "",
    owner_name: "",
    location: "",
    email: "",
    password: "",
  });

  const {
    pan_number,
    hotel_name,
    phone_number,
    owner_name,
    location,
    email,
    password,
  } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/register/newhotel`,
        {
          pan_number,
          hotel_name,
          phone_number,
          owner_name,
          location,
          password,
          email,
        }
      );

      console.log("register hotel===>", res);
      toast.success("registering sucess,plase login");
      history("/login/hotel");
    } catch (err) {
      console.log("server error====>", err);
      if (err.response.status == 400) toast.error(err.response.data);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="number"
          name="pan_number"
          onChange={handleChange}
          placeholder="PAN Number"
          className="form-control m-2"
          value={pan_number}
        ></input>

        <input
          type="text"
          name="owner_name"
          onChange={handleChange}
          placeholder="owner_name"
          className="form-control m-2"
          value={owner_name}
        ></input>

        <input
          type="text"
          name="hotel_name"
          onChange={handleChange}
          placeholder="Hotel Name"
          className="form-control m-2"
          value={hotel_name}
        ></input>

        <input
          type="tel"
          name="phone_number"
          onChange={handleChange}
          placeholder="Phone Number"
          className="form-control m-2"
          value={phone_number}
        ></input>

        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="location"
          className="form-control m-2"
          value={location}
        ></input>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
          className="form-control m-2"
          value={password}
        ></input>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="email"
          className="form-control m-2"
          value={email}
        ></input>
      </div>
      <button className="btn btn-outline-primary m-2">save</button>
      <Link to="/register">
        <button className="btn btn-outline-primary m-2">
          Register as customer
        </button>
      </Link>
    </form>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1> Register Hotel</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelForm()}
          </div>

          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default Hotelregister;
