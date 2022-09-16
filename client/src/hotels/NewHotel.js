import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
//import Algoliaplaces from "algolia-places-react";
import { useSelector } from "react-redux";

import { DatePicker, Select } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

import { createHotel } from "../actions/hotel";


const { Option } = Select;
const NewHotel = () => {
const {auth}=useSelector((state)=>({...state}))
const {token,user}=auth

  const [values, setValues] = useState({
    room_no: "",
    bed: "",
    max_occupancy:"",
    price: "",
    content: "",
    address: "",
    image: "",
    
  });

  const { room_no, content, address, image, price, bed, max_occupancy } = values;

  const [preview, setPreview] = useState(
    "https:/abc.com/50x50.png?text=PREVIEW"
  );

  const handleSubmit = async(e) => {

    e.preventDefault()
    //console.log(values)
  let hotelData=new FormData()
  hotelData.append("room_no",room_no);
  hotelData.append("content",content);
  hotelData.append("address",address);
  hotelData.append("price",price);
  hotelData.append("bed",bed);
  hotelData.append("max_occupancy",max_occupancy)
  hotelData.append("hotel_name",user.name)
  image && hotelData.append("image",image);

 
  console.log([...hotelData])
  let res=await createHotel(token,hotelData)
  console.log("hote create res",res)
  toast("new hotel is posted")
  setTimeout(()=>{window.location.reload()},1000)
  };


  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            
            hidden
          ></input>
        </label>
        <input
          type="number"
          name="room_no"
          onChange={handleChange}
          placeholder="Room NO:"
          className="form-control m-2"
          value={room_no}
        ></input>
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="content"
          className="form-control m-2"
          value={content}
        />
       
        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="adress"
          className="form-control m-2"
          value={address}
        ></input>

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="price"
          className="form-control m-2"
          value={price}
        ></input>
        
        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="number of beds"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
        </Select>
        <Select
          onChange={(value) => setValues({ ...values, max_occupancy: value })}
          className="w-100 m-2"
          size="large"
          placeholder="number of guest"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
        </Select>

        {/* <DatePicker
          placeholder="from date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
        <DatePicker
          placeholder="to date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate=
        {(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        /> */}
        
      </div>
      <button className="btn btn-success w-50 m-2">save</button>
    </form>
  );

  return (
    <>
      <div className="container-fluid navimage p-5 text-center">
        <h1> NewHotel</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelForm()}
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
