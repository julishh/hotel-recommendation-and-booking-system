import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;

const PaymentInfo = (props) => {

  
  const [date, setDate] = useState([moment().format('l'),moment().add(1,'days').format('l')]);
  const [totalPrice,setTotalPrice]=useState("")



  const { auth } = useSelector((state) => ({ ...state }));
  const history = useNavigate();


  useEffect(()=>{
    console.log(date)
  })
  const handleClick = async (e) => {
    e.preventDefault();
    if (!auth) {
      history("/login");
    }

    history(`/continue-booking/${props.hotelId}?date=${date}&room=${"1"}&total=${totalPrice}`);
 

  };

  

  const calculatePrice = () => {
   return <p>calcute prica hera</p>
  };

  return (
    <>
      <div className=" container-fluid text-center bg-red h-100 w-100 border border-dark ">
        <div className="bg-info">
          <h1>RS {props.price}</h1>
          <p>(per day) </p>
        </div>

        <RangePicker
          className="w-100 "
          onChange={(value, dateString) => setDate(dateString)}
          defaultValue={[moment(),moment().add(1,'days')]}
          
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
        <br />
        <div className="row p-5">
          <div className="col-md-3 ">
            Total price
            <br></br>
            <p>(incl. of all taxes) </p>
          </div>
          <div className="col-md-3">{calculatePrice()}</div>
        </div>
        <hr />
        <span className="mb-1">
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
