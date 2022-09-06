import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;

const PaymentInfo = (props) => {
  const [date, setDate] = useState("");

  const { auth } = useSelector((state) => ({ ...state }));
  const history = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (!auth) {
      history("/login");
    }
  };

  const calculatePrice=()=>{
    return <h1>cakulate price</h1>
  }

  return (
    <>
      <div className=" container-fluid text-center bg-red h-100 w-100 border border-dark ">
        <div  className="bg-info">

        <h1>RS {props.price}</h1>
        <p>(per day) </p>
        </div>
        

        <RangePicker
        
          className="w-100 "
          onChange={(value, dateString) => setDate(dateString)}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
        <br />
        <div className="row p-5" >
          <div className="col-md-3 ">
            Total price
            <br></br>
            <p>(incl. of all taxes) </p>
          </div>
          <div className="col-md-3">{calculatePrice()}</div>
        </div>
        <hr />
        <span  className="mb-1">
        <button
          className="btn btn-block btn-lg btn-primary  "
          onClick={handleClick}
        >
          {auth && auth.token ? "Book Now" : "Login to Book"}
        </button>
        </span>
      </div>
    </>
  );
};

export default PaymentInfo;
