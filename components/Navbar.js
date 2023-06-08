import React, {useState, useEffect, useRef } from 'react';
import Link from 'next/link';


const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(false)
    const navRef = useRef(null);

    useEffect(() => {
        // add event listener to document
        document.addEventListener('click', handleDocumentClick);
    
        // cleanup event listener on unmount
        return () => {
          document.removeEventListener('click', handleDocumentClick);
        };
      }, []);
    
      const handleDocumentClick = (e) => {
        if (navRef.current && !navRef.current.contains(e.target)) {
          // clicked outside of navbar menu, so close it
          setIsOpen(false);
        }
      };

const handleMenuClick = () => {
    return (
        <div>
            <ul className=" flex-col gap-8 items-center ">
                            <li>
                               <Link href='/'></Link> Home</li>
                            <li>
                               <Link href='/'></Link> About</li>
                            <li>
                               <Link href='/Signup'>Register</Link> </li>
                            <li>
                               <Link href='/Mentors'>Tutors</Link> </li>

                            {/* <li>
                               <Link href='/'>Tafsir</Link> </li>
                            <li>
                               <Link href='/'>Translation</Link> </li> */}

            </ul>
        </div>
    )
}



  return (
    <div className='w-full font-thin text-xl border-b pt-8 pb-4 px-5 '>
        <div className='w-full pl-3 '>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <h1 className='text-[#36ac5e] font-semibold'>Quran<span className='text-black font-thin'>.tutor</span></h1>
                </div>

                <div className='flex flex-row gap-10 items-center'>
                    <div>
                        <ul className=" flex-row gap-8 items-center hidden md:flex">
                            <li>
                            <Link href='#homeSite'>Home</Link>
                            </li>
                            <li>
                            <Link href='#about'>About</Link> </li>
                            <li>
                            <Link href='/Signup'>Register</Link> </li>

                            <li>
                            <Link href='/SignIn'>Login </Link> </li>


                            <li>
                            <Link href='#tutors'>Tutors</Link> </li>

                               <li className=' hover:text-[#36ac5e] w-full'>
                               <Link href='/ContactUs'>Contact</Link> </li>

                            {/* <li>
                               <Link href='/'>Tafsir</Link> </li>
                            <li>
                               <Link href='/'>Translation</Link> </li> */}

                        </ul>
                    </div>

                    <div className='flex flex-row gap-4 items-center'>
                        {/* <p>Search</p> */}
                        {/* <sl-button size="medium" variant="text" >
                        </sl-button> */}
                        <button className=' text-[#36ac5e] border border-[#36ac5e] text-left text-lg w-fit px-3 py-1  rounded-md'>
                            <Link className="text-[#36ac5e] text-lg" href='/CurrentProfile'>My Profile</Link>
                        </button>

                        {activeMenu && (

                        <div className='z-10 fixed top-24 right-5 bg-black text-white w-[40%] py-16 text-center rounded-md'>
                            <ul className=" flex flex-col gap-6 items-center ">
                                
                                <li className=' hover:text-[#36ac5e] w-full'>
                                <Link href='#homeSite'>Home</Link> </li>

                                <li className=' hover:text-[#36ac5e] w-full'>
                                <Link href='#about'>About</Link> </li>

                                <li className=' hover:text-[#36ac5e] w-full'>
                                <Link href='/Signup'>Register</Link> </li>

                                <li className=' hover:text-[#36ac5e] w-full'>
                                    <Link href='/SignIn'>Log In</Link>  
                                </li>

                                <li className=' hover:text-[#36ac5e] w-full'>
                                <Link href='#tutors'>Tutors</Link> </li>


                                <li className=' hover:text-[#36ac5e] w-full'>
                                <Link href='/ContactUs'>Contact</Link> </li>

                                {/* <li>
                                <Link href='/'>Tafsir</Link> </li>
                                <li>
                                <Link href='/'>Translation</Link> </li> */}

                            </ul>
                        </div>

                        )}


                        <button onClick={() => setActiveMenu(!activeMenu)} className='md:hidden'>☰</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar