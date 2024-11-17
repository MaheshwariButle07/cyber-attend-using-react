import React, { useState, useEffect } from "react";
import "./Navbar.css";
import defaltProfileImage from "./profile.png"
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";
import homeImg from "./icons/home.png"
import calanderImg from "./icons/calander.png"
import signupImg from "./icons/signup.png"
import loginImg from "./icons/login.png"
import logoutImg from "./icons/logout.png"
import logoImg from "./logo.png"




function Navbar() {
  const [User, setUser] = useState("");

  const Logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  const Login = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <div>
      <div className="nav-bar-container">

        <img className="logo" src={logoImg} alt="logo-img" />


        <ul type="none" className="list-container">
          <Link to="/">
            <li className="list">Home</li>
          </Link>

          <Link to="/calendar">
            <li className="list">Calendar</li>
          </Link>

          <Link to="/signup">
            <li className="list">Signup</li>
          </Link>

          <li className="list">
            {User ?
              (
                <span onClick={Logout} className="L-btn">
                  Logout
                </span>
              )
              :
              (
                <span onClick={Login} className="L-btn">
                  Login
                </span>
              )
            }
          </li>

        </ul>

        <ul type="none" className="mobile-menu-container">
          <Link to="/">
            <li className="list"><img className="item-logo" src={homeImg} alt="" /></li>
          </Link>

          <Link to="/calendar">
            <li className="list"><img className="item-logo" src={calanderImg} alt="" /></li>
          </Link>

          <Link to="/signup">
            <li className="list"><img className="item-logo" src={signupImg} alt="" /></li>
          </Link>

          <li className="list">
            {User ?
              (
                <li onClick={Logout} className="L-btn">
                  <img className="item-logo" src={logoutImg} alt="" />
                </li>
              )


              :
              (
                <li onClick={Login} className="L-btn">
                  <img className="item-logo" src={loginImg} alt="" />
                </li>
              )}
          </li>
        </ul>

        <div className="profile-container">
          <img
            src={User ? User.profilePhoto : defaltProfileImage}
            alt="profile-image"
            className="profile-image"
          />

          <p className="user-name">{User ? User.fullName : "No User"}</p>
        </div>
      </div>

    </div>
  );
}

export default Navbar;
