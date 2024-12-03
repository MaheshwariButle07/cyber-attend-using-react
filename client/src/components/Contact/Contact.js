import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css'
import logoImg from "../../components/Navbar/icons/logo.png"
import { toast, Toaster } from 'react-hot-toast';

function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_dyy959e', 'template_hcla3jq', form.current, {
                publicKey: 'oLs-YdKN0eLVd5KAk',
            })
            .then(
                () => {
                    toast.success('Message sent successfully!', {
                        position: 'top-right',
                        duration: 3000,
                        style: {
                            background: '#4caf50',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '8px',
                        },
                    });
                },
                (error) => {
                    toast.error(`Failed to send message: ${error.text}`, {
                        position: 'top-right',
                        duration: 3000,
                        style: {
                            background: '#f44336',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '8px',
                        },
                    });
                    console.log('FAILED...', error.text);
                }
            );
    };

    return (
        <div className='form-main-container'>

            <h1 className='form-heading'>
                Leave Application Request :
            </h1>

            <div className='form-container'>
                <form ref={form} onSubmit={sendEmail}>
                <div className="auth-heading-container">
          <img className="logo" src={logoImg} alt="logo-img" />
         
         <p className="auth-headind-sepretor">|</p>

          <h1 className="auth-heading">Leave Form</h1>
        </div>
                    <input type="text"
                    placeholder='Your Name'
                     name="user_name" className='fields' />

                    <input type="email" 
                    placeholder='Your Email'
                    name="user_email" className='fields' />

                    <input type="text" 
                    placeholder='Subject'
                    name="user_subject" className='fields subject' />

                    <textarea name="message" 
                    placeholder='Message'
                    className='fields message' />

                    <div className='btn-container'>
                        <button type='submit' value='send' className='btn-send'>Send</button>
                    </div>
                </form>
                <Toaster />
            </div>
        </div>
    )
}

export default Contact