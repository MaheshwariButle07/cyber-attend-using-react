import React, {useState} from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios"
import "./../../index.css"
import Navbar from "../../components/Navbar/Navbar";

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = async()=>{

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`,{
      email,
      password
    })
    
    if(response.data.success){
      toast.success(response.data.message)

      localStorage.setItem('currentUser',JSON.stringify(response.data.data))

      toast.loading("Redirecting to home page")

      setTimeout(()=>{
        window.location.href = "/"
      },3000)
    }

    else{
      toast.error(response.data.message)
    }

  }


  return (
    <div>
      <Navbar/>
      <h1 className="auth-heading">Before you start please Login first 🡆</h1>

      <form className="auth-form">
        <label htmlFor="email" className="auth-form-heading">
          Enter email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="email"
          className="user-input"
          value={email}
          onChange={(e) => {
              setEmail(e.target.value )
          }}
        />

        <label htmlFor="password" className="auth-form-heading">
          Enter password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          className="user-input"
          value={password}
          onChange={(e) => {
              setPassword(e.target.value)
          }}
        />

        <button
          type="button"
          className="auth-btn"
          onClick={login}
        >
          Login
        </button>

        <Link to="/login" >
          <p>Don't have an account? Signup</p>
        </Link>
      </form>

      <Toaster />
    </div>
  );
}

export default Login;
