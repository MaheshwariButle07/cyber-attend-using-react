import React from 'react'
import './Holiday.css'
import HolidayCard from '../../components/HolidayCard/HolidayCard'
import holidays from '../../holidayData'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function Holiday() {
    return (
        <>
        <Navbar/>
            <h1 className='holiday-title'>🗓️Holiday Calendar🗓️</h1>
            <div className='holiday-container'>
                {
                    holidays.map((object, i) => {
                        const {
                            Date,
                            Day,
                            Holiday
                        } = object
                        return (
                            <HolidayCard
                                key={i}
                                Date={Date}
                                Day={Day}
                                Holiday={Holiday}
                                
                            />
                        )
                    })
                }
            </div>
            <Footer/>
        </>
    )
   
}


export default Holiday