"use client";
import React, { useEffect } from "react";


function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close()
    }, 1000);
  }, []);
  
  return (
    <h1 className="text-black">Thank you for loggin in!</h1>
  )
}

export default LoginSuccess