"use client";
// import { useAuth } from '@/app/context/userContext';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function UserInfo({ params }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  // const { token } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      console.log(user);
      try {
        const res = await fetch(`http://localhost:3001/user/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [params.id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#F9F9F7]">
      <div className="bg-white overflow-hidden shadow rounded-lg border w-auto mt-24 mb-4">
        <div className="px-4 py-5 sm:px-6 flex flex-col items-center">
          <img
            src={
              user.profilePictureURL ||
              "https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
            }
            className="w-20 rounded-[100%]"
            alt="User avatar"
          />
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is your profile information
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ml-44">
                {user.firstName} {user.lastName}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ml-44">
                {user.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ml-44">
                {user.phone}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ml-44">
                {user.location}
              </dd>
            </div>
          </dl>
          <div className="flex justify-center mt-10">
            <button className="text-white border bg-[#AD343E] py-2 px-4 rounded-md font-bold mb-8">
              <Link href={`http://localhost:3000/userprofile/updateInfo`}>
                Update Your Info
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
