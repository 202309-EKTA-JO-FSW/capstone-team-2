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
// "use client";

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function PostsPage() {
//   const [dishes, setdishes] = useState([]);

//   useEffect(() => {
//     const fetchDishes = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/admin/restaurants", {
//           next: {
//             revalidate: 120,
//           },
//         });
//         const data = await response.json();
//         setdishes(data);
        
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchDishes();
//   }, []);

//   const dishesJSX = dishes.map((dish) => (
//     <Link
//     key={dish._id} href={`/restaurents/${dish._id}`}
//     >
//       <div
//         className="md:max-xl:flex min-w-[230px] mt-6 mb-6 mx-3 rounded-lg w-[230px] pt-6 pr-4 pb-2 pl-2 px-8 py-12 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
//       >
//         <h1 className="text-lg font-semibold line-clamp-3 hover:line-clamp-4 max-w-[150px] mx-auto">{dish.name}</h1>
//         <img
//             className="rounded-lg w-130 h-80"
//             src={dish.imageURL}
//             alt={dish.name}
//           />
        
//       </div>
//     </Link>
//   ));

//   return (
//     <div>
//       <h1> Page</h1>

//       {/* POSTS */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <div className="flex flex-none flex-wrap flex-initial justify-center py-6"> {dishesJSX} </div>
       
//       </div>
//       {/*=== POSTS ==*/}
//     </div>
//   );
// }


/*
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PostsPage() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/restaurants", {
          next: {
            revalidate: 120,
          },
        });
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchDishes();
  }, []);

  // useEffect(() => {
  //   const applyLocationFilter = () => {
  //     if (selectedLocation) {
  //       const filtered = dishes.filter(
  //         (dish) => dish.restaurantLocation.toLowerCase() === selectedLocation.toLowerCase()
  //       );
  //       setFilteredDishes(filtered);
  //     } else {
  //       setFilteredDishes(dishes); // Reset filter if no location selected
  //     }
  //   };

  //   applyLocationFilter(); // Apply filter on initial render and changes
  // }, [dishes, selectedLocation]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...dishes]; // Copy dishes array to avoid mutating the original

      // Filter by location
      if (selectedLocation) {
        filtered = filtered.filter(
          (dish) => dish.restaurantLocation.toLowerCase() === selectedLocation.toLowerCase()
        );
      }

      // Filter by cuisine type
      // Check if selectedCuisine is provided and filter dishes accordingly
if (selectedCuisine) {
  filtered = filtered.filter(
    (dish) => dish.cuisineType && dish.cuisineType.toLowerCase() === selectedCuisine.toLowerCase()
  );
}


      setFilteredDishes(filtered);
    };

    applyFilters(); // Apply filters on initial render and changes
  }, [dishes, selectedLocation, selectedCuisine]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setSelectedCuisine(event.target.value);
  };

  const dishesJSX = (dishesToRender) =>
    dishesToRender.map((dish) => (
      <Link key={dish._id} href={`/restaurents/${dish._id}`}>
        <div className="md:max-xl:flex min-w-[230px] mt-6 mb-6 mx-3 rounded-lg w-[230px] pt-6 pr-4 pb-2 pl-2 px-8 py-12 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110">
          <h1 className="text-lg font-semibold line-clamp-3 hover:line-clamp-4 max-w-[150px] mx-auto">
            {dish.name}
          </h1>
          <img className="rounded-lg w-130 h-80" src={dish.imageURL} alt={dish.name} />
        </div>
      </Link>
    ));
*/
//   return (
//     <div className='py-16 '>
//       {/* Location dropdown */}
//       <select value={selectedLocation} onChange={handleLocationChange}>
//         <option value="">All Locations</option>
//         {/* Add options dynamically based on unique locations in dishes */}
//         {Array.from(new Set(dishes.map((dish) => dish.restaurantLocation))).map((location) => (
//           <option key={location} value={location}>
//             {location}
//           </option>
//         ))}
//       </select>

//       {/* Cuisine type dropdown */}
//       <select value={selectedCuisine} onChange={handleCuisineChange}>
//         <option value="">All Cuisine Types</option>
//         {Array.from(new Set(dishes.map((dish) => dish.cuisineType))).map((cuisine) => (
//           <option key={cuisine} value={cuisine}>
//             {cuisine}
//           </option>
//         ))}
//       </select>

//       {/* Dishes */}
//       <div className="flex flex-none flex-wrap flex-initial justify-center py-6">
//         {dishesJSX(filteredDishes)}
//       </div>

//       {/* POSTS */}
//       {/* <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <div className="flex flex-none flex-wrap flex-initial justify-center py-6">{dishesJSX(filteredDishes)}</div>
//       </div> */}
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/userContext';

export default function PostsPage() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  const {user}= useAuth()
  console.log(user)

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/restaurants", {
          next: {
            revalidate: 120,
          },
        });
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...dishes]; // Copy dishes array to avoid mutating the original

      // Filter by location
      if (selectedLocation) {
        filtered = filtered.filter(
          (dish) => dish.restaurantLocation.toLowerCase() === selectedLocation.toLowerCase()
        );
      }

      // Filter by cuisine type
      if (selectedCuisine) {
        filtered = filtered.filter(
          (dish) => dish.cuisineType && dish.cuisineType.toLowerCase() === selectedCuisine.toLowerCase()
        );
      }

      setFilteredDishes(filtered);
    };

    applyFilters(); // Apply filters on initial render and changes
  }, [dishes, selectedLocation, selectedCuisine]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setSelectedCuisine(event.target.value);
  };
  const dishesJSX = (dishesToRender) =>
  dishesToRender.map((dish) => (

    <Link key={dish._id} href={`/restaurents/${dish._id}`}>
      <div className="  card" style={{ border: "5px solid grey" }}>

        <img className="" style={{ background: "grey" }} src={dish.imageURL} alt={dish.name} />
        <div className="card__content | flow">
          <div className="card__content--container | flow">
            <h1 className=" card__title" style={{ color: "white" }}>
              {dish.name}
            </h1>
            <p className="text-sm text-gray-700 mt-1 line-clamp-3 card__description" style={{color:"white"}}>{dish.description}</p>
          </div>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className='py-16'>
      {/* Location dropdown */}
      <select value={selectedLocation} onChange={handleLocationChange}>
        <option value="">All Locations</option>
        {Array.from(new Set(dishes.map((dish) => dish.restaurantLocation))).map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      {/* Cuisine type dropdown */}
      <select value={selectedCuisine} onChange={handleCuisineChange}>
        <option value="">All Cuisine Types</option>
        {Array.from(new Set(dishes.map((dish) => dish.cuisineType))).map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>

      {/* Display remaining count of filtered dishes */}
      <p>Remaining Cards: {filteredDishes.length}</p>

      {/* Dishes */}
      <div className="flex flex-none flex-wrap flex-initial justify-center py-6" style={{rowGap:"20px" , columnGap:"20px"}}>
        {dishesJSX(filteredDishes)}
      </div>
    </div>
  );
}

