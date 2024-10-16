import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from "./../../components/Navbar/Navbar"
import toast from 'react-hot-toast'
import Greeting from '../../components/Greeting/Greeting'

import Footer from '../../components/Footer/Footer'

function Home() {

  //code for location

  const [position, setPosition] = useState(null)
  const [isInArea, setIsInArea] = useState(false)

  const location = { lat : 21.164201,lon : 79.082129};

  const getDistance = (lat1,lat2,lon1,lon2)=>{
    const R = 6371e3; // Earth's radius in meters

    //convertin lat & lan from degree to radian 
    const lat1Radian = lat1 * Math.PI / 180
    const lat2Radian = lat2 * Math.PI / 180
    const lon1Radian = lon1 * Math.PI / 180
    const lon2Radian = lon2 * Math.PI / 180

    //finding difference between 2 lat & lon
    const DLat = lat2Radian - lat1Radian
    const DLon = lon2Radian - lon1Radian

    //approximate distance 
    const approxDLon = DLon * R * Math.cos((lat1Radian + lat2Radian) / 2)
    const approxDLat = DLat * R

    return Math.sqrt(approxDLon * approxDLon + approxDLat * approxDLat)
  }

  useEffect(() => {
    const userLocation = (position) => {
      const { latitude, longitude } = position.coords
      setPosition({ lat: latitude, lon: longitude })
    }

    const error = (error) => {
      toast.error("error getting location", error)
    }

    const watchUserLocation = navigator.geolocation.watchPosition(userLocation, error, { enableHighAccuracy: true, timeout: 20000 })


    return () => {
      navigator.geolocation.clearWatch(watchUserLocation)
    }
  })

  useEffect(() => {
   
      if (position) {
      const distance = getDistance(position.lat, location.lat, position.lon, location.lon)

      if (distance <= 50) {
        setIsInArea(true)
      }
      else {
        setIsInArea(false)
        toast.error("You are out of area")
      }
    }
  
  }, [position])

  //code for timer

  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("timer")

    return savedTime ? JSON.parse(savedTime) : { hours: 0, minutes: 0, seconds: 0 }
  })
  const [isActive,setIsActive] = useState(false)
  const hours = time.hours.toString().padStart(2, "0");
  const minutes = time.minutes.toString().padStart(2, "0");

  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify(time))
  }, [time])

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevtime) => {
          let { hours, minutes, seconds } = prevtime
          seconds += 1

          if (seconds === 60) {
            seconds = 0
            minutes += 1
          }

          if (minutes === 60) {
            minutes = 0
            hours += 1
          }

          if (hours === 8) {
            setIsActive(false)
            setTime({ hours: 0, minutes: 0, seconds: 0 })
          }
          return { hours, minutes, seconds }
        })
      }, 1000)
    }
    else if (!isActive && time.seconds !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, time.seconds])

  const startStopbtn = () => {
    if (isInArea) {
      setIsActive(!isActive)
    }
    else{
      setIsActive(false)
      toast.error("you are out of range")
    }
  }

 

  return (
    <div>
      <Navbar />
      <Greeting />

      <div className='clock-container'>

        <div className='current-day'>
          <p >Thu sep 06 2024</p>
        </div>

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
    <br/>

      <Footer/>

    </div>
  )
}

export default Home