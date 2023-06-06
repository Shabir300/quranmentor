import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import pic from '../public/Suban Allah transparent.png';
import Link from 'next/link';

 const ContactUs = () => {

  const [sendClicked, setSendClick] = useState(false)
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_gm5zj0t', 'template_oso5uoq', form.current, 'mcinN4Vzo3YZi0MPc')
      .then((result) => {
          console.log(result.text);
          setSendClick(true)
          setTimeout(() => {
            setSendClick(false);
          }, 2000);
    
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>

  <button className='mb-5 mt-10 text-2xl ml-10 text-left border px-5 w-fit py-2 rounded-md opacity-50 border-black/30'>
            <Link href='/'> <span className=''>←</span> Home</Link>
  </button>
  
<h2 
className='font-thin mx-10 text-center mb-16 uppercase text-6xl xl:text-7xl xl:leading-normal  leading-tight'>
  Contact us</h2>


    <div className='w-screen items-center lg:px-24 flex gap-10 flex-col lg:flex-row font-thin text-2xl  rounded-xl  py-10 '>


    <form className='flex flex-1 flex-col w-[90%] md:max-w-[55%] mx-auto' ref={form} onSubmit={sendEmail}>
        
        <label  className='mb-2'>Name</label>
        
        <input className='border shadow-inner py-2 rounded-md  mb-5' type="text" name="user_name" />
        
        <label  className='mb-2'>Email</label>
        
        <input className='border shadow-inner py-2 rounded-md  mb-5' type="email" name="user_email" />
        
        <label className='mb-2'>Message</label>


        <textarea className='border shadow-inner rounded-md w-full mb-5 min-h-[15rem]' name="message" />
        
        <input className='max-w-[30rem]  bg-[#36ac5e] text-white text-xl md:text-3xl py-5' type="submit" value="Send" />
      
    </form>

    <div className='flex-[0.5] mx-auto'>

          <Image 
            src={pic}
            className=''
            alt='img'
          />

    </div>

    {sendClicked && (
      <div className='fixed top-10 right-20 bg-black rounded-md px-5 py-3 text-white'>
          <p>Message sent ✓</p>
        </div>
    )}
    </div>
</>
  );
};


export default ContactUs;
