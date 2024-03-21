"use client"
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';

function Log() {

  const [loged, setLoged] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
     if(localStorage.getItem('userInfo')) {
      setLoged(true)
     }
  }, [])
 

  return (
    <>
    {
      loged ? 
      <div className="hover:text-blue-400 text-white">
      <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={() => {
      localStorage.clear('token');
      localStorage.removeItem('userInfo');
      router.push('/');
      setLoged(false);
       }}
      >
       Logout
      </button>
    </div>
      :
     <div className="hover:text-blue-400 text-white">
       <button
       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       onClick={() => {
       router.push('/userprofile'); 
       } }
       >
        LogIn
       </button>
     </div>
        }
        </>
  )
}

export default Log