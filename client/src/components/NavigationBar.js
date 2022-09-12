import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import '../auth/Login.css'
const NavigationBar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history("/login");
  };

  return (

    <>
    
    <div className="navbar  bg-light d-flex justify-content-end  " style={{fontSize: "25px"}}>
       

        
      {auth !== null && auth.user.seller == false && (
        <Link className="nav-link" to="/">
          Home
        </Link>
      )}

      {auth !== null && auth.user.seller==false &&(
        <>
          <Link className="nav-link" to="/profile">
            profile
          </Link>
          <a className="nav-link pointer" onClick={logout}>
            Logout
          </a>
        </>
      )}

{auth !== null && auth.user.seller==true &&(
        <>
          <Link className="nav-link" to="/owner/dashboard">
            Dashboard
          </Link>
          <a className="nav-link pointer" onClick={logout}>
            Logout
          </a>
        </>
      )}

      {auth === null && (
        <>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>

          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
    </>
  );
};

export default NavigationBar;
