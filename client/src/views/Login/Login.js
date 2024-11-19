import React, { useState } from "react";
import './Login.css'
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios"
import "./../../index.css"
import Navbar from "../../components/Navbar/Navbar";
import logoImg from "../../components/Navbar/icons/logo.png"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email,
      password
    })

    if (response.data.success) {
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

      toast.loading("Redirecting to home page")

      setTimeout(() => {
        window.location.href = "/"
      }, 3000)
    }

    else {
      toast.error(response.data.message)
    }

  }


  return (
    <div>
      <Navbar />

      <form className="auth-form">
      <div className="auth-heading-container">
          <img className="logo" src={logoImg} alt="logo-img" />
         
         <p className="auth-headind-sepretor">|</p>

          <h1 className="auth-heading">Login Form </h1>
        </div>
        <label htmlFor="email" className="auth-form-heading">
          Enter email:<br/>
        </label>
        <input
          type="email"
          id="email"
          placeholder="email"
          className="user-input input-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />

            <br/><br/>

        <label htmlFor="password" className="auth-form-heading">
          Enter password:<br/>
        </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          className="user-input input-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />



        <div className="remember-container">
          <form>
            <input
              type="checkbox"
              id="remember_me" />
            <label htmlFor="remember_me" className="remember_me" >
              Remember me
            </label>

          </form>
        </div>

        <button
          type="button"
          className='btn-login'
          onClick={login}
        >
          Login
        </button>

        <div className='auth-link'>
          <Link to='/signup'>
            Don't have an account? Signup
          </Link>
        </div>


      </form>

      <Toaster />
    </div>
  );
}

export default Login;
