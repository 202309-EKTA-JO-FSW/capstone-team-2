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

/*
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

*/

"use client";
import React, { useEffect, useState } from 'react';

const DishDetailsPage = ({ params }) => {
  const dishId = params.dishId;
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/dishes/${dishId}`);
        const data = await response.json();
        setDish(data); // Assuming that the dish details are returned directly
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
    <main>
      <div className="container mx-auto p-4 mt-8 change_flex" style={{ backgroundColor: 'white', color: 'black', display:"flex", rowGap: "30px",height:"fit-content"}}>
        <img
          className="rounded-lg"
          style={{
            position: 'relative',
            marginLeft: '10px',
            marginTop: '55px',
            width: '800px',
            height: '450px',
            borderRadius: '12px',
            backgroundImage: `url(${dish.dishImage})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }} 
        />
        <div className="container mx-auto p-4 mt-8" style={{ backgroundColor: 'white', color: 'black', padding: '20px',display:"flex", flexDirection:"column", columnGap: "10px", paddingLeft:"60px" , fontFamily:"Regular 400 Italic" }}>
          <br />
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#080a0b', fontFamily: 'inherit', fontWeight: 700, lineHeight: '40px' }}>{dish.dishName}</h1>
          <div style={{minHeight:"40%" }}>
            <p className="text-lg font-semibold mt-4" style={{ color: '#080a0b', fontFamily: 'inherit', fontWeight: 700, lineHeight: '40px' }}>{dish.description}</p>
          </div>
          <div style={{width: "fit-content"}}>
            <p className="text-lg font-semibold mt-2" style={{ color: '#FFFFFF', fontFamily: 'inherit', fontWeight: 700, lineHeight: '30px', border: "0px", borderRadius: "12px", backgroundColor: "#080808", paddingLeft:"8px",paddingRight:"8px" }}>{dish.category.join(', ')}</p>
          </div>
          <p className="text-lg font-semibold mt-2" style={{ color: '#080a0b', fontFamily: 'inherit', fontWeight: 700, lineHeight: '40px'}}>Price: ${dish.price}</p>
          <div style={{}}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">Order</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DishDetailsPage;