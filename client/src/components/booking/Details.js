import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import axios from 'axios'
import {toast} from "react-toastify"
import { useSelector } from "react-redux";

const Details = () => {
  const navigate = useNavigate();

  const {auth}=useSelector((state)=>({...state}))
const {token,user}=auth


  let { date, total,hotel,room_no } = queryString.parse(window.location.search);
  
  const hotelId = useParams().hotelId;
  const userId=user._id
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verify, setVerify] = useState(false);
  const [paymentflag, setPaymentFlag] = useState(false);
  const [detaiFlag, setDetailFlag] = useState(true);
  const [payArrival, setPayArrival] = useState(false);
  const [payKhalti, setPayKhalti] = useState(false);

  const handleDetails = (e) => {
    e.preventDefault();
    setDetailFlag(false)
    setPaymentFlag(true);
  };

  const confirm=(e)=>{
    console.log("confirm")
   console.log(e)
   navigate("/profile")
    //navigate(`/confirmation/${hotelId}&detail=${e}`)
  }

  const khalti=(e)=>{
    e.preventDefault();
    navigate("/khalti")
  }

  const book=async(e)=>{
    e.preventDefault();
    total="pay on arrival"
    try{
      const res=await axios.post(`${process.env.REACT_APP_API}/confirm-booking/${userId}/${hotelId}`,{
        name,
        email,
        phone,
        hotel,
        date,
        room_no,
        total,

      })
      console.log("register user===>", res);
      toast.success("booking sucess");
      setTimeout(()=>{confirm(res.data)},1000)

    }catch(err){
      console.log("server error====>", err);
      if (err.response.status == 400) toast.error(err.response.data);
   
    }
  }

  const showPaymentOPtion = () => {
    return (
      
       
          
          <div className=" row d-flex justify-content-end  h4 w-50">
              <button
                className="btn btn-success  col-md-4  w-25 mx-auto"
                onClick={book}
              >
                pay on arrival
              </button>
            
            
              <button className="btn btn-success  col-md-4  w-25 mx-auto" onClick={khalti}>
                
                pay via khalti
              </button>
           </div>
        
      
    );
  };

  const detailForm = () => {
    return (
      <>
        <form>
          <div className="mt-5">
            <div className="form-group mb-3 ">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control w-50"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className="form-group mb-3 ">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control w-50"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-group mb-3 w-50">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter Phone NO"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>

           {detaiFlag && <button
              disabled={!name || !email || !phone}
              className="btn btn-success"
              onClick={handleDetails}
            >
              
              submit
            </button>
  }
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      
      <div className="card mb-3 content align-center" >
        
        <div className="card-body">
         <div className=" h-50">{detailForm()}</div>
       
        {paymentflag && <div className=" h-50">{showPaymentOPtion()}</div>}
        </div>
     </div>
    </>
  );
};

export default Details;
