import React from 'react'
import "./Home.css"
import Navbar from "./../../components/Navbar/Navbar"

function Home() {
  return (
    <div>
      <Navbar />

      <div className='clock-container'>

        <div className='clock-timer'>
          <input
            type='text'
            className='clock-input'
          />

          <span className='clock-seperater'>:</span>

          <input
            type='text'
            className='clock-input'
          />

          <span className='clock-unit'>hrs</span>
        </div>

        <div>
          <p className='shift-timing'> Shift 9:00 AM - 5:00 PM </p>
        </div>

        <button type='button' className='btn-clock'>Clock in </button>

      </div>





    </div>
  )
}

export default Home