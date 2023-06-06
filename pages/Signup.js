"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { database, storage } from '../firebaseConfig';
import {ref, uploadBytes, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {doc, add, addDoc, collection} from 'firebase/firestore'
import {getAuth, onAuthStateChanged, sendEmailVerification, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import Map from '../components/Map';
import Link from 'next/link';
import Iqra from '../public/Iqra transparent.png';
import Cropper from 'react-easy-crop';
const inter = Inter({ subsets: ['latin'] })
import cropEasy from '../components/crop/cropEasy';

export default function Signup() {


  const auth = getAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [gender, setGender] = useState('')
  const [mes, setMes] = useState('')
  const [image, setImage] = useState({})
  const [picUrl, setPicUrl] = useState('')
  const [phone, setPhone] = useState("")
  const [id, setId] = useState('')
  const [headline, setHeadline] = useState("");
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [text, setText] = useState("");
  const [about, setAbout] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [check, setCheck] = useState("")
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  const [openCrop, setOpenCrop] = useState(false)
  const collectionRef = collection(database, 'users')
  
  // useEffect(() => {
  //   // Get user's current location
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { latitude, longitude } = position.coords;
  //     setCenter({ lat: latitude, lng: longitude });
  //   });
  // }, []);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [setCenter]);
  



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(user)
      } else {
        setCurrentUser(null);
      }
    });
  }, []);



  // console.log(center)
  
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(user)
      } else {
        setCurrentUser(null);
      }
    });
    
  }, []);



  const handleAddDoc = () => {

    addDoc(collectionRef, {
      FullName: fullName,
      ProfilePic: picUrl,
      Headline: headline,
      Email: email,
      // Age: age,
      Gender: gender,
      Phone: phone,
      About: about,
      Location: {
        latitude: center.lat,
        longitude: center.lng
      }

    })
    .then((res) => {
      console.log("UserData Added!")
      console.log(res);
      console.log(center)
      setId(res.id)
    })
    .catch((err) => {
      console.log(err)
    })


  }

  console.log(image)

  const handleSignUp = () => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User Signed Up!");
      alert("Account Successfully Created!");
      setMes("Account Successfully Created!");
      setTimeout(() => {
        setMes("");
      }, 2000);

      // Update user profile with display name and phone number
      updateProfile(auth.currentUser, {
        displayName: fullName,
        phoneNumber: phone,
        photoURL: picUrl
      }).then(() => {
        console.log("User profile updated successfully!");
      }).catch((error) => {
        console.error("Error updating user profile: ", error);
      })

      sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("An Email Verification is Sent!")
      });
  })
    .catch((err) => {
      console.log(err.message)
      alert(err.message)
    //   setMes(err.message)
    })
    
  }


  const handleBoth = () => {

    handleSignUp();
    handleAddDoc();
    
  }


  const handleSubmitPic = () => {
    // if (!image || !image.name || !email) {
    //   console.log('Invalid input: image and email are required');
    //   return;
    // }
  
    const storageRef = ref(storage, `images/${email}/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on("state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
          console.log('Upload is' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File availabe at", downloadURL)
          setPicUrl(downloadURL)
          setCheck("✓")
        })
      }
      )

  }


  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImage(file)
    setOpenCrop(true)

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


 



  // const storageRef = ref(storage, 'images/' + email + '/' + image.name);


  return (
    !openCrop ? (

      <>

    
    <main id='register' className='font-thin' style={{height: '100vh', width: '100%'}}>
      {/* <h1>Quran Mentorship</h1> */}

      {/* account creation message */}
      <div className='px-5 py-2 rounded-md bg-white text-white' style={{ position: 'fixed', top: "2rem", left: '2rem', backgroundColor: 'white', color: 'black'}}>

        <h1 >{mes}</h1>

      </div> 

         


      <div className='w-[90%] mx-auto items-center  flex  ' style={{marginTop: '5rem'}}>

        <div className='flex flex-col w-[60%] '>
          
          <button className='mb-5 text-left border px-5 w-fit py-1 rounded-md opacity-50 border-black/30'>
            <Link href='/'> <span className='text-xl'>←</span> Home</Link>
          </button>
        

          {/* <sl-button style={{width: 'fit-content', marginBlock: '1rem',}} size="small" variant="success" outline>
                        <Link  href='/'>Back Home</Link>
          </sl-button> */}

          <h2 className='font-thin uppercase text-5xl xl:text-7xl xl:leading-normal max-w-3xl leading-tight'>Create an account</h2>
          
          <div className='flex flex-col gap-4 mt-12'>

            <p className='text-2xl opacity-70'>Profile Picture</p>

            <div className='flex flex-col md:flex-row'>


              <input
                type='file'
                onChange={handleFileInputChange}
                style={{marginBottom: '1rem'}}
              />



              <button 
              className='border shadow-md hover:shadow-slate-400 rounded-lg py-1 px-3 border-black/30 '
              style={{marginBottom: '1rem'}} 
              onClick={handleSubmitPic}>Click to Upload
              </button>

              <div className='ml-5 text-xl text-[#36ac5e] font-bold'>{check}</div>

            </div>

          </div>

          <input
            className='mb-7  border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl mt-10'
            placeholder='Full Name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className='mb-7  border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl '
            placeholder='Subject | Headline'
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
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

          {/* <label 
          className='mb-7 border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl'
          htmlFor="textarea">About Yourself</label> */}

          <input
            className='mb-7 border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl'
            placeholder='+92-123-4567890'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          
                <textarea
                  id="textarea"
                  className='mb-7 border px-1 h-[5rem] rounded-md pt-1 border-black/30  lg:mr-24 text-md md:text-lg'
                  placeholder='About '
                  name="About"
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                />
          

          <label htmlFor="gender" className='text-xl mb-4 opacity-90'>Select Gender:</label>
          <select className='mb-12 opacity-50 ' id="gender" onChange={(e) => setGender(e.target.value)}>
            <option className='' value="">--Please select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>

          {/* <Map /> */}

          {/* <button
           style={{marginTop: '1rem'}} 
           onClick={handleBoth}>Create Account
          </button> */}

          {/* <sl-button style={{maxWidth: '40rem', marginBottom: '1rem'}}  onClick={handleBoth} size="large" variant="success">
          <a className='text-2xl  font-thin '>Create Account</a>
          </sl-button> */}

          <button onClick={handleBoth} className='max-w-[30rem] shadow-xl hover:shadow-slate-400 bg-[#36ac5e] text-white text-xl md:text-3xl py-5'>
            Create Account
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
): (
  <cropEasy photoUrl={picUrl} />
)
  )
}
