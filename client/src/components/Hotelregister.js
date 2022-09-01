import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
//import Algoliaplaces from "algolia-places-react";
import { useSelector } from "react-redux";
import {registerHotel} from '../actions/hotel'
import { DatePicker, Select } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import ProfileNav from "./ProfileNav";

// const config={
//   appId:process.env.REACT_APP_ALGOILA_APP_ID,
//   apiKey:process.env.REACT_APP_ALGOILA_API_KEY,
//   language:'en',
//   countires:[]
// }
const { Option } = Select;
const Hotelregister = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [values, setValues] = useState({
    pan_number: "",
    hotel_name: "",
    phone_number: "",
    owner_name:"",
    location: "",
  });

  const { pan_number, hotel_name, phone_number, owner_name, location } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values)
    let hotelData = new FormData();
    hotelData.append("pan_number", pan_number);
    hotelData.append("hotel_name", hotel_name);
    hotelData.append("phone_number", phone_number);
    hotelData.append("owner_name",owner_name)
    hotelData.append("location", location);

    console.log("form",[...hotelData]);
    let res = await registerHotel(token, hotelData);
    console.log("hotel register res", res);
    toast("new hotel is registered");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  //   const handleImageChange = (e) => {
  //     setPreview(URL.createObjectURL(e.target.files[0]));
  //     setValues({ ...values, image: e.target.files[0] });
  //   };
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

        {/* <Algoliaplaces
       className="form-control ml-2 mr-2"
       placeholder="location"
       defaultValues={location}
       options={config}
       onChange={({suggestion})=>setValues({...values,location:suggestion.value})}

       style={{height:'50px'}} /> */}

        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="location"
          className="form-control m-2"
          value={location}
        ></input>
      </div>
      <button className="btn btn-outline-primary m-2">save</button>
    </form>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1> Register Hotel</h1>
      </div>
      <div className="container-fluid">
        <ProfileNav />
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelForm()}
          </div>
          <div className="col-md-2">
           
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotelregister;
