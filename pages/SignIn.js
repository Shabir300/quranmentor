import React, {useEffect, useState} from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import Iqra from '../public/Iqra transparent.png';
import Image from 'next/image';


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
  const [mes, setMes] = useState('')
  const [pageNav, setPageNav] = useState('')


    useEffect(() => {

        onAuthStateChanged(auth, (data) => {
            console.log(data)
        })
        
    }, [])


    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Your are Signed In!")
            setMes("Successfully Logged In!");
            setPageNav('/CurrentProfile');
            setTimeout(() => {
                setMes("");
            }, 2000);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            setMes(`An Error occurred: ${errorMessage}`);
            setTimeout(() => {
                setMes("");
            }, 5000);
        });
    }


  return (
    <>
    <main id='register' className='font-thin' style={{height: '100vh', width: '100%'}}>
      {/* <h1>Quran Mentorship</h1> */}

      {/* account creation message */}
      {mes !== '' && (

          <div className=' rounded-md bg-black text-white' style={{ position: 'fixed', top: "2rem", left: '2rem'}}>

        <h1 className='px-6 py-5 text-xl'>{mes}</h1>

      </div> 

          )}
         


      <div className='w-[90%] mx-auto items-center  flex  ' style={{marginTop: '5rem'}}>

        <div className='flex flex-col w-[60%] '>
          
          <button className='mb-5 text-left border px-5 w-fit py-1 rounded-md opacity-50 border-black/30'>
            <Link href='/'> <span className='text-xl'>←</span> Home</Link>
          </button>
        

          {/* <sl-button style={{width: 'fit-content', marginBlock: '1rem',}} size="small" variant="success" outline>
                        <Link  href='/'>Back Home</Link>
          </sl-button> */}

          <h2 className='font-thin mb-16 uppercase text-5xl xl:text-7xl xl:leading-normal max-w-3xl leading-tight'>Log In</h2>
          
          
          <input
            className='mb-7 border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input
            className='mb-7 border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          
          <button onClick={handleLogIn} className='mt-16 max-w-[30rem]  bg-[#36ac5e] text-white text-xl md:text-3xl py-5'>
        <Link href={pageNav}>
            Log In
        </Link>
          </button>

{/* <SlButton variant="primary">Click me</SlButton>; */}
        
        </div>

        <div className='w-[40%] max-w-[35rem] px-5'>

          <Image 
            className='w-full hidden sm:flex' 
            alt='Quran' 
            src={Iqra} 
          />

        </div>

      </div>

    </main>

</>
  )
}

export default SignIn




    // <div>
    //     <h1>Sign In</h1>
    //     < Link href='/'>Home</Link>
    //     <div className='flex flex-col'>
    //         <input
    //             placeholder='Email'
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             />

    //         <input
    //             placeholder='Password '
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //         />
    //     </div>

    //     <button onClick={handleLogIn}>Log In</button>
    // </div>