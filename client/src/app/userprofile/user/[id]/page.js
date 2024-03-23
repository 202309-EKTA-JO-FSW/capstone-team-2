"use client"
import { useAuth } from '@/app/context/userContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {useState ,useEffect } from 'react'

// async function getUser(id) {
// 	try {
//         const res = await fetch(`http://localhost:3001/user/${id}`);
//         if (!res.ok) {
//           throw new Error('Failed to fetch user data');
//         }
//         return res.json();
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         return null; // Return null or handle the error appropriately
//       }
// };


function UserInfo({ params }) {
  const [user, setUser] = useState(null);
  const router = useRouter()
  // const { token } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      console.log(user)
      try {
         const res = await fetch(`http://localhost:3001/user/${params.id}`,{
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border mt-14">
      <div className="px-4 py-5 sm:px-6">
        <img src={user.profilePictureURL || 'https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'} className='w-12 rounded-[100%]' alt="User avatar" />
        <h3 className="text-lg leading-6 font-medium text-gray-900">User</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">This is some information about the user.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.firstName} {user.lastName}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.phone}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.location}</dd>
          </div>
        </dl>
        <button className='text-white mt-10 ml-8 mb-5 border bg-[#AD343E] py-2 px-4 rounded-md font-bold'><Link href={`http://localhost:3000/userprofile/updateInfo`}>Update Your Info</Link></button>

      </div>
    </div>
  );
}

export default UserInfo;