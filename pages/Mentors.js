import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { database } from '../firebaseConfig';
import Image from 'next/image';
import Link from 'next/link';
import ReactDOMServer from 'react-dom/server';
import GoogleMapReact from 'google-map-react';
import { FiPhoneCall } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import {createSlice} from '@reduxjs/toolkit';
import { updateVisibleUsersSet } from '../app/tutorsSlice';
import {useDispatch, useSelector} from 'react-redux'

const Mentors = () => {

  const dispatch = useDispatch();
  const teachers = useSelector(state => state.tutors);

  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState({lat: null, lng: null});
  const [mapCenter, setMapCenter] = useState({ ne: 0, nw: 0, se: 0, sw: 0});
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [data, setData] = useState(null)
  const [name, setName] = useState('');
  const [flag,setFlag] = useState(false);
  
  
  const usersLocations = users.map((user) => user.Location);
  // console.log(users)
  const usersFullNames = users.map((user) => user.FullName);
  const usersWhatsapp = users.map((user) => user.Phone);
  const usersEmails = users.map((user) => user.Email);
  const usersHeadlines = users.map((user) => user.Headline);
  const usersPhotos = users.map((user) => user.ProfilePic)
  
  // console.log(usersFullNames)
  const [visibleUsersSet, setVisibleUsersSet] = useState(filteredUsers);
  
  
  // useEffect(() => {

  //   console.log(teachers)

  // }, [setVisibleUsersSet, visibleUsersSet])


  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // console.log("location", latitude, longitude)
        setCurrentUserLocation({ lat: latitude, lng: longitude });
        setFlag(true);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  

  // console.log(currentUserLocation);
  
  
  useEffect(() => {
    const usersCollection = collection(database, 'users');
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
      // console.log(usersData);
    
    });

    return () => unsubscribe();

  }, []);


  // useEffect(() => {
  //   const usersCollection = collection(database, 'users');
  //   const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
  //     const usersData = snapshot.docs.reduce((acc, doc) => {
  //       const data = doc.data();
  //       if (!acc.some((user) => user.email === data.email)) {
  //         acc.push(data);
  //       }
  //       return acc;
  //     }, []);

  //     console.log(usersData)
  
  //     setUsers(usersData);
  //   });
  
  //   return () => unsubscribe();
  // }, []);
  
  
  // useEffect(() => {
  //   const usersCollection = collection(database, 'users');
  //   const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
  //     const usersData = [];
  //     snapshot.docs.forEach((doc) => {
  //       const data = doc.data();
  //       const existingUserIndex = usersData.findIndex(user => user.email === data.email);
  //       if (existingUserIndex === -1) {
  //         usersData.push(data);
  //       } else {
  //         usersData[existingUserIndex] = data;
  //       }
  //     });
  
  //     setUsers(usersData);
  //   });
  
  //   return () => unsubscribe();
  // }, []);





  // useEffect(() => {
  //   const usersCollection = collection(database, 'users');
  //   const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
  //     const usersData = [];
  //     console.log(snapshot.docs)
  //     usersData.push(snapshot.docs.map((doc) => doc.data()))
  //     // snapshot.docs.forEach((doc) => {
  //     //   const data = doc.data();
  //     //   console.log(data)
  //     // });
  //     // setUsers(usersData);
  //     // const filteredUsersData = usersData.filter() filter the usersData array so that no user is there twice with the same email 

  //     console.log(usersData)
  //   });
  //   return () => unsubscribe();
  // }, []);



  // useEffect(() => {
  //   const usersCollection = collection(database, 'users');
  //   const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
  //     const usersData = [];
  //     usersData.push(snapshot.docs.map((doc) => doc.data()))
  //     snapshot.docs.forEach((doc) => {
  //       const data = doc.data();
  //       const existingUser = usersData.find((user) => user.email === data.email);
  //       if (!existingUser) {
  //         usersData.push(data);
  //       } else {
  //         Object.assign(existingUser, data);
  //       }
  //     });
  //     setUsers(usersData);
  //   });
  //   return () => unsubscribe();
  // }, []);
  
  
  



  // useEffect(() => {
  //   const usersCollection = collection(database, 'users');
  //   const unsubscribe = onSnapshot(usersCollection, (snapshot) => {

  //     const usersData = snapshot.docs.reduce((users, doc) => {
  //       const data = doc.data();

  //       if (!users[data.email]) { // only add data if the user's email has not been seen before
  //         users[data.email] = data;
  //       }
  //       return users;
  //     }, {});

  //     console.log(usersData)

  //     setUsers(Object.values(usersData));
  //   });

  //   return () => unsubscribe();
    
  // }, []);





  // userLocation.length > 0 &&
  
  // console.log(currentUserLocation)
  
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };



const getDistanceFromLatLonInKm = (latitude1, longitude1, latitude2, longitude2) => {
  const earthRadius = 6371; // in km
  const dLat = toRadians(latitude2 - latitude1);
  const dLon = toRadians(longitude2 - longitude1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(latitude1)) *
      Math.cos(toRadians(latitude2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
};
  


  // useEffect(() => {
  //   if (currentUserLocation.lat && currentUserLocation.lng && users.length > 0) {
  //     const filtered = users.filter((user) => {
  //       const distance = getDistanceFromLatLonInKm(user.Location.latitude, user.Location.longitude, currentUserLocation.lat, currentUserLocation.lng);
  //       return distance < 10;
  //     });
  //     setFilteredUsers(filtered);
  //     // console.log(filtered)
  //   }
  // }, [currentUserLocation, users ]);


  // useEffect(() => {
  //   if (currentUserLocation.lat && currentUserLocation.lng && users.length > 0) {
  //     const filtered = users.filter((user) => {
  //       const distance = getDistanceFromLatLonInKm(user.Location.latitude, user.Location.longitude, currentUserLocation.lat, currentUserLocation.lng);
  //       return distance < 10;
  //     });
  //     setFilteredUsers(filtered);
  //     console.log(filtered)
  //   }
  // }, [currentUserLocation, users ]);
  
  

  useEffect(() => {
    if (currentUserLocation.lat && currentUserLocation.lng && users.length > 0) {
      const filtered = users.filter((user) => {
        const distance = getDistanceFromLatLonInKm(mapCenter.nw.lat, mapCenter.nw.lng, mapCenter.sw.lat, mapCenter.sw.lng);
        return distance < 10;
      });
      setFilteredUsers(filtered);
      console.log(filtered)
    }
  }, [mapCenter, users, currentUserLocation ]);
  

  // useEffect(() => {
  //   if (mapCenter.lat && mapCenter.lng && users.length > 0) {
  //     const filtered = users.filter((user) => {
  //       const distance = getDistanceFromLatLonInKm(
  //         user.Location.latitude,
  //         user.Location.longitude,
  //         mapCenter.lat,
  //         mapCenter.lng
  //       );
  //       return distance < 10;
  //     });
  //     setFilteredUsers(filtered);
  //   }
  // }, [mapCenter, users]);
  

  

  // const usersLocations = filteredUsers.map((user) => user.Location);



  // usersLocations.map((location) => setUserLocation(location))

// console.log(userLocation)



  const makeCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };


  const sendWhatsappMessage = (phoneNumber) => {
    let url = '';

    let numberString = phoneNumber.toString();
    let resultString = numberString.slice(1);
    let resultNumber = parseInt(resultString);

    const message = 'Assalamualaikum Warahmatullahi Wabarakatuh! I would like to connect with you about Quran tutoring.';
  
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
    if (isMobileDevice) {
      // Open the WhatsApp app on mobile devices
      url = `whatsapp://send?phone=${resultNumber}&text=${encodeURIComponent(message)}`;
    } else {
      // Open WhatsApp Web on desktop/laptop computers
      url = `https://api.whatsapp.com/send?phone=${resultNumber}&text=${encodeURIComponent(message)}`;
    }
  
    window.open(url, "_blank");
  };
  




const handleMapChange = (e) => {
  const bounds = e.bounds;

  let visibleUsers = users.filter((user) => {
    const latLng = user.Location; // assumes Location is an object with latitude and longitude properties
    return (
      latLng.latitude >= bounds.sw.lat &&
      latLng.latitude <= bounds.ne.lat &&
      latLng.longitude >= bounds.sw.lng &&
      latLng.longitude <= bounds.ne.lng
      );
    });
  
  setVisibleUsersSet(visibleUsers);
  dispatch(updateVisibleUsersSet());

};






const AnyReactComponent = ({ name, phone, email, headline, photo }) => {
  const [hovered, setHovered] = useState(false)
  
  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <div
    className='relative'
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onClick={handleMouseEnter}
    >
      <div style={{fontSize: '2rem'}}>👳‍♂️</div>
      {hovered &&  (
        <div className='absolute bg-white text-color p-2 rounded-md shadow'>
          <div className='flex gap-2'>
            {photo && <img alt='profile pic' className='w-14 h-14 rounded-full' src={photo} />}
            <div>
              <p className='text-sm'>{name}</p>
              <span className='text-xs opacity-70'>{headline}</span>
            </div>

          </div>
            
              <div className='flex gap-2 '>

              <button
                className=' h-fit w-fit text-[#36ac5e] border border-[#36ac5e] px-3 py-1 rounded-full'
                style={{ width: 'fit-content', marginTop: '1rem' }}
                >
                <a href={`mailto:${email}`} className="font-thin text-lg">
                  <MdEmail  />
                </a>

              </button>

              

              <button
                className=' h-fit w-fit text-[#36ac5e] border border-[#36ac5e] px-3 py-1 rounded-full'
                onClick={() => sendWhatsappMessage(phone)}
                style={{width: 'fit-content', marginTop: '1rem',}}
                >

                <a href="" className='font-thin text-lg'><FaWhatsapp /></a>

              </button>

              
              {/* <button
                className='h-fit w-fit  text-[#36ac5e] border border-[#36ac5e] px-3 py-1 rounded-full'
                onClick={() => makeCall(user.Phone)}
                style={{ width: 'fit-content', marginTop: '1rem' }}
                
                >
                <span className="font-thin text-lg"><FiPhoneCall  /></span>

              </button> */}

            </div>
            


        </div>
      )}
    </div>
  )
}


const fallbackLocation = {
  lat: 40.7128, // Example: New York City latitude
  lng: -74.0060 // Example: New York City longitude
};



// console.log(currentUserLocation);

return (
  <div id='tutors' className="w-screen  bg-black/5 mt-10 lg:mt-28 py-28">
      <div className="w-[95%] lg:w-[80%] mx-auto">
        <h1 className="font-thin  text-2xl xl:text-7xl xl:leading-normal  leading-tight ">
        Discover Ur Perfect tutor  
          <p className="bg-black py-3 mt-2 text-white rounded-md font-thin tracking-wider px-4   ">
          Find the ideal match on the map
          </p>
          <br />
        </h1>

          {/* <p className='uppercase font-thin text-2xl text-center opacity-50 '>
          Location-filtered Tutors
          </p> */}

          <p className='font-thin text-xl text-center opacity-70 mt-5  underline-offset-3'>
          Contact us  to get matched with the right tutor 
          </p>

          <div className='flex gap-2 mx-auto w-fit  '>

                  <button
                    className=' bg-[#36ac5e] text-white px-4 py-2 rounded-full'
                    style={{ width: 'fit-content', marginTop: '1rem' }}
                    >
                    <a href={`mailto:shabirmuhammadkhan62@gmail.com`} className="font-thin text-xl">
                      Email
                    </a>

                  </button>

                  

                  <button
                    className=' bg-[#36ac5e] text-white px-4 py-2 rounded-full'
                    onClick={() => sendWhatsappMessage('+923233937310')}
                    style={{width: 'fit-content', marginTop: '1rem',}}
                    >

                    <a href="" className='font-thin text-xl'>WhatsApp</a>

                  </button>

                  
                  <button
                    className=' bg-[#36ac5e] text-white px-4 py-2 rounded-full'
                    onClick={() => makeCall('+92323937310')}
                    style={{ width: 'fit-content', marginTop: '1rem' }}
                    
                    >
                    <span className="font-thin text-xl">Call</span>

                  </button>

          </div>



            <div className='mt-10' style={{ height: '50vh', width: '100%' }}>

              <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAUUQdVUhJY2tAMoKBoXWPz_DcfJZwdXUo' }}
              onChange={(e) => handleMapChange(e)}
              defaultCenter={center}
              center={flag ? currentUserLocation : fallbackLocation}
              defaultZoom={13}
              >

                {usersLocations?.map((location, index) => (
                  
                  <AnyReactComponent
                  key={location.latitude}
                  lat={location.latitude}
                  lng={location.longitude}
                  name={usersFullNames[index]}
                  phone={usersWhatsapp[index]}
                  email={usersEmails[index]}
                  headline={usersHeadlines[index]}
                  photo={usersPhotos[index]}
                  />
                  
                  
                  
                  ))}

              </GoogleMapReact>


            </div>


        

        {/* <Map onCenterChanged={handlesetMapCenter} locations={usersLocations} currentUserLocation={currentUserLocation} /> */}
      
      </div>
    </div>
  );
};


export default Mentors;
