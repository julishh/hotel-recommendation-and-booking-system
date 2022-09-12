import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";

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
    
    hotel_name: "",
    phone_number: "",
    owner_name: "",
    location: "",
    email: "",
    password: "",
  });

  const {
    
    hotel_name,
    phone_number,
    owner_name,
    location,
    email,
    password,
  } = values;


  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);
  const { setUpRecaptha } = useUserAuth()
  const [error, setError]=useState("")
  
  const getOtp = async (e) => {
    e.preventDefault();
    console.log(phone_number);
    setError("");
    if (phone_number === "" || phone_number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(phone_number);
      setResult(response);
      console.log(response)
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      handleSubmit()
    
    } catch (err) {
      setError(err.message);
    }
  };


  const handleSubmit = async (e) => {
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/register/newhotel`,
        {
          
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
    <form >
      <div className="form-group">
        

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
      <div id="recaptcha-container"></div>
            <button disabled={ !phone_number} className="btn btn-primary" onClick={getOtp}> submit</button>
        

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

          <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>
        
        </div>
      </div>
    </>
  );
};

export default Hotelregister;
