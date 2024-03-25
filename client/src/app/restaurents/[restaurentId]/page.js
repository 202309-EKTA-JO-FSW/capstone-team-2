// import React , {useEffect, useState}from "react"


// import { useRouter } from "next/router";
// import ActorCard from "@/components/ActorCard/ActorCard";
// import MovieCard from "@/components/MovieCard/MovieCard";

// function Movie (){
//     const router = useRouter()
//     const [movieDetails, setMovieDetails]= useState([])
//     const [movieTrailer, setMovieTrailer] = useState ([])
//     const [similarMovies, setSimilarMovies]=useState ([])
//     const [topActors, setTopActors]= useState([])

    
//    // console.log(router.query.movieId)
//     const movieId = router.query.movieId
//     const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWMzZThjZjk4NjY1ZTllYmEwNmViZTRmZDY3NzQ5NiIsInN1YiI6IjY1NjYwODA2YTM0OTExMDBmZTI1MmQyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8d4tAxdn5rG4IJsZOXy8nseH5FUSp9eIcZhcMbKKmzs'
//         }
//       };
//       useEffect(() => {
//         fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)

//         .then(response => response.json())
//         .then(response => setMovieDetails(response))
//         .catch(err => console.error(err))
//     },[movieId]);
    
//      useEffect(()=>{
//         fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
//        .then(response => response.json())
//        .then(response => setMovieTrailer(response))
//        .catch(err => console.error(err));
//      },[movieId])
//      useEffect(()=>{
//         fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, options)
//        .then(response => response.json())
//        .then(response => setSimilarMovies(response.results.slice(0, 5)))
//        .catch(err => console.error(err));
//      },[movieId])
//      useEffect (()=>{
//         fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
//     .then(response => response.json())
//     .then(response => setTopActors(response.cast.slice(0,5)))
//     .catch(err => console.error(err));
//      },[movieId])

//     return (
//         <div className="bg-zinc-800 text-white p-8" >
//           {/* Movie Poster Section */}
//       <div className="mb-8">
//         <img className="w-1/2 h-auto" src={`https://image.tmdb.org/t/p/original/${movieDetails ? movieDetails.poster_path : ""}`} alt="Movie Poster" />
//       </div>

//       {/* Movie Details Section */}
//       <div className="mb-8">
//         <div className="text-3xl font-bold mb-2">{movieDetails ? movieDetails.original_title : ""}</div>
//         <div className="flex items-center mb-2">
//           <span className="mr-4">Release Date: {movieDetails ? movieDetails.release_date : ""}</span>
//           <span className="mr-4">Run Time: {movieDetails ? movieDetails.runtime + " mins" : ""}</span>
//           <span>Language: {movieDetails ? movieDetails.original_language : ""}</span>
//         </div>
//         <div className="flex items-center">
//           <span className="mr-4">Rating: {movieDetails ? movieDetails.vote_average : ""}</span>
//           <span>Votes: {movieDetails ? "(" + movieDetails.vote_count + ") votes" : ""}</span>
//         </div>
//       </div>

//       {/* Overview Section */}
//       <div className="mb-8">
//         <div className="text-xl font-bold mb-2">Overview</div>
//         <p>{movieDetails ? movieDetails.overview : ""}</p>
//       </div>

//       {/* Top Cast Section */}
//       <div className="mb-8">
//         <div className="text-3xl font-bold mb-4">Top Cast</div>
//         <div className="flex gap-4">
//         {topActors.map((topActor)=>(
//                     <ActorCard  id={topActor.id} image={`https://image.tmdb.org/t/p/original/${topActor?topActor.profile_path:""}`} name={topActor.name}/>
//                 ))}
//         </div>
//       </div>

//       {/* Related Movies Section */}
//       <div className="mb-8">
//         <div className="text-3xl font-bold mb-4">Related Movies</div>
//         <div className="flex gap-4">
//         {similarMovies.map((similarMovie)=>(
//                     <MovieCard id={similarMovie.id} image={`https://image.tmdb.org/t/p/original/${similarMovie?similarMovie.poster_path:""}`} title={similarMovie.original_title}/>
//                 ))}
//         </div>
//       </div>

//       {/* Trailer Section */}
//       <div className="mb-8">
//         <div className="text-3xl font-bold mb-4">Trailer</div>
//         <iframe
//           width="560"
//           height="315"
//           src={`https://www.youtube.com/embed/${
//             movieTrailer &&
//             movieTrailer.results &&
//             movieTrailer.results
//               .filter(result => result.name === "Official Trailer")
//               .map(result => result.key)
//               .join("")
//           }`}
//           title="YouTube video player"
//           //frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>

//       </div>

//       {/* Production Companies Section */}
//       <div>
//         <div className="text-3xl font-bold mb-4">Production Companies</div>
//         <div className="flex gap-4">
//           {movieDetails && movieDetails.production_companies && movieDetails.production_companies.map(company => (
//             <div key={company.id} className="flex items-center">
//               {company.logo_path && <img className="w-12 h-12" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt={company.name} />}
//               <span className="ml-2">{company.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
      
//         </div>
//     )
// }
// export default Movie
/***********************last one **** */
// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from 'react';

// export default function Rest(props) {
//     const restaurantId = props.params.restaurentId;
//     const [dishes, setDishes] = useState([]);

//     useEffect(() => {
//         const fetchDishes = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3001/user/restaurants/${restaurantId}`);
//                 const data = await response.json();
//                 setDishes(data.dishes); // Assuming that the dishes are inside a 'dishes' property
//             } catch (error) {
//                 console.error("Error fetching dishes:", error);
//             }
//         };

//         fetchDishes();
//     }, [restaurantId]);

//     return (
//         <div className="text-center text-slate-100 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
//             <h1 className="text-5xl tracking-wider font-semibold pt-8">Latest Movies</h1>
//             <div className="flex flex-none flex-wrap flex-initial justify-center py-6">
//                 {Array.isArray(dishes) && dishes.map((dish, index) => (
//                     <div
//                         key={index}
//                         className="md:max-xl:flex min-w-[230px] mt-6 mb-6 mx-3 rounded-lg w-[230px] pt-6 pr-4 pb-2 pl-2 px-8 py-12 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
//                     >
//                         <Link href={`/dishes/${dish._id}`}>
//                             <img
//                                 className="rounded-lg w-130 h-80"
//                                 src={dish.dishImage}
//                                 alt={dish.dishName}
//                             />
//                         </Link>
//                         <p
//                             className="text-lg font-semibold line-clamp-3 hover:line-clamp-4 max-w-[150px] mx-auto"
//                         >
//                             {dish.dishName}
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


"use client";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/userContext'; 
import AddToCartForm from '../../components/AddToCartForm';

export default function Rest(props) {
    const restaurantId = props.params.restaurentId;
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null); // Track the selected dish
    const [showAddToCartForm, setShowAddToCartForm] = useState(false); // Track whether to show the "Add to Cart" form
    const { user } = useAuth(); // Access the user object from the context
    const userId = user?._id; // Access the user ID from the user object

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch(`http://localhost:3001/user/restaurants/${restaurantId}`);
                const data = await response.json();
                setDishes(data.dishes); // Assuming that the dishes are inside a 'dishes' property
                setLoading(false);

                // Extract unique category options from the fetched dishes
                const uniqueCategories = [...new Set(data.dishes.map(dish => dish.category).flat())];
                setCategoryOptions(uniqueCategories);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDishes();
    }, [restaurantId]);

    const addToCart = async ({ quantity, specificRequests }) => {
        try {
            if (!selectedDish) {
                throw new Error('No dish selected');
            }
            // Make the request to add the selected dish to the cart with the provided quantity and specific requests
            const response = await fetch('http://localhost:3001/user/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userId,
                    dishID: selectedDish._id,
                    quantity,
                    specificRequests,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add dish to cart');
            }
            console.log('Dish added to cart successfully');
            setSelectedDish(null); // Reset selected dish after adding to cart
            setShowAddToCartForm(false); // Hide the form after adding to cart
        } catch (error) {
            console.error('Error adding dish to cart:', error);
        }
    };

    // Filter dishes based on the entered search term, price range, and category
    const filteredDishes = dishes.filter(dish =>
        dish.dishName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (minPrice === '' || dish.price >= parseFloat(minPrice)) &&
        (maxPrice === '' || dish.price <= parseFloat(maxPrice)) &&
        (category === '' || (dish.category && dish.category.some(cat => cat.toLowerCase().includes(category.toLowerCase()))))
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const dishCards = filteredDishes.map((dish) => (
        <div key={dish._id} className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 mb-8 mx-4 ">
            <Link href={`/dishes/${dish._id}`}>
                <img className="w-full h-96 object-cover" src={dish.dishImage} alt={dish.dishName} />
            </Link>
            <div className="px-4 py-2" style={{ color: "black" }}>
                <div style={{ minHeight: "60px" }}>
                    <div className="font-bold text-lg mb-1 line-clamp-2 hover:line-clamp-none">{dish.dishName}</div>
                </div>          
            
                <p className="text-gray-700 text-sm mt-1" style={{ minHeight: "inherit" }}>{dish.price} JOD</p>
                <p className="text-gray-700 text-sm mt-1">{dish.category}</p>
           
                <div className="mt-2">
                <button onClick={() => { setSelectedDish(dish); setShowAddToCartForm(true); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Add to Cart
                    </button>
                </div>
                
            </div>
        </div>
    ));

    return (
        <div className="text-center bg-gray-100 py-8">
            <h1 className="text-3xl font-semibold mb-6">Dishes List</h1>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by dish name"
                    value={searchTerm}
                    onChange={(e) => {
                        // Remove symbols using regex
                        const sanitizedValue = e.target.value.replace(/[^\w\s]/gi, '');
                        setSearchTerm(sanitizedValue);
                    }}
                    onKeyPress={(e) => {
                        // Prevent numeric characters
                        if (/\d/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    className="px-4 py-2 border rounded-md text-black mr-4"
                    style={{ color: 'black' }}
                />


                <input
                    type="text"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => {
                        // Remove non-numeric characters using regex, allow only one '.'
                        const numericValue = e.target.value.replace(/[^0-9.]/g, '');
                        setMinPrice(numericValue);
                    }}
                    onKeyPress={(e) => {
                        // Prevent non-numeric characters and allow only one '.'
                        if (
                            (isNaN(Number(e.key)) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== '.') ||
                            (e.key === '.' && e.target.value.includes('.'))
                        ) {
                            e.preventDefault();
                        }
                    }}
                    className="px-4 py-2 border rounded-md text-black mr-4"
                    style={{ color: 'black' }}
                />

                <input
                    type="text"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9.]/g, ''); // Allow only numbers and '.'
                        setMaxPrice(newValue);
                    }}
                    className="px-4 py-2 border rounded-md text-black mr-4"
                    style={{ color: 'black' }}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border rounded-md text-black"
                    style={{ color: 'black' }}
                >
                    <option value="">All Categories</option>
                    {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-wrap justify-center">
                {filteredDishes.length > 0 ? dishCards : <div className="text-gray-600">No dishes found</div>}
            </div>
            {/* Add to Cart form */}
            {selectedDish && showAddToCartForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Add to Cart</h2>
                        <AddToCartForm onAddToCart={addToCart} dishName={selectedDish.dishName} />
                        <button onClick={() => setShowAddToCartForm(false)} className="bg-red-500 text-white py-2 px-4 rounded-md mt-4">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

