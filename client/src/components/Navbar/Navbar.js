import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import "./Navbar.css";
import defaltProfileImage from "./icons/profile.png";
import homeImg from "./icons/home.png";
import calanderImg from "./icons/calander.png";
import signupImg from "./icons/signup.png";
import loginImg from "./icons/login.png";
import logoutImg from "./icons/logout.png";
import logoImg from "./icons/logo.png";

function Navbar() {
  const [User, setUser] = useState(null);  // Set default to null to avoid potential empty string issues.
  const navigate = useNavigate();

  // Handle Logout
  const Logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setUser(null);
    setTimeout(() => navigate("/login"), 2000);  // Use navigate instead of window.location.href
  };

  // Handle Login redirect
  const Login = () => {
    navigate("/login");
  };

  // Check user on initial load
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // User avatar fallback image
  const profileImage = User ? User.profilePhoto : defaltProfileImage;
  const userName = User ? User.fullName : "No User";

  return (
    <div className="nav-bar-container">
      <img className="logo" src={logoImg} alt="logo-img" />

      {/* Desktop Menu */}    
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
          {User ? (
            <span onClick={Logout} className="L-btn">
              Logout
            </span>
          ) : (
            <span onClick={Login} className="L-btn">
              Login
            </span>
          )}
        </li>
      </ul>

      {/* Mobile Menu */}
      <ul type="none" className="mobile-menu-container">
        <Link to="/">
          <li className="list"><img className="item-logo" src={homeImg} alt="Home" /></li>
        </Link>
        <Link to="/calendar">
          <li className="list"><img className="item-logo" src={calanderImg} alt="Calendar" /></li>
        </Link>
        <Link to="/signup">
          <li className="list"><img className="item-logo" src={signupImg} alt="Signup" /></li>
        </Link>
        <li className="list">
          {User ? (
            <span onClick={Logout} className="L-btn">
              <img className="item-logo" src={logoutImg} alt="Logout" />
            </span>
          ) : (
            <span onClick={Login} className="L-btn">
              <img className="item-logo" src={loginImg} alt="Login" />
            </span>
          )}
        </li>
      </ul>

      {/* User Profile */}
      <div className="profile-container">
        <img src={profileImage} alt="profile" className="profile-image" />
        <p className="user-name">{userName}</p>
      </div>
    </div>
  );
}

export default Navbar;
