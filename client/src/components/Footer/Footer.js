import React, {useState , useEffect} from "react";
import "./Footer.css";
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";
import home from "./../Navbar/icons/home.png"
import calander from "./../Navbar/icons/calander.png"
import signup from "./../Navbar/icons/signup.png"
import login from "./../Navbar/icons/login.png"
import logout from "./../Navbar/icons/logout.png"




function Footer() {
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
    <div className="footer">
      <div className="footer-container">

        
        <ul type="none" className="footer-list-container">
          <h3>Links: </h3>
          <Link to="/">
            <li className="footer-list">Home</li>
          </Link>

          <Link to="/">
            <li className="footer-list">Calander</li>
          </Link>

          <Link to="/signup">
            <li className="footer-list">Signup</li>
          </Link>

          <li className="footer-list">
            {User ? 
            (
              <li onClick={Logout} >
                Logout
              </li>
            )    
            :
            (
              <li onClick={Login} >
                Login
              </li>
            )}
          </li>
        </ul>


        <ul type="none" className="footer-social-container">
          <h3>Social: </h3>
          <div>

          <Link to="https://www.instagram.com/accounts/login/?hl=en">
          <img className="footer-social-icon" src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="insta-logo" />
            
          </Link>

          <Link to="https://www.facebook.com/login/">
          <img className="footer-social-icon" src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png" alt="fb-logo" />         
          </Link>

          <Link to="https://x.com/i/flow/login?mx=2">
          <img className="footer-social-icon" src="https://cdn-icons-png.flaticon.com/128/733/733579.png" alt="twitter-logo" />
          </Link>

          </div>
        </ul>

        <ul type="none" className="footer-contact-container">
          <h3>Contact Us : </h3>
          <div>

          <Link to="https://www.google.com/maps/place/GH+Raisoni+College+of+commerce+science+and+technology/@21.1637051,79.0813209,18z/data=!4m10!1m2!2m1!1sgh+raisoni+manglwai+complex!3m6!1s0x3bd4c123bfece315:0xed0643f99242f230!8m2!3d21.1643681!4d79.082201!15sCh1naCByYWlzb25pIG1hbmdhbHdhcmkgY29tcGxleCIDiAEBkgEHY29sbGVnZeABAA!16s%2Fg%2F11kpgqxvq6?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D">
          <span className="contact-link">537J+PVW, Mangalwari Bazar Rd, Koradi Colony, Nagpur, Maharashtra 440001</span>
            
          </Link>

          <Link to="tel:1234567890">
          <span className="contact-link">1234567890</span>        
          </Link>

          <Link to="mailto:xyz@gmail.com">
          <span className="contact-link">xyz@gmail.com</span>
          </Link>

          </div>
        </ul>

        
      </div>



    </div>
  );
}

export default Footer;
