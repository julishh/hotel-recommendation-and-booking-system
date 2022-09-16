import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Hotelregister.css";
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

  const { hotel_name, phone_number, owner_name, location, email, password } =
    values;

  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);
  const { setUpRecaptha } = useUserAuth();
  const [error, setError] = useState("");
  const [showButton, setshowButton] = useState(true);

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(phone_number);
    setError("");
    if (phone_number === "" || phone_number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(phone_number);
      setResult(response);
      console.log(response);
      setFlag(true);
      setshowButton(false)
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
      handleSubmit();
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
    <div className="login-body">
      <div className="login ">
      <h1 className="text-center"> Hotel Register</h1>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="owner_name"
              onChange={handleChange}
              placeholder="Owner Name"
              className="form-control m-2"
              value={owner_name}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="hotel_name"
              onChange={handleChange}
              placeholder="Hotel Name"
              className="form-control m-2"
              value={hotel_name}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone_number"
              onChange={handleChange}
              placeholder="Phone Number"
              className="form-control m-2"
              value={phone_number}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="location"
              onChange={handleChange}
              placeholder="location"
              className="form-control m-2"
              value={location}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="email"
              className="form-control m-2"
              value={email}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="password"
              className="form-control m-2"
              value={password}
            ></input>
          </div>
          <div className="form-group">
          <div id="recaptcha-container"></div>
          </div>
          {showButton && <button
            disabled={!phone_number}
            className="btn btn-success w-100"
            onClick={getOtp}
          >
            
            submit
          </button>}
          </form>

          <Form
            onSubmit={verifyOtp}
            style={{ display: flag ? "block" : "none" }}
          >
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
             {showButton && <div>
          <p className="w-100 text-center">&mdash; Or Register In as customer&mdash;</p>
            <div className="social d-flex text-center">
              <Link to="/register" className="btn btn-secondary w-100">
              Customer Signin
              
              </Link>
              
            </div>
            </div>}
          {/* <Link to="/register">
            <button className="btn btn-outline-primary m-2">
              Register as customer
            </button>
          </Link> */}
        
      </div>
    </div>
  );

  return (
    <>
      
            {hotelForm()}
          

          {/* <Form
            onSubmit={verifyOtp}
            style={{ display: flag ? "block" : "none" }}
          >
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
          </Form> */}
        
    </>
  );
};

export default Hotelregister;
