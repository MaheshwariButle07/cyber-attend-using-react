
import React, { useState } from 'react';
import './Calendar.css';
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
    setSelectedDate(date);
  };

  const getStatusForDay = (day) => {
    if (!day) return 'empty';
    const today = new Date().toDateString();
    const dateKey = day.toDateString();
    const savedTime = JSON.parse(localStorage.getItem(dateKey)) || { hours: 0 };

    if (day.toDateString() > today) return 'future';
    if (savedTime.hours >= 8) return 'present';
    if (savedTime.hours > 0) return 'absent';
    return 'no-status';
  };

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
              ${selectedDate && day && day.toDateString() === selectedDate.toDateString() ? 'selected' : ''}
              ${day ? getStatusForDay(day) : ''}
            `}
                onClick={() => day && handleDateClick(day)}
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='cards_container'>
        <div className='cards-item'>
          <div className='cards-title'>
            Total Days
          </div>

          <div className='cards-days'>
            <p >31</p>
          </div>
        </div>

        <div className='cards-item'>
          <div className='cards-title'>
            Present Days
          </div>

          <div className='cards-days'>
            <p >24</p>
          </div>

        </div>

        <div className='cards-item'>
          <div className='cards-title'>
            Absent Days 
          </div>

          <div className='cards-days'>
            <p>3</p>
          </div>
        </div>

        <div className='cards-item'>
          <div className='cards-title'>
            Half Days
          </div>

          <div className='cards-days'> 
            <p>4</p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Calendar;
