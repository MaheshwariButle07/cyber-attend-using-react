import React from 'react'
import holidays from '../../holidayData'
import Holidays_card from '../../components/Holidays_card/Holidays_card'

function Holiday({id,month,date,day,holidays_name}) {
  return (
    <>
    <div>Holiday</div>
    <div className=''>
    {
          holidays.map((leave, id) => {
            const {
              month,
              date,
              day,
              holidays_name
            } = leave

            return (
              <Holidays_card
                id={id}
                month={month}
                date={date}
                day={day}
                holidays_name={holidays_name}

              />
            )
          })
        }
</div>
    </>
  )
}

export default Holiday