import React from 'react'
import Link from 'next/link';
import Quran from '../public/Quran.png'
import Image from 'next/image';
import Iqra from '../public/Iqra transparent.png'

const About = () => {
  return (
    <div id='about'>
      
      <div className='w-screen mt-16'>

    <div className='w-[80%]  mx-auto flex flex-col md:flex-row md:justify-between md:items-center'> 

        <div>

            <h1 className='font-thin uppercase text-5xl xl:text-7xl xl:leading-normal max-w-3xl leading-tight' >
            About Quran

            <span 
            className=' text-black rounded-md font-thin tracking-wider px-1   text-2xl' >
              .tutor</span>

            <br /> 
            </h1>

            {/* <p className='capitalize font-extralight text-3xl opacity-70 max-w-xl leading-tight mt-16'>Learn, Reflect, Connect</p> */}

            <p className='font-thin max-w-md opacity-70 mt-5 text-lg'>
            Welcome to our Quran tutoring website, 
            where you can connect with qualified tutors to learn
             and understand the Quran without any platform fees. 
             Our dedicated tutors provide personalized lessons that 
             cater to your learning needs, and our secure online platform 
             ensures a safe and professional learning experience.
             Join our community today and deepen your knowledge of the Quran.
            </p>

            <div className='flex flex-row gap-4 mt-16'>

                {/* <sl-button size="large" variant="success">
                <Link href='/Signup'> Register </Link>
                </sl-button>
                
                <sl-button size="large" variant="success" outline>
                    <Link href='/Mentors'>Search Tutors</Link>
                </sl-button> */}


      {/* <button className='mb-5 text-[#36ac5e] border border-[#36ac5e] text-left text-lg  px-5 w-fit py-2 rounded-md'>
        <Link href='/Signup'> <span className='text-xl'></span> Read our story</Link>
      </button> */}
            
            </div>

        </div>

        <div>
            <div className='px-10 max-w-[40rem] min-w-[25rem] mt-5'>

                <Image
                    src={Iqra}
                />

            </div>
        </div>


    </div>
</div>
</div>
  )
}

export default About