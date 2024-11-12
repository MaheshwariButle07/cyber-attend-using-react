import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calendar.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from 'react-hot-toast';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]); // Store attendance data

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Fetch attendance data from the backend
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getattendance`, {
          params: {
            month: currentDate.getMonth() + 1, // Send the current month (1-12)
            year: currentDate.getFullYear(), // Send the current year
          }
        });
        setAttendanceData(response.data); // Set the attendance data from the server
      } catch (err) {
        toast.error("Error fetching attendance data:", err);
      }
    };

    fetchAttendanceData();
  }, [currentDate]); // Run when `currentDate` changes

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

  // Function to determine the class for each day's status
  const getDayStatusClass = (day) => {
    if (!day) return ''; // If day is null (empty space)
    const status = attendanceData.find(attendance => new Date(attendance.date).toDateString() === day.toDateString());
    if (!status) return ''; // If no attendance data for that day

    switch (status.status) {
      case 'present':
        return 'present';
      case 'absent':
        return 'absent';
      case 'half-day':
        return 'half-day';
      default:
        return '';
    }
  };


  //attendence data

  const [AttendanceData, SetAttendanceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allOveeAttendance`);
        SetAttendanceData(response.data); // Set the fetched data

      } catch (err) {
        setError(err.message); // Set error if any

      }
    };

    fetchAttendanceData();
  }, []); // Empty dependency array means it runs once when the component mounts

  if (error) {
    return <div>Error: {error}</div>;
  }


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
                  ${getDayStatusClass(day)}  // Add dynamic class based on attendance status
                `}
                onClick={() => day && handleDateClick(day)}
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      {


        AttendanceData.length === 0 ? (
          <p>No attendance data available.</p>
        ) : (

          <div>
            {AttendanceData.map((userAttendance) => (
              <div className='cards_container' key={userAttendance._id}>
                <div className='cards-item'>
                  <div className='cards-title'>
                    Total Days
                  </div>

                  <div className='cards-days'>
                    <p >{userAttendance.totalDays}</p>
                  </div>
                </div>

                <div className='cards-item'>
                  <div className='cards-title'>
                    Present Days
                  </div>

                  <div className='cards-days'>
                    <p >{userAttendance.presentDays}</p>
                  </div>

                </div>

                <div className='cards-item'>
                  <div className='cards-title'>
                    Absent Days
                  </div>

                  <div className='cards-days'>
                    <p>{userAttendance.absentDays}</p>
                  </div>
                </div>

                <div className='cards-item'>
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
    </>
  );
}

export default Calendar;
