import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_gm5zj0t', 'template_oso5uoq', form.current, 'mcinN4Vzo3YZi0MPc')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div id='contact' className=' border rounded-xl  py-10 '>

    <form className='flex flex-col w-fit mx-auto' ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input className='border rounded-md  mb-5' type="text" name="user_name" />
      <label>Email</label>
      <input className='border rounded-md  mb-5' type="email" name="user_email" />
      <label>Message</label>
      <textarea className='border rounded-md max-w-[20rem] mb-5' name="message" />
      <input className='border rounded-md max-w-[20rem] mb-5' type="submit" value="Send" />
    </form>
    </div>
  );
};