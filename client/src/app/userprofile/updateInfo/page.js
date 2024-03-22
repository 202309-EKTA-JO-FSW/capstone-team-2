"use client"
import { useAuth } from '@/app/context/userContext';
import React, { useState, useEffect } from 'react';

function UpdateProfileInfo({ params }) {
  const {user} = useAuth()
  // const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
    profilePictureURL: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/user/${user._id}`,{
          method: "GET",
          headers: { 
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          "Content-Type": "application/json"}}
        );
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
       const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);

      }
    };
   
    fetchUser();
  }, [params.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    // Assuming only one file is selected
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, profilePictureURL: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    try {
      const response = await fetch(`http://localhost:3001/user/updateinfo/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      const updatedUser = await response.json();
      setUser(updatedUser); // Update user state with updated data
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='py-16'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={(e) => handleChange(e)}  className='text-black'/>
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={(e) => handleChange(e)} className='text-black'/>
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={(e) => handleChange(e)} className='text-black'/>
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={(e) => handleChange(e)} className='text-black'/>
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={(e) => handleChange(e)} className='text-black'/>
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
        </div>
        <button type="submit" className='bg-white text-black'>Update</button>
      </form>

      {/* Display user profile information */}
      <div>
        <h3>User Profile</h3>
        <p>Email: {user.email}</p>
        <p>Full Name: {user.firstName} {user.lastName}</p>
        <p>Location: {user.location}</p>
        <p>Phone: {user.phone}</p>
        {formData.profilePictureURL && <img src={formData.profilePictureURL} alt="Profile" />}
      </div>
    </div>
  );
}

export default UpdateProfileInfo;