import React from 'react'
import "./Greeting.css"

function Greeting() {
    const getGreeting = () => {
            const currentHour = new Date().getHours();
        
             if (currentHour < 12) {
             return 'Good Morning🌥️';
            } else if (currentHour < 18) {
              return 'Good Afternoon👋🏼 ';
            } else {
             return 'Good Evening🌇 ';
            }
           };
  return (
    <div>
       <marquee scrollamount='12' className='greeting blink'>{getGreeting()}</marquee>
     </div>
  )
}

export default Greeting





