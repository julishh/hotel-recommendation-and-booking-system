import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";

const Details = () => {
  const navigate = useNavigate();

  const { date, total } = queryString.parse(window.location.search);
  const hotelId = useParams().hotelId;

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
    console.log(name, email, phone);
    setPaymentFlag(true);
  };

  const confirm=(e)=>{
    e.preventDefault();
    navigate(`/confirmation/${hotelId}`)
  }

  const khalti=(e)=>{
    e.preventDefault();
    navigate("/khalti")
  }

  const showPaymentOPtion = () => {
    return (
      <div className="row">
        <form>
          <div className="mt-5">
            <div className="form-group mb-3 ">
              <button
                className="btn btn-primary"
                onClick={confirm}
              >
                pay on arrival
              </button>
            </div>
            <div className="form-group mb-3 ">
              <button className="btn btn-primary" onClick={khalti}>
                
                pay via khalti
              </button>
            </div>
          </div>
        </form>
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
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className="form-group mb-3 ">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-group mb-3 ">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter Phone NO"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>

            <button
              disabled={!name || !email || !phone}
              className="btn btn-primary"
              onClick={handleDetails}
            >
              {" "}
              submit
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <div className="container-fluid  p-5 text-center">
        <h3 className="btn btn-outline-primary m-2">modify your booking</h3>
      </div>
      <div className="container h-100">
        {detaiFlag && <div className=" h-50">{detailForm()}</div>}
        {paymentflag && <div className=" h-50">{showPaymentOPtion()}</div>}
      </div>
    </>
  );
};

export default Details;
