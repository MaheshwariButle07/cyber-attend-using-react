import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './views/Home/Home';
import Login from './views/Login/Login.js';
import Signup from './views/Signup/Signup';
// import Holiday from './views/Holiday/Holiday';
import Calendar from './views/Calendar/Calendar';
import Celebration from './views/Celebration/Celebration.js';
import Holiday from './views/Holiday/Holiday.js';



const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
},
{
  path: '/signup',
  element: <Signup />
},
{
  path: '/login',
  element: <Login />
},
{
  path: '/calendar',
  element: <Calendar/>
},
{
  path: '/celebration',
  element: <Celebration/>
},
{
  path: '/holiday',
  element: <Holiday/>
},
{
  path: '*',
  element: '404 Not Found'
}
])


root.render(<RouterProvider router={router}/>)


