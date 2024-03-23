"use client";
import React, { useState, useEffect } from 'react';

function UpdateProfileInfo() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
    profilePictureURL: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUser(parsedUserInfo);
        setFormData(parsedUserInfo); // Set form data with fetched user data
      } catch (error) {
        console.error('Error parsing user info JSON:', error);
      }
    }
  }, []); // Fetch user profile only once on component mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Reset error message on input change
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, profilePictureURL: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const phoneRegex = /^7\d{8}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError('Phone number must start with 7 and contain 9 digits.');
        return;
      }
  
    // Check if at least one field is empty
     if (Object.values(formData).some(value => value === '')) {
         setSuccessMessage('No changes have been made.');
         return;
       }
  
      // Filter out empty values from the form data
      const formDataToUpdate = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== '')
      );
  
      const response = await fetch(`http://localhost:3001/user/updateinfo/${user._id}`, {
        method: 'PUT',
        body: JSON.stringify(formDataToUpdate),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      
      const updatedUser = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      setUser(updatedUser);
  
      setSuccessMessage('Your data successfully updated!');
    } catch (error) {
      console.error(error);
      setError('Failed to update user data');
    }
  };
  

  return (
    <div className='bg-[#F9F9F7] py-24'>
    <div className='text-black'>
      <form onSubmit={(e) => handleSubmit(e)} className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={(e) => handleChange(e)} className='text-black border border-gray-300 p-2 rounded-md w-full focus:border-gray-500'/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={(e) => handleChange(e)} className='text-black border border-gray-300 p-2 rounded-md w-full'/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={(e) => handleChange(e)} className='text-black border border-gray-300 p-2 rounded-md w-full'/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
          <input type="text" name="location" value={formData.location} onChange={(e) => handleChange(e)} className='text-black border border-gray-300 p-2 rounded-md w-full'/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={(e) => handleChange(e)} className='text-black border border-gray-300 p-2 rounded-md w-full'/>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture:</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} className='text-black border border-gray-300 p-2 rounded-md w-full'/>
        </div>
        <button type="submit" className='bg-[#AD343E] hover:bg-red-700 text-white py-2 px-4 rounded-md border border-gray-300'>Update</button>
      </form>
      {successMessage && (
        <p className="text-green-500 mt-4 ml-[34rem] font-bold">{successMessage}</p>
      )}
    </div>
    </div>
  );
}

export default UpdateProfileInfo;
