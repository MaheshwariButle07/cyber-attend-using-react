import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from "./../../components/Navbar/Navbar"

function Home() {

  const [time,setTime] = useState(()=>{
    const savedTime = localStorage.getItem("timer")

    return savedTime ? JSON.parse(savedTime) : {hours : 0 , minutes : 0 , seconds : 0}
  })
  const [isActive,setIsActive] = useState(false)
  const hours = time.hours.toString().padStart(2, "0");
  const minutes = time.minutes.toString().padStart(2, "0");

  useEffect(()=>{
    localStorage.setItem("timer", JSON.stringify(time))
  },[time])

  useEffect(()=>{
    let interval = null

    if(isActive){
      interval = setInterval(()=>{
        setTime((prevtime)=>{
          let {hours , minutes , seconds} = prevtime
          seconds += 1

          if(seconds===60){
            seconds = 0
            minutes += 1
          }

          if(minutes===60){
            minutes = 0
            hours += 1
          }

          if(hours===8){
           setIsActive(false)
           setTime({hours : 0 , minutes : 0 , seconds : 0})     
          }
          return {hours , minutes , seconds}
        })
      },1000)  
    }
    else if(!isActive && time.seconds !== 0){
      clearInterval(interval)
    }

    return () => clearInterval(interval) 
  },[isActive,time.seconds])

  const startStopbtn = () => {
    setIsActive(!isActive)
  }


  return (
    <div>
      <Navbar />

      <div className='clock-container'>

        <div className='clock-timer'>
        <span className="clock-input">{hours}</span>

          <span className='clock-seperater'>:</span>

          <span className="clock-input">{minutes}</span>

          <span className='clock-unit'>hrs</span>
        </div>

        <div>
          <p className='shift-timing'> Shift 9:00 AM - 5:00 PM </p>
        </div>

        <button
          type="button"
          className="btn-clock"
          onClick={startStopbtn}
          style={{ backgroundColor: isActive ? "red" : "rgb(74, 178, 74)" }}
        >
          {isActive ? "Clock-Out" : "Clock-In"}
        </button>

      </div>





    </div>
  )
}

export default Home