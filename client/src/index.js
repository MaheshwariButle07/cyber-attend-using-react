import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Holiday from './views/Holiday/Holiday';



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
  path: '/holidays',
  element: <Holiday/>
},
{
  path: '*',
  element: '404 Not Found'
}
])


root.render(<RouterProvider router={router}/>)


