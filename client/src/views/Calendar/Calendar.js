import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calendar.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast,{Toaster} from 'react-hot-toast';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]); 

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Fetch attendance data from the backend
  useEffect(() => {
    const fetchAttendanceData = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser"))._id;
            
      if (!user) {
        console.error("User not found in localStorage");
        return;
      }

      try {
        // Replace with the actual API endpoint to fetch the attendance data
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getAttendance/${user}`);
        setAttendanceData(response.data);  // Assuming response.data is an array of attendance objects
      } catch (err) {
        console.error("Error fetching attendance data", err);
      }
    };
    fetchAttendanceData();
  }, []);

  // Get days in the current month and the starting day
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = [];
    const daysInMonthCount = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
      daysInMonth.push(null);
    }

    for (let i = 1; i <= daysInMonthCount; i++) {
      daysInMonth.push(new Date(year, month, i));
    }

    return { daysInMonth, startDay };
  };

  const { daysInMonth, startDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    console.log("Selected date:", date);
  };

  // Function to determine the background color class based on attendance status
  const getDayStatusClass = (day) => {
    if (!day) return ''; // If day is null (empty space)

    const attendance = attendanceData.find(att => new Date(att.date).toDateString() === day.toDateString());
    
    if (!attendance) return ''; // If no attendance data for this day

    // Determine the class based on attendance status
    switch (attendance.status) {
      case 'present':
        return 'present';  // Green for present
      case 'absent':
        return 'absent';   // Red for absent
      case 'half-day':
        return 'half-day'; // Yellow for half-day
      default:
        return '';
    }
  };

  const [overAllAttendanceDatattendanceData,setoverAllAttendanceDatattendanceData] = useState([])

  useEffect(() => {
    const fetchOverAllAttendanceData = async () => {
      const user = (JSON.parse(localStorage.getItem("currentUser"))._id);
            
      if (!user) {
        toast.error("User not found in localStorage");
        return;
      }

      try {     
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allOverAttendance/${user}`);
        setoverAllAttendanceDatattendanceData(response.data);
      } 
      catch (err) {
        toast.error("Error fetching attendance data");
      }
    }
    fetchOverAllAttendanceData();
  }, []);

  return (
    <>
      <Navbar />
      <div className='c-container'>
        <div className='calendar'>
          <div className='header'>
            <button className='header-button' onClick={prevMonth}>&lt;</button>
            <span>
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </span>
            <button className='header-button' onClick={nextMonth}>&gt;</button>
          </div>
          <div className='day-names'>
            {dayNames.map((day) => (
              <div key={day} className='day-name'>{day}</div>
            ))}
          </div>
          <div className='days'>
            {Array.from({ length: startDay }).map((_, index) => (
              <div key={index} className='empty-day'></div>
            ))}
            {daysInMonth.map((day, index) => (
              <div
                key={index}
                className={`day 
                  ${day && day.toDateString() === new Date().toDateString() ? 'today' : ''} 
                  ${getDayStatusClass(day)}`} // Apply attendance status class
                onClick={() => day && handleDateClick(day)}
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
      {overAllAttendanceDatattendanceData.length === 0 ? (
        <p>No attendance data available.</p>
      ) : (
            <div className='cards_container' >
              <div className='home-cards-item'>
                <div className='cards-title'>Total Days</div>
                <div className='cards-days'>
                  <p>{overAllAttendanceDatattendanceData.total}</p>
                </div>
              </div>
              <div className='home-cards-item'>
                <div className='cards-title'>Present Days</div>
                <div className='cards-days'>
                  <p>{overAllAttendanceDatattendanceData.present}</p>
                </div>
              </div>
              <div className='home-cards-item'>
                <div className='cards-title'>Absent Days</div>
                <div className='cards-days'>
                  <p>{overAllAttendanceDatattendanceData.absent}</p>
                </div>
              </div>
              <div className='home-cards-item'>
                <div className='cards-title'>Half Days</div>
                <div className='cards-days'>
                  <p>{overAllAttendanceDatattendanceData.halfday}</p>
                </div>
              </div>
            </div>
        )
       }
      </div>

      <Toaster/>
      <Footer />
    </>
  );
}

export default Calendar;











