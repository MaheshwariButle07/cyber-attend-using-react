import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from "./../../components/Navbar/Navbar"
import toast, { Toaster } from 'react-hot-toast'
import Greeting from '../../components/Greeting/Greeting'
import Footer from '../../components/Footer/Footer'
import celebrationCal from './party.png'
import holidayCal from './holiday.png'
import axios from 'axios'

function Home() {

  //code for location

  const [position, setPosition] = useState(null)
  const [isInArea, setIsInArea] = useState(false)

  const location = { lat: 21.164201, lon: 79.082129 };

  const getDistance = (lat1, lat2, lon1, lon2) => {
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



  // Timer logic
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("timer");
    return savedTime ? JSON.parse(savedTime) : { hours: 0, minutes: 0, seconds: 0 };
  });

  const [isActive, setIsActive] = useState(false);

  // Get stored date of last timer reset from localStorage
  const [lastResetDate, setLastResetDate] = useState(() => {
    const savedDate = localStorage.getItem("lastResetDate");
    return savedDate ? new Date(savedDate) : new Date();

  });



  const hours = time.hours.toString().padStart(2, "0");
  const minutes = time.minutes.toString().padStart(2, "0");

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify(time));
  }, [time]);

  // Save last reset date to localStorage
  useEffect(() => {
    localStorage.setItem("lastResetDate", lastResetDate.toISOString());
  }, [lastResetDate]);

  useEffect(() => {
    let interval = null;

    // Check if it's a new day, if so reset the timer
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const storedDate = lastResetDate.toISOString().split("T")[0]; // Get stored date in YYYY-MM-DD format

    // If the stored date differs from today's date, reset the timer
    if (todayDate !== storedDate) {
      setTime({ hours: 0, minutes: 0, seconds: 0 });
      setLastResetDate(today); // Update the last reset date
    }

    // Timer logic when the timer is active
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;
          seconds += 1;

          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }

          if (minutes === 60) {
            minutes = 0;
            hours += 1;
          }

          if (hours === 8) {
            setIsActive(false);
          }
          return { hours, minutes, seconds };
        });
      }, 1);
    } else if (!isActive && time.seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time.seconds, lastResetDate]);

  const startStopbtn = () => {
    if (isInArea) {
      setIsActive(!isActive);
    } else {
      setIsActive(false);
      toast.error("You are out of range");
    }
  };


  //ATTENDANCE STATUS

  const [status, setStatus] = useState("");

  const attendence = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      toast.error("User not found in localStorage");
      return;
    }

    const userId = user._id;
    const timeing = new Date();
    const date = timeing.toISOString().split('T')[0]; // Format date to YYYY-MM-DD

    // Determine the status based on the current hour
    if (time.hours >= 6) {
      setStatus("present");
    } else if (time.hours >= 4 && time.hours <= 6) {
      setStatus("half-day");
    } else {
      setStatus("absent");
    }

    // Call the API to submit attendance
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/attendance`,
        { userId, status, date }
      );
      toast.log("Attendance submitted successfully");
    } catch (error) {
      toast.error("Error submitting attendance:", error);
    }
  };

  useEffect(() => {
    attendence();
  }, [status]); // Run the attendance function when `status` changes



  //attendence data

  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allOverAttendance`);
        setAttendanceData(response.data); // Set the fetched data

      } catch (err) {
        console.log(err.message); // Set error if any
      }
    };

    fetchAttendanceData();
  }, []); // Empty dependency array means it runs once when the component mounts

  



  return (
    <div>
      <Navbar />
      <Greeting />

      <div className='clock-container'>

        <div className='current-day'>

          <p>{(new Date).toDateString()}</p>
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

      <br /> <br />


      <div>
        <h1 className='home-page-heading'>Events :</h1>
      </div>


      <div className='home-card-container'>
        <div className='home-card-container-item'>
          <div>
            <h3>Celebrations</h3>
          </div>
          <img src={celebrationCal} alt='celerbation' className='home-card-img' />

          <button className='btn-view-all'>View All</button>
        </div>


        <div className='home-card-container-item'>
          <div>
            <h3>Holidays</h3>
          </div>
          <img src={holidayCal} alt='holidays' className='home-card-img' />

          <button className='btn-view-all'>View All</button>
        </div>

      </div>
      <br /> <br />

      <div>
        <h1 className='home-page-heading'>Overview :</h1>
      </div>

      {attendanceData.length === 0 ? (
        <p>No attendance data available.</p>
      ) : (

        <div>
          {attendanceData.map((userAttendance) => (
            <div className='cards_container' key={userAttendance._id}>
              <div className='home-cards-item'>
                <div className='cards-title'>
                  Total Days
                </div>

                <div className='cards-days'>
                  <p >{userAttendance.totalDays}</p>
                </div>
              </div>

              <div className='home-cards-item'>
                <div className='cards-title'>
                  Present Days
                </div>

                <div className='cards-days'>
                  <p >{userAttendance.presentDays}</p>
                </div>

              </div>

              <div className='home-cards-item'>
                <div className='cards-title'>
                  Absent Days
                </div>

                <div className='cards-days'>
                  <p>{userAttendance.absentDays}</p>
                </div>
              </div>

              <div className='home-cards-item'>
                <div className='cards-title'>
                  Half Days
                </div>

                <div className='cards-days'>
                  <p>{userAttendance.halfDays}</p>
                </div>



              </div>
            </div>

          ))}
        </div>

      )}

      <Footer />
      <Toaster />

    </div>
  )
}

export default Home




