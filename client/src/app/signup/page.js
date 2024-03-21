"use client";
import React, { useState } from 'react';
import GoogleButton from '../components/Button/GoogleButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function ProfileSignUp() {
  const router = useRouter(); 
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/user/newuser', userData);

      if (response) {  
      
            router.push('/userprofile');

      } else {
        // Handle signin failure
        console.error('Signin failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen text-black'>
      <h1 className="mb-8">Please sign up to create your profile</h1>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit} method='post'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-20"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mb-4">--- or ---</p>
        <GoogleButton />
      </div>
    </div>
  )
}

export default ProfileSignUp;
