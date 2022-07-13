import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
  

import axios from 'axios'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();
  

  const handleSubmit = async(e) => {


    e.preventDefault()

    try{
      const res=await axios.post(`${process.env.REACT_APP_API}/register`,{name,email,password})

      console.log("register user===>",res)
      toast.success("registering sucess,plase login")
      history('/login')
      

    }catch(err){
      console.log("server error====>",err)
      if(err.response.status==400)
      toast.error(err.response.data)
    }


    
  };
  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="form-group mb-3">
          <label className="form-label">your name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">your email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="form-group mb-3 ">
          <label className="form-label">password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
          <button className="btn btn-primary"> submit</button>
      </form>
    );
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center ">
        <h1>Register</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">{registerForm()}</div>
        </div>
      </div>
    </>
  );
};

export default Register;
