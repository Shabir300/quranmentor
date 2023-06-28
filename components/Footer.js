import React from 'react'
import styles from '../styles/Home.module.css'


const Footer = () => {
  return (
    <div className='w-screen mt-16 h-fit bg-[#172542] text-white py-10  pt-16 px-10'>

<div className='flex font-thin flex-col md:flex-row md:justify-between md:pr-32'>


      <div className='flex flex-col gap-7'>

        <div>
            <h1 className='font-semibold text-[#36ac5e] uppercase text-2xl xl:leading-normal max-w-3xl leading-tight' >
                    Quran

                        <span 
                        className=' text-white text-lg rounded-md font-thin tracking-wider px-1 ' >
                          .tutor</span>

                        <br /> 
            </h1>

        </div>

        <div>
          <p>The Holy Qur'an is the central religious text of Islam</p>
        </div>

        {/* <div className='flex gap-4'>
          <a href='/'>Twitter</a>
          <a href='/'>Whatsapp</a>
          <a href='/'>Instagram</a>
        </div> */}

        <p className='text-xl'>+92 323-3937310</p>

      </div>

      <div className='flex flex-row gap-10'>


      {/* <div className='mt-10'>
        <ul className='flex flex-col gap-2'>
          <li className='mb-5'><a className='font-semibold text-xl' href='/'>About Us</a></li>
          <li><a href='/'>Our mission</a></li>
          <li><a href='/'>Our members</a></li>
          <li><a href='/'>FAQs</a></li>
          <li><a href='/'>Contact</a></li>
          <li><a href='/'>Provicy Policy</a></li>

        </ul>
      </div>

      <div>
        <ul className='flex flex-col gap-2 mt-10'>
          <li className='mb-5'><a className='font-semibold text-xl' href='/'>Important Links</a></li>
          <li><a href='/'>Register</a></li>
          <li><a href='/'>Search Tutors</a></li>

        </ul>
      </div> */}

      </div>
</div>


      <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className='opacity-60'
        >
          Copyright © 2023 Quran.tutor
          
        </a>
    </div>
  )
}

export default Footer