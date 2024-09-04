import React from 'react'
import "./Greeting.css"

function Greeting() {
    const getGreeting = () => {
            const currentHour = new Date().getHours();
        
             if (currentHour < 12) {
             return 'Good Morning!🌥️ Have a great day.';
            } else if (currentHour < 18) {
              return 'Good Afternoon!👋🏼 Hope you’re having a pleasant day.';
            } else {
             return 'Good Evening!🌇 Hope you had a good and productive day.';
            }
           };
  return (
    <div>
       <marquee scrollamount='10' className='greeting blink'>{getGreeting()}</marquee>
     </div>
  )
}

export default Greeting





