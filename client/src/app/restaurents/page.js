// import React, { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import MovieCard from "@/components/MovieCard/MovieCard"

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDllYTE2ZDdhNmVjOTAzY2ZmN2YzMDJiMmYyMDU5MiIsInN1YiI6IjY1NjYxN2Q4MTdiNWVmMDEyMjgyNGYzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mF8tp__6uLCuwdeR_lYkKvYC9qoZrvOpqqcOLnpOEDs",
//   },
// }

// export default function Movies() {
//   const router = useRouter()
//   const [movies, setMovies] = useState([])
//   const moviesToList = router.query.movieId
//   const Url = router.query.Url

//   useEffect(() => {
//     fetch(Url + moviesToList, options)
//       .then((res) => res.json())
//       .then((data) => {
//         setMovies(data.results)
//       })
//   }, [router.query.movieId])

//   console.log(movies)
//   console.log(Url + moviesToList)

//   return (
//     <div className="bg-zinc-800 text-white " >
//     <div className="container mx-auto p-4 mt-0">
//       <h1 className="text-4xl font-bold mb-8"> List of {moviesToList} Movies</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">{moviesToList &&
//         movies.map((movie) => (
//           <MovieCard
//             key={movie.id}
//             title={movie.original_title}
//             id={movie.id}
//             image={
//               movie.poster_path
//                 ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
//                 : noimage.src
//             }
//           />
//         ))}</div>
//       </div>
    
//     </div>
//   )
// }
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PostsPage() {
  const [dishes, setdishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/restaurants", {
          next: {
            revalidate: 120,
          },
        });
        const data = await response.json();
        setdishes(data);
        
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchDishes();
  }, []);

  const dishesJSX = dishes.map((dish) => (
    <Link
    key={dish._id} href={`/restaurents/${dish._id}`}
    >
      <div
        className="md:max-xl:flex min-w-[230px] mt-6 mb-6 mx-3 rounded-lg w-[230px] pt-6 pr-4 pb-2 pl-2 px-8 py-12 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
      >
        <h1 className="text-lg font-semibold line-clamp-3 hover:line-clamp-4 max-w-[150px] mx-auto">{dish.name}</h1>
        <img
            className="rounded-lg w-130 h-80"
            src={dish.imageURL}
            alt={dish.name}
          />
        
      </div>
    </Link>
  ));

  return (
    <div>
      <h1> Page</h1>

      {/* POSTS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-none flex-wrap flex-initial justify-center py-6"> {dishesJSX} </div>
       
      </div>
      {/*=== POSTS ==*/}
    </div>
  );
}