import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;

const PaymentInfo = (props) => {
  const [dateRange, setDateRange] = useState([
    moment().format("l"),
    moment().add(1, "days").format("l"),
  ]);
  const [totalPrice, setTotalPrice] = useState();
  const [flag,setFlag]=useState(false)

  const { auth } = useSelector((state) => ({ ...state }));
  const history = useNavigate();

  useEffect(() => {
    setFlag(isBooked())
    console.log(flag)
    // console.log(props.hotel);
    // console.log(dateRange);
  },[]);
  const handleClick = async (e) => {
    e.preventDefault();
    if(isBooked()){
      setFlag(true)
    }
    else{
    if (!auth) {
      history("/login");
    }

    history(
      `/continue-booking/${props.hotelId}?hotel=${
        props.hotel.postedBy
      }&date=${dateRange}&room_no=${props.hotel.room_no}&total=${total}`
    );
    }
  };

  const convertodate=(arr)=>{
    if(arr){
    var dates=[]
    for(let i=0;i<arr.length;i++){
      dates.push(new Date(arr[i].substring(0, 10)))

    }
    console.log(dates)
  }
  }

  const isBooked=()=>{
   let bookingsdates= props.hotel.bookingDates
    let dates=getDatesInRange(new Date(dateRange[0]),new Date(dateRange[1]))
    console.log("dates",dates)
    console.log("bookings",bookingsdates)
    
    if(bookingsdates && dates){
      // for(let i=0;i<dates.length;i++){
      //   if(bookingsdates.includes(dates[i]))
      //   {
      //  index=i
      //   break
       
      //   }
      // }

      const found = dates.some(r=> bookingsdates.includes(r))
      return found
         }
         
   
  }

  const calculatePrice = () => {
   
    var date1 = new Date(dateRange[0]);
    var date2 = new Date(dateRange[1]);

    
   
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
 
    return Difference_In_Days * props.price;
    
    
  };
  const total=calculatePrice()

  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
      dates.push(new Date(date).toISOString());
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }

  return (
    <>
      
      <div className="card" style={{ height: "auto" }}>
        <div className="card-header">
          <h5 class="card-title">NRP {props.price}</h5>

          <h6 class="card-subtitle mb-2 text-muted">inlusive of all taxes</h6>
        </div>
        <div className="card-body">
          <RangePicker
            classNameName="w-100  mb-10"
            onChange={(value, dateString) => setDateRange(dateString)}
            defaultValue={[moment(), moment().add(1, "days")]}
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
          <p className=" alert alert-info" style={{ marginTop: "10px" }}>
            Total price <span style={{ marginLeft: "5rem" }} />
            NPR{total}
            <br></br>
            <p className=" text-muted">(incl. of all taxes) </p>
          </p>

          {flag && <div  style={{color:"red",fontSize:"20px"}}> Room is booked for that day</div>}

          <button
            className="btn btn-success     mx-auto "
            onClick={handleClick}
          >
            {auth && auth.token ? "Continue Booking" : "Login to Book"}
          </button>

         
        </div>
      </div>
    </>
  );
};

export default PaymentInfo;
