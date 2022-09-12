import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);
  const { setUpRecaptha } = useUserAuth();

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/register`, {
        name,
        email,
        password,
      });

      console.log("register user===>", res);
      toast.success("registering sucess,plase login");
      history("/login");
    } catch (err) {
      console.log("server error====>", err);
      if (err.response.status == 400) toast.error(err.response.data);
    }
  };
  const registerForm = () => {
    return (
      // <form onSubmit={handleSubmit} className="mt-5">
      //   <div className="form-group mb-3">
      //     <label className="form-label">your name</label>
      //     <input
      //       type="text"
      //       className="form-control"
      //       placeholder="Enter name"
      //       value={name}
      //       onChange={(e) => setName(e.target.value)}
      //     ></input>
      //   </div>

      //   <div className="form-group mb-3">
      //     <label className="form-label">your email</label>
      //     <input
      //       type="email"
      //       className="form-control"
      //       placeholder="Enter email"
      //       value={email}
      //       onChange={(e) => setEmail(e.target.value)}
      //     ></input>
      //   </div>

      //   <div className="form-group mb-3 ">
      //     <label className="form-label">password</label>
      //     <input
      //       type="password"
      //       className="form-control"
      //       placeholder="password"
      //       value={password}
      //       onChange={(e) => setPassword(e.target.value)}
      //     ></input>
      //   </div>
      //   <button disabled={!name ||!email || !password} className="btn btn-primary"> submit</button>
      //   <Link to='/register/hotel'><button className="btn btn-outline-primary m-2" >Register as Hotel</button>
      // </Link>
      // </form>

      <div className="login-body">
        <div className="login ">
          <h1 className="text-center"> Register</h1>
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="form-group ">
              <label className="form-label">Name </label>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="form-group ">
              <label className="form-label">Email adress </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <div class="inavlid-feedback">
                Please enter your email address
              </div>
            </div>

            <div className="form-group ">
              <label className="form-label">password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <div class="inavlid-feedback">Please enter your password</div>
            </div>

            <input
              type="submit"
              disabled={!email || !password}
              className="btn btn-success w-100"
              value="LOGIN"
            />
          </form>
          <p className="w-100 text-center">
            &mdash; Or Register your Hotel &mdash;
          </p>
          <div className="social d-flex text-center">
            <Link to="/register/hotel" className="btn btn-secondary w-100">
              HOTEL REGISTER
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return <div>{registerForm()}</div>;
};

export default Register;
