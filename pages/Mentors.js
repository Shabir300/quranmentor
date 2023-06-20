import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { database } from '../firebaseConfig';
import Image from 'next/image';
import Link from 'next/link';
import ReactDOMServer from 'react-dom/server';
import GoogleMapReact from 'google-map-react';



const Mentors = () => {
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState({});
  const [mapCenter, setMapCenter] = useState({ ne: 0, nw: 0, se: 0, sw: 0});
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [data, setData] = useState(null)
  const [name, setName] = useState('');

  
  const usersLocations = users.map((user) => user.Location);
  console.log(users)
  const usersFullNames = users.map((user) => user.FullName);
  console.log(usersFullNames)
  const [visibleUsersSet, setVisibleUsersSet] = useState(filteredUsers);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [setCurrentUserLocation]);
  
  
  
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
  
  console.log(currentUserLocation)
  
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
  


  useEffect(() => {
    if (currentUserLocation.lat && currentUserLocation.lng && users.length > 0) {
      const filtered = users.filter((user) => {
        const distance = getDistanceFromLatLonInKm(user.Location.latitude, user.Location.longitude, currentUserLocation.lat, currentUserLocation.lng);
        return distance < 10;
      });
      setFilteredUsers(filtered);
      console.log(filtered)
    }
  }, [currentUserLocation, users ]);


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
  }, [mapCenter, users ]);
  

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
  

console.log(filteredUsers)
  console.log(mapCenter)
  

  // const usersLocations = filteredUsers.map((user) => user.Location);



  // usersLocations.map((location) => setUserLocation(location))

  console.log(users)
// console.log(userLocation)
  console.log(usersLocations)

console.log(filteredUsers)


  const makeCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };


  const sendWhatsappMessage = (phoneNumber) => {
    let url = '';

    const message = 'Assalamualaikum Warahmatullahi Wabarakatuh! I would like to connect with you about Quran tutoring.';
  
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
    if (isMobileDevice) {
      // Open the WhatsApp app on mobile devices
      url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    } else {
      // Open WhatsApp Web on desktop/laptop computers
      url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
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
};



const AnyReactComponent = ({name}) => <div style={{color: 'black', fontSize: '2rem'}}>👳‍♂️ <p className='text-sm '>{name}</p></div>

const fallBackLocation = {
  lat: 33.4915592,
  lng: 73.0952097
}


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
                    onClick={() => makeCall('+9233937310')}
                    style={{ width: 'fit-content', marginTop: '1rem' }}
                    
                  >
                    <span className="font-thin text-xl">Call</span>

                  </button>

          </div>



            <div className='mt-10' style={{ height: '50vh', width: '100%' }}>

              <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAjBXW20ZKr8l3fSnFCF5cvzdAP7ozOfAA' }}
              onChange={(e) => handleMapChange(e)}
              defaultCenter={center}
              center={currentUserLocation || fallBackLocation}
              defaultZoom={13}

              >

                {usersLocations?.map((location, index) => (
                  
                  
                  <AnyReactComponent
                  key={location.latitude}
                  lat={location.latitude}
                  lng={location.longitude}
                  name={usersFullNames[index]}

                />

                

                ))}

              </GoogleMapReact>


            </div>


        <ul className="flex flex-col gap-12 mt-24 max-h-[50vh] overflow-y-scroll">


          {visibleUsersSet.map((user) => (


            <li
              key={user.email}
              className="flex flex-row gap-5 border-b border-black/20 pb-4"
            >
              
              <img
                src={user.ProfilePic}
                alt="Profile Pic"
                className="rounded-full w-20 h-20"
                />

            {/* <sl-avatar
                image={user.ProfilePic}
                label="Teacher"
              ></sl-avatar> */}

              <div className="flex flex-col w-full ">
                <div className='flex flex-row justify-between mr-5'>

                  <Link href='/teacher'>
                    <div className='mr-16'>
                      <p className="font-[georgia]  text-2xl">{user.FullName}</p>
                      <p className="font-helvetica  text-lg">{user.Headline}</p>
                    </div>
                  </Link>
                  
 {/* No email call or whatsapp buttons because the platform
                  should match the user with the right tutor */}

          
                {/* <div className='flex gap-2 '>

                  <button
                    className=' bg-[#36ac5e] text-white px-3 py-1 rounded-full'
                  style={{ width: 'fit-content', marginTop: '1rem' }}
                  >
                    <a href={`mailto:${user.Email}`} className="font-thin text-lg">
                      Email
                    </a>

                  </button>

                  

                  <button
                    className=' bg-[#36ac5e] text-white px-3 py-1 rounded-full'
                    onClick={() => sendWhatsappMessage(user.Phone)}
                    style={{width: 'fit-content', marginTop: '1rem',}}
                  >

                    <a href="" className='font-thin text-lg'>WhatsApp</a>

                  </button>

                  
                  <button
                    className=' bg-[#36ac5e] text-white px-3 py-1 rounded-full'
                    onClick={() => makeCall(user.Phone)}
                    style={{ width: 'fit-content', marginTop: '1rem' }}
                    
                  >
                    <span className="font-thin text-lg">Call</span>

                  </button>

                </div> */}


                </div>
                <p className="font-thin text-md mt-2 ">{user.About}</p>

                  
                <div className="flex flex-row gap-4">


                </div>

              </div>
            </li>
          ))}
        </ul>





        







        
        {/* <Map onCenterChanged={handlesetMapCenter} locations={usersLocations} currentUserLocation={currentUserLocation} /> */}
      
      </div>
    </div>
  );
};

export default Mentors;


