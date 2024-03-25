"use client";
import React, { useEffect } from "react";

function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return (
    <div className="justify-items-center justify-center content-center mt-6 ml-auto">
      <h1 className="text-black relative">Thank you for loggin in!</h1>
    </div>
  );
}

export default LoginSuccess;
