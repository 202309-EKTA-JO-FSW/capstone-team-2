import { Router } from 'next/router'
import React from 'react'
import { useRouter } from 'next/navigation';

function SignIn() {
  const router = useRouter(); 
 
  function handleSignIn() {
    router.push(`/userprofile`)
  }
  return (
    <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSignIn}
      >
        LogIn
      </button>
  )
}

export default SignIn