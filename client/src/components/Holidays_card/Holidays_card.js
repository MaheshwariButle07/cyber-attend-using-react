import React from 'react'
import "./Holidays_card.css"


function Holidays_card({ month, date, day, holidays_name }) {
  return (
    < >

      <div className='holiday_card'>
        <div className='month_title'>
          <h2 >{month}</h2>
        </div>

        <div className='day-date-container'>
          <h1 className='date'>{date}</h1>
          <h2 className='day'>{day}</h2>
        </div>
        <div>
        <h2 className='holiday_name'>{holidays_name}</h2>
        </div>
        
      </div>
     


    </>
  )
}

export default Holidays_card