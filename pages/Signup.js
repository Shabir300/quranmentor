"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { database, storage } from '../firebaseConfig';
import {ref, uploadBytes, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {doc, add, addDoc, collection} from 'firebase/firestore'
import {getAuth, onAuthStateChanged, sendEmailVerification, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import Map from '../components/Map';
import Link from 'next/link';
import Iqra from '../public/Iqra transparent.png';
import 'react-image-crop/dist/ReactCrop.css';
import { useRouter } from 'next/router';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';



const inter = Inter({ subsets: ['latin'] })

export default function Signup() {
  const imgRef = useRef();
  const router = useRouter();
  const auth = getAuth();
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [gender, setGender] = useState('')
  const [mes, setMes] = useState('')
  // const [image, setImage] = useState({})
  // const [picUrl, setPicUrl] = useState('')
  const [phone, setPhone] = useState("")
  const [id, setId] = useState('')
  const [headline, setHeadline] = useState("");
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [text, setText] = useState("");
  const [about, setAbout] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [check, setCheck] = useState("");
  const [disabled,setDisabled] = useState(false);
  const [photoUploadCheck, setPhotoUploadCheck] = useState('');


  const [crop, setCrop] = useState();
  const [imgSrc, setImgSrc] = useState('');
  const [croppedImgSrc, setCroppedImgSrc] = useState('');
  const [completedCrop, setCompletedCrop] = useState();
  const [aspect, setAspect] = useState(1);
  
  // const [openCrop, setOpenCrop] = useState(false)
  const collectionRef = collection(database, 'users')

//   const [crop, setCrop] = useState({
//     unit: '%',
//     x: 25,
//     y: 25,
//     width: 50,
//     height: 50
// });
  
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
        // console.log(user)
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
        // console.log(user)
      } else {
        setCurrentUser(null);
      }
    });
    
  }, []);



  const handleAddDoc = () => {

    addDoc(collectionRef, {
      FullName: fullName,
      ProfilePic: croppedImgSrc,
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
      // console.log("UserData Added!")
      // console.log(res);
      // console.log(center)
      setId(res.id)
    })
    .catch((err) => {
      console.log(err)
    })


  }


  const handleSignUp = () => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // console.log("User Signed Up!");
      alert("Account Successfully Created!");
      setMes("Account Successfully Created!");
      router.push('/SignIn')
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
    setDisabled(true)
    
  }


  
  
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState('');

  
  // const handleFileInputChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(file)
    
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  
  
  const onPhotoSelection = (e) => {
    
    if (e.target.files && e.target.files > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener('load', () => {
        setImgSrc(reader.result.toString() || '')
      })
    }
  }
  
  console.log(imgSrc);

  const onImgLoading = () => {
    setCrop({
      unit: 'px',
      width: 150,
      height: 150,
    })
  }
  

  const handleSubmitPic = () => {

    if (completedCrop && imgRef.current) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      const ctx = canvas.getContext('2d');

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      const base64Image = canvas.toDataURL('image/jpeg');
      setCroppedImgSrc(base64Image);

    }

  console.log(croppedImgSrc)

    // if (!image || !image.name || !email) {
    //   console.log('Invalid input: image and email are required');
    //   return;
    // }
  
    // const storageRef = ref(storage, `images/${email}/${image.name}`)
    // const uploadTask = uploadBytesResumable(storageRef, image);
    //   uploadTask.on("state_changed", (snapshot) => {
    //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
    //       // console.log('Upload is' + progress + '% done');
    //       setPhotoUploadCheck('Upload is' + progress + '% done')
    //   },
    //   (error) => {
    //     console.log(error.message);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       // console.log("File availabe at", downloadURL)
    //       setPicUrl(downloadURL)
    //       setCheck("✓")
    //     })
    //   }
    //   )

  }
  
  
  // const storageRef = ref(storage, 'images/' + email + '/' + image.name);
  
  
  return (
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

          <h2 className='font-thin uppercase text-5xl xl:text-7xl xl:leading-normal max-w-3xl leading-tight'>Create an account</h2> <span className='italic'>Only for teachers</span>
          
          <div className='flex flex-col gap-4 mt-12'>

            <p className='text-2xl opacity-70'>Profile Picture</p>

            <div className='flex flex-col '>

              <input type='file' accept='images/*' onChange={e => onPhotoSelection(e)} />

              {!!imgSrc && (
            <div className='fixed top-10 left-10 w-full h-full'>
              <ReactCrop
                crop={crop}
                onImageLoaded={onImgLoading}
                aspect={aspect}
                onChange={(_, percentCrop) => setCrop(percentCrop) }
                onComplete={(c) => setCompletedCrop(c)}
              >
                <img
                
                src={imgSrc}
                ref={imgRef}
                alt='selected img'
                
                />

              </ReactCrop>
            </div>
            )}

              <button 
              className='border shadow-md hover:shadow-slate-400 rounded-lg py-1 px-3 border-black/30 '
              style={{marginBottom: '1rem'}} 
              onClick={handleSubmitPic}> Upload
              </button>

              {!!croppedImgSrc && <img src={croppedImgSrc} alt='cropped image' />}


              <p>{photoUploadCheck}</p>

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
          
          <div className='flex '>

              <input
                className='mb-7 flex-1 -mr-4 border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl'
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                />

              {showPassword ? (
                <RiEyeOffFill onClick={() => setShowPassword(false)}/>
              ): (
                <RiEyeFill onClick={() => setShowPassword(true)} />
                )}

            </div>


          {/* <label 
          className='mb-7 border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl'
          htmlFor="textarea">About Yourself</label> */}

          <input
            className='mb-7 border-b border-black/30 pb-2 px-1 lg:mr-24 text-xl'
            placeholder='+923xx-xxxxxxx'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          
                {/* <textarea
                  id="textarea"
                  className='mb-7 border px-1 h-[5rem] rounded-md pt-1 border-black/30  lg:mr-24 text-md md:text-lg'
                  placeholder='About '
                  name="About"
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                /> */}
          

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

          <button disabled={disabled} onClick={handleBoth} className='max-w-[30rem] shadow-xl hover:shadow-slate-400 bg-[#36ac5e] text-white text-xl md:text-3xl py-5'>
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

  )
}
