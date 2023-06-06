import React, { useEffect, useState } from "react";
import { auth, database } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import {
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const CurrentProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState("");
  const [currentUserDoc, setCurrentUserDoc] = useState({});
  const [currentUserLocation, setCurrentUserLocation] = useState({});
  const [userPhone, setUserPhone] = useState('');
  const [userProfile, setUserProfile] = useState({});

  const collectionRef = collection(database, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setEmail(user.email); // use user.email instead of currentUser.email
        console.log(user);
      } else {
        setCurrentUser({});
      }
    });
  }, []);

  useEffect(() => {
    const emailQuery = query(collectionRef, where("Email", "==", email));
    onSnapshot(emailQuery, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
      if (data.docs.length > 0) {
        setCurrentUserLocation(data.docs[0]?.data().Location);
        console.log(data.docs[0].data())
        setUserPhone(data.docs[0]?.data().Phone)
        setUserProfile(data.docs[0]?.data())
      }
      
    });
  }, [email]); // add email as a dependency to the useEffect hook


  console.log(currentUserLocation);
  console.log(userPhone)
  

  return (
    <div className="mt-16 px-10">
      
      <button className='mb-5 text-left border px-5 w-fit py-1 rounded-md opacity-50 border-black/30'>
            <Link href='/'> <span className='text-xl'>←</span> Home</Link>
      </button>

      <h1 className='font-thin uppercase text-5xl xl:text-7xl xl:leading-normal max-w-3xl leading-tight'>Your Profile</h1>
      
      {currentUser && (
        <>
        <div className="font-thin flex flex-row mt-10 gap-10">
          <img className='w-[20rem] ' src={currentUser.photoURL} alt="Profile" />

          <div className="flex-1 ">
            <p className="text-5xl">
              <span className="text-4xl"></span> {userProfile.FullName}</p>

            <p className="mt-3 text-2xl">
               {userProfile.Headline}
            </p>
            <div className="h-[1px] bg-black/20 my-5 "></div>

            <p className="text-lg">
              <span></span> {userProfile.About}</p>

            <p className="mt-10 text-lg mb-8">
              <span className="text-xl mr-2 font-[georgia] bg-[#36ac5e] text-left px-3 w-fit py-2 rounded-md text-white">Email</span> {userProfile.Email}</p>

            <p className="text-lg ">
              <span className="text-xl mr-2 font-[georgia] bg-[#36ac5e] text-left px-3 w-fit py-2 rounded-md text-white">Phone</span> {userProfile.Phone}</p>

          </div>
          
        </div>
        </>
      )}
    </div>
  );
};

export default CurrentProfile;
