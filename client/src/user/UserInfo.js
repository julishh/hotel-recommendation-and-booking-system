import React from "react";
import "./UserInfo.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const UserInfo = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const {  user } = auth;
  const navigate=useNavigate()
  const userId = user._id;
  const [values, setValues] = useState({
    name: "",
    email: "",
 
    address: "",
    phone: "",
  });

  const { name, email, address, phone } = values;

  useEffect(() => {
    loadUserInfo();
    console.log(address)
  }, []);

  const loadUserInfo = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API}/user/${userId}`);
    setValues({ ...values, ...res.data });
    
  };

  const editClick=()=>{
    
    navigate("/profile/edit")

  }

  return (
    <>
      <div className="card mb-3 content">
        <h1 className="m-3 pt-3"> personal info</h1>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <h5>Full Name</h5>
            </div>
            <div className="col-md-9 text-secondary"> {name}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-3">
              <h5>Email</h5>
            </div>
            <div className="col-md-9 text-secondary"> {email}</div>
          </div>
          <hr />

          <div className="row">
            <div className="col-md-3">
              <h5>phone</h5>
            </div>
            <div className="col-md-9 text-secondary">
              {phone ?  phone  : "add your phone number"}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-3">
              <h5>address</h5>
            </div>
            <div className="col-md-9 text-secondary">
              {address ? address : "add your Adress"}
            </div>
          </div>
          <hr />

          <button className="btn btn-secondary w-50  " onClick={editClick}>Edit</button>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
