// "use client";
// import React, { useEffect, useState } from 'react';
// import DeleteRestaurantButton from '../components/DeleteRestaurantButton';
// import EditRestaurantButton from '../components/EditRestaurantButton';
// import RestaurantForm from '../components/RestaurantForm';

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     // Fetch the list of restaurants from the server
//     const fetchRestaurants = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/admin/restaurants');
//         const data = await response.json();
//         setRestaurants(data);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   const handleDelete = (restaurantId) => {
//     // Remove the deleted restaurant from the list
//     setRestaurants(restaurants.filter((restaurant) => restaurant._id !== restaurantId));
//   };

//   const handleViewDishes = async (restaurantId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/admin/dishes/${restaurantId}`);
//       const data = await response.json();
//       console.log('Dishes for restaurant:', data);
//       // Handle displaying the dishes in your UI (e.g., modal, new page)
//     } catch (error) {
//       console.error('Error fetching dishes:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto bg-white ">
//       <div className="bg-zinc-800 text-white " >
//         <div className="container mx-auto p-4 mt-0">
//           <h1 className="text-4xl font-bold mb-8"> Add New Restaurant</h1>
//           <RestaurantForm/>
//           <br></br>
//         </div>
//       </div>
//       <br></br>
//       <h1 className="text-4xl font-bold mb-8 mt-8 ml-8 " >Current Restaurants List</h1>
//       <ul>
//         {restaurants.map((restaurant, index) => (
//           <li key={restaurant._id} className={`border border-black rounded p-6 ${index !== 0 ? 'mt-8' : ''} mx-8 `}>
//             <div className="flex items-center">
//               <img src={restaurant.imageURL} className="w-24 h-24 rounded-full mr-8" alt={restaurant.name} />
//               <div>
//                 <p className="text-lg font-bold"> {restaurant.name}</p>
//                 <p className="text-gray-500">{restaurant.restaurantLocation}</p>
//                 <p className="text-gray-600"> {restaurant.description}</p>
//                 <div className="mt-4">
//                   <EditRestaurantButton restaurantId={restaurant._id} />
//                   <DeleteRestaurantButton restaurantId={restaurant._id} onDelete={handleDelete} />
//                   {/* <button onClick={() => handleViewDishes(restaurant._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded">
//                     View Dishes
//                   </button> */}
//                 </div>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <br></br>
//     </div>
//   );
// };

// export default RestaurantList;


"use client";
import React, { useEffect, useState } from 'react';
import DeleteRestaurantButton from '../components/DeleteRestaurantButton';
import EditRestaurantButton from '../components/EditRestaurantButton';
import RestaurantForm from '../components/RestaurantForm';
import AddDishButton from '../components/AddDishButton'; 
import Link from 'next/link';
import AdminContactSubmissions from '../components/admincontactsubmissions';

const RestaurantList = ({ router }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/restaurants');
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = (restaurantId) => {
    setRestaurants(restaurants.filter((restaurant) => restaurant._id !== restaurantId));
  };

  const handleViewDishes = async (restaurantId) => {
    try {
      const response = await fetch(`http://localhost:3001/admin/restaurants/${restaurantId}`);
      const data = await response.json();
      console.log('Dishes for restaurant:', data);
      // Handle displaying the dishes in your UI (e.g., modal, new page)
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  return (
    <div className="container mx-auto bg-white ">
      <div className="bg-zinc-800 text-white ">
        <div className="container mx-auto p-4 mt-0">
          <h1 className="text-4xl font-bold mb-8"> Add New Restaurant</h1>
          <RestaurantForm />
          <br></br>
        </div>
      </div>
      <br></br>
      <h1 className="text-4xl font-bold mb-8 mt-8 ml-8 ">Current Restaurants List</h1>
      <ul>
        {restaurants.map((restaurant, index) => (
          <li
            key={restaurant._id}
            className={`border border-black rounded p-6 ${index !== 0 ? 'mt-8' : ''} mx-8 `}
          >
            <div className="flex items-center">
              <img
                src={restaurant.imageURL}
                className="w-24 h-24 rounded-full mr-8"
                alt={restaurant.name}
              />
              <div>
                <p className="text-lg font-bold"> {restaurant.name}</p>
                <p className="text-gray-500">{restaurant.restaurantLocation}</p>
                <p className="text-gray-600"> {restaurant.description}</p>
                <div className="mt-4 flex">
                  <EditRestaurantButton restaurantId={restaurant._id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded" />
                  <DeleteRestaurantButton restaurantId={restaurant._id} onDelete={handleDelete} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded" />
                  <Link
                  key={restaurant._id} href={`/admin/${restaurant._id}`}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 rounded"
                  >
                    View Dishes
                  </Link>
                  <AddDishButton restaurantId={restaurant._id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <br></br>
      <div>
      <AdminContactSubmissions/>
      </div>
    </div>
  );
};

export default RestaurantList;