import React from 'react';
import Link from 'next/link';
import Quran from '../public/Quran.png'
import Image from 'next/image';

const Section1 = () => {
  return (
    <div id='section1' className='w-screen mt-16'>

        <div className='w-[80%]  mx-auto flex flex-col md:flex-row md:justify-between md:items-center'> 

            <div>

                <h1 className='font-thin uppercase text-3xl xl:text-7xl xl:leading-normal max-w-3xl leading-tight' >
                Discover the beauty of the Holy 

                <span className='bg-[#36ac5e] text-white rounded-md font-thin tracking-wider px-4  mx-3  ' >Quran</span>

                <br /> 
                </h1>

                <p className='capitalize font-extralight text-3xl opacity-70 max-w-xl leading-tight mt-16'>Learn, Reflect, Connect</p>

                <p className='font-thin max-w-md opacity-70 mt-5 text-md'>
                    The Quran is the central religious text of Islam. This is the book of divine guidance and direction for mankind.
                </p>

                <div className='flex flex-row gap-4 mt-16'>

                    {/* <sl-button size="large" variant="success">
                    <Link href='/Signup'> Register </Link>
                    </sl-button>
                    
                    <sl-button size="large" variant="success" outline>
                        <Link href='/Mentors'>Search Tutors</Link>
                    </sl-button> */}

            <button className='shadow-xl hover:shadow-black hover:shadow-inner   mb-5 bg-[#36ac5e] text-left text-sm  pb-1 md:text-lg  px-5 w-fit  rounded-md text-white'>
            <Link href='/Signup'> <span className='text-xl'></span> Register</Link>
          </button>

          <button className='mb-5 text-[#36ac5e] border border-[#36ac5e] text-left text-sm  md:text-lg pb-1  px-3 w-fit  rounded-md'>
            <Link href='/Signup'> <span className='text-xl'></span> Search Tutors</Link>
          </button>
                
                </div>

            </div>

            <div>
                <div className='px-10 max-w-[40rem] min-w-[25rem] mt-5'>

                    <Image
                        src={Quran}
                        alt='image'
                    />

                </div>
            </div>


        </div>
    </div>
  )
}

export default Section1