import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useSelector } from "react-redux";
import axios from "axios";

const EditInfo = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
const navigate=useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { name, email, phone, address } = values;
  const userId = user._id;
  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API}/user/${userId}`);
    setValues({ ...values, ...res.data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/update-user/${userId}`, {
        name,
        email,
        phone,
        address
      });

      console.log("update user Info===>", res);
      toast.success("your profile is updated");
      navigate("/profile");
    } catch (err) {
      console.log("server error====>", err);
      if (err.response.status == 400) toast.error(err.response.data);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const editForm = () => {
    return (
      <div className="login-body">
        <div className="login ">
          <h1 className="text-center"> Edit</h1>
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="form-group ">
              <label className="form-label">Name </label>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group ">
              <label className="form-label">Email adress </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              ></input>
            </div>

            <div className="form-group ">
              <label className="form-label">Phone </label>
              <input
                type="tel"
                className="form-control"
                placeholder="Phone No."
                name="phone"
                value={phone}
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-group ">
              <label className="form-label">Address </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter email"
                name="address"
                value={address}
                onChange={handleChange}
              ></input>
            </div>

            <input
              type="submit"
              disabled={!email}
              className="btn btn-success w-100"
              value="Update"
            />
          </form>
        </div>
      </div>
    );
  };

  return <div>{editForm()}</div>;
};

export default EditInfo;
