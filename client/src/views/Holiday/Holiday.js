import React from 'react'
import holidays from '../../holidayData'
import Holidays_card from '../../components/Holidays_card/Holidays_card'

function Holiday({id,month,date,day,holidays_name}) {
  return (
    <>
    <div>Holiday</div>
   
      <div>
    {
          holidays.map((leave, id) => {
            const {
              month,
              date,
              day,
              holidays_name
            } = leave

            return (
              <div className='holiday_hero_section'>
              <Holidays_card
                id={id}
                month={month}
                date={date}
                day={day}
                holidays_name={holidays_name}

              />
              </div>
            )
          })
        }
</div>

    </>
  )
}

export default Holiday