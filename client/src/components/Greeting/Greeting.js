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
             return 'Good Evening🌇';
            }
           };
  return (
    <div>
       <h1 className='greeting'>{getGreeting()}</h1>
     </div>
  )
}

export default Greeting





