"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import GoogleButton from "../components/Button/GoogleButton";
import { useAuth } from "../context/userContext";

function ProfileLogin() {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/user/signin", {
        email,
        password,
      });

      if (response && response.data) {
        // Redirect to user profile
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.userData)
        );
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.userData.token)
        );
        route.push(`/userprofile/user/${response.data.userData._id}`);
        setUser(response.data);
      } else {
        // Handle signin failure
        console.error("Signin failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black mt-6">
      <h1 className="mb-8">Please login to see your profile</h1>
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
          method="post"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-20"
            type="submit"
          >
            Sign In
          </button>
          <p className="text-center mt-4 text-sm text-gray-900">
            Not registered already?{" "}
            <span className="cursor-pointer hover:text-blue-600 text-gray-500">
              <Link href="/signup">Sign Up Now</Link>
            </span>
          </p>
        </form>
        <p className="text-center mb-4 text-black">--- OR ---</p>
        <GoogleButton />
      </div>
    </div>
  );
}

export default ProfileLogin;
