import React from 'react'
import './HolidayCard.css'


function HolidayCard({ Date, Day, Holiday }) {
  return (
    
      <div className='holiday-card-container'>
  
      <h1 className='date'>{Date}</h1>
     <h2 className='week-day'>{Day}</h2>
     
     <h3 className='holiday'>{Holiday}</h3>
   
     </div>
     
  )
}

export default HolidayCard