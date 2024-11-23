import React from 'react'
import './Celebration.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from './../../components/Navbar/Navbar'

function Celebration() {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            const user = (JSON.parse(localStorage.getItem("currentUser"))._id);
            console.log(user)
            if (!user) {
                toast.error("User not found in localStorage");
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetchData`);
                setUserData(response.data.data);
                console.log(response.data.data)
            }
            catch (err) {
                toast.error("Error fetching user details");
            }
        }
        fetchUserData();

    }, []);




    return (
        <>
            <NavBar />
            <h1 className='title'>Your Special Day & Profile Overview</h1>
            <div className='total-container'>
                {userData.map((userDetails) => {
                    return (


                        <div className='mainContainer' >
                            <div className='theCard'>
                                <div className='theFront'>
                                    {
                                        <div className='front-container'>
                                            <img src={userDetails.profilePhoto} alt='user-profile' className='user-profile' />
                                            <h1 className='user-name'>{userDetails.fullName}</h1>
                                            <h3 className='gift'> 🎁  </h3>
                                            <h3 className='user-dob-front'>Cheers on:{new Date(userDetails.dob).toLocaleDateString()}</h3>
                                        </div>
                                    }
                                </div>

                                <div className='theBack'>
                                    {
                                        <>
                                            <div className='back-top'></div>
                                            <img src={userDetails.profilePhoto} alt='user-profile' className='user-profile-back user-profile' />
                                            <br /><br /><br />
                                            <h1 className='username-backside'>{userDetails.fullName} </h1>
                                            <h2 className='user-position'>({userDetails.position})</h2>
                                            <h3 className='user-experience'>{userDetails.experience}</h3>
                                            <h3 className='user-joining'>I have join on : {new Date(userDetails.date_of_joining).toLocaleDateString()}</h3>
                                            <i><h3 className='user-email'>📧{userDetails.email}</h3></i>

                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                    )

                })

                }
            </div>

            
            <Toaster />
          
        </>


    )
}


export default Celebration