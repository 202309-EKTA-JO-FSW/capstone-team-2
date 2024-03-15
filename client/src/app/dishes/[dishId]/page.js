// "use client";
// import React, { useEffect, useState } from 'react';
// const DishDetailsPage = ({ params }) => {
//   const dishId = params.dishId;
//   const [dish, setDish] = useState(null);

//   useEffect(() => {
//     const fetchDish = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/user/dishes/${dishId}`);
//         const data = await response.json();
//         setDish(data); // Assuming that the dish details are returned directly
//       } catch (error) {
//         console.error("Error fetching dish details:", error);
//       }
//     };

//     fetchDish();
//   }, [dishId]);

//   if (!dish) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <main>
//     <div className="container mx-auto p-4 mt-8">
//       <img className="rounded-lg w-130 h-80" src={dish.dishImage} alt={dish.dishName} />
//       <br></br>
//       <h1 className="text-4xl font-bold mb-4">{dish.dishName}</h1>
//       <p className="text-lg font-semibold mt-4">{dish.description}</p>
//       <p className="text-lg font-semibold mt-2">Price: ${dish.price}</p>
//       <p className="text-lg font-semibold mt-2">Category: {dish.category.join(', ')}</p>
//     </div>
//     </main>
//   );
// };

// export default DishDetailsPage;


"use client";
import React, { useEffect, useState } from 'react';
import DishCard from '../../components/DishCard/DishCard'; 

const DishDetailsPage = ({ params }) => {
  const dishId = params.dishId;
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/dishes/${dishId}`);
        const data = await response.json();
        setDish(data); 
      } catch (error) {
        console.error("Error fetching dish details:", error);
      }
    };

    fetchDish();
  }, [dishId]);

  if (!dish) {
    return <div>Loading...</div>;
  }

  return (
    <DishCard dish={dish} />
  );
};

export default DishDetailsPage;