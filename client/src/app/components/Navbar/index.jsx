// "use client";

// import React, { useState, useEffect } from "react"
// import Link from "next/link"
// // import DropdownGenres from "../Dropdown/dropdowngenres"
// // import DropdownMovies from "../Dropdown/dropdownmovies"

// function Navbar() {
//   const [search, setSearch] = useState("")
//   console.log(search)

//   const handleSearch = () => {
//     console.log(search)
//   }

//   const moviesList = [
//     { id: 1, name: "top_rated" },
//     { id: 2, name: "popular" },
//     { id: 3, name: "now_playing" },
//     { id: 4, name: "upcoming" },
//   ]
//   const [genres, setGenres] = useState([])
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDllYTE2ZDdhNmVjOTAzY2ZmN2YzMDJiMmYyMDU5MiIsInN1YiI6IjY1NjYxN2Q4MTdiNWVmMDEyMjgyNGYzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mF8tp__6uLCuwdeR_lYkKvYC9qoZrvOpqqcOLnpOEDs",
//     },
//   }
//   useEffect(() => {
//     fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
//       .then((response) => response.json())
//       .then((response) => setGenres(response.genres))
//       .catch((err) => console.error(err))
//   }, [])

//   console.log(genres)

//   return (
//     <nav className="flex gap-10 items-center bg-zinc-800 py-4 px-2 fixed w-full">
//       <Link
//         href="/"
//         className="flex items-center space-x-3 rtl:space-x-reverse"
//       >
//         <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
//           ReelRater
//         </span>
//       </Link>

//       {/* <div className="flex gap-8 items-center text-white justify-end float-left">
//         <DropdownGenres items={genres} dropDownName={"Genres"} />
//       </div>
//       <div className="flex gap-8 items-center text-white">
//         <DropdownMovies items={moviesList} dropDownName={"Movies"} />
//       </div> */}
//       <a
//         href="./actors"
//         className="hover:text-blue-400  gap-8 items-center text-white"
//       >
//         <span>Actors</span>
//       </a>
//       <div>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className=""
//         />
//         <button
//           onClick={handleSearch}
//           className="hover:text-blue-400  gap-8 items-center text-white ml-2"
//         >
//           Search
//         </button>
//       </div>
//     </nav>
//   )
// }

// export default Navbar


"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../Dropdown';
import LogOut from '../Button/LogOut';
import SignIn from '../Button/SignIn';
import { useAuth } from '@/app/context/userContext';
// import SearchBox from '../SearchBox';

function Navbar() {
    const [search, setSearch] = useState('');
    // const [categories, setCategories] = useState([]);
    const { user } = useAuth();

    // useEffect(() => {
    //   //  for categories is '/api/categories'
    //     fetch('http://localhost:3001/api/categories')
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setCategories(data);
    //         })
    //         .catch((error) => {
    //             console.error('Failed to fetch categories:', error);
    //         });
    // }, []);

    return (
        <nav className="flex gap-10 items-center bg-zinc-800 py-4 px-2 fixed w-full">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                    OrderJo
                </span>
            </Link>

            {/* <div className="flex gap-8 items-center text-white">
                <Dropdown items={categories} placeholder="Categories" />
                You can add more dropdowns here with different items or placeholders as needed
            </div> */}
            <Link href="/restaurents" className="hover:text-blue-400 text-white">
                <span>Restaurents</span>
            </Link>
            <Link href="/dishes" className="hover:text-blue-400 text-white">
                <span>Dishes</span>
            </Link>
            {/* <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} /> */}
            <Link href="/contactus" className="hover:text-blue-400 text-white">
                <span>Contact Us</span>
            </Link>
            <Link href="/about" className="hover:text-blue-400 text-white">
                <span>About</span>
            </Link>
            <Link href="/admin" className="hover:text-blue-400 text-white">
                <span>Admin</span>
            </Link>
            <Link href={user?` /userprofile/user/${user._id}`: '/userprofile'} className="hover:text-blue-400 text-white">
                <span>Profile</span>
            </Link>
            {user ? (
                <div className="hover:text-blue-400 text-white" >
                    <LogOut />
                </div>
            ) : (
                <div className="hover:text-blue-400 text-white">
                    <SignIn />
                </div>
            )}
        </nav>
    );
}

export default Navbar;