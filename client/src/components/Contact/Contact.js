import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css'
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
                Time Off Request :
            </h1>

            <div className='form-container'>
                <form ref={form} onSubmit={sendEmail}>
                    <label className='field-title'>Your Name:</label>
                    <input type="text" name="user_name" className='fields' />

                    <label className='field-title'>Your Email:</label>
                    <input type="email" name="user_email" className='fields' />

                    <label className='field-title'>Subject:</label>
                    <input type="text" name="user_subject" className='fields subject' />

                    <label className='field-title'>Message:</label>
                    <textarea name="message" className='fields message' />

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