// import ReactDOMServer from 'react-dom/server';
// import React, { useState, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'


// const Map = ({location}) => {

    
//     const AnyReactComponent = ({ text }) => <div style={{color: 'black', fontSize: '2rem'}}>{text}</div>;
    
//     const [center, setCenter] = useState({ lat: 0, lng: 0 });
    
//   useEffect(() => {
//     // Get user's current location
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       setCenter({ lat: location.latitude, lng: location.longitude });
//     });
//   }, []);

//   console.log(location)

//   return (
//     <div style={{ height: '30vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: 'AIzaSyAjBXW20ZKr8l3fSnFCF5cvzdAP7ozOfAA' }}
//         center={center}
//         defaultZoom={15}
//       >
        
//         <AnyReactComponent
//           lat={center.lat}
//           lng={center.lng}
//           text={<FontAwesomeIcon icon={faLocationCrosshairs} />}
//         />

//       </GoogleMapReact>
//     </div>
//   );
// };

// export default Map;







import ReactDOMServer from 'react-dom/server';
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'


const Map = ({locations, currentUserLocation}) => {

    
  console.log(currentUserLocation)

  
  // const [center, setCenter] = useState({ lat: 0, lng: 0 });
  
  // useEffect(() => {
  //   // Get user's current location
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { latitude, longitude } = position.coords;
  //     setCenter({ lat: latitude, lng: longitude });
  //   });
  // }, [center]);

  // useEffect(() => {
  //   const watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setCenter({ lat: latitude, lng: longitude });
  //     },
  //     (error) => console.log(error),
  //     { enableHighAccuracy: true }
  //   );
  //   return () => navigator.geolocation.clearWatch(watchId);
  // }, [setCenter]);
  
  
  // console.log(center)
  
  console.log(locations)

  
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAjBXW20ZKr8l3fSnFCF5cvzdAP7ozOfAA' }}
        center={{lat:33.636734, lng:73.0169135}}
        defaultZoom={13}
      >
        {locations?.map((location) => (
          
          <AnyReactComponent
          key={location.latitude}
          lat={location.latitude}
          lng={location.longitude}

        />

      ))}

      </GoogleMapReact>
    </div>
  );
};

export default Map;

const AnyReactComponent = () => <div style={{color: 'black', fontSize: '2rem', position: 'absolute', transform: 'translate(-50%, -50%)'}}>👳‍♂️</div>
