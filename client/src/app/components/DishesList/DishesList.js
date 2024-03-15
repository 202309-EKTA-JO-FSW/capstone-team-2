//DishesList.js
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const DishesList = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/dishes");
        if (!response.ok) {
          throw new Error('Failed to fetch dishes');
        }
        const data = await response.json();
        setDishes(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const addToCart = async (dishID) => {
    console.log("Adding dish to cart:", dishID);
    try {
      const response = await fetch("http://localhost:3001/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: '65e789e6dc1e5b0138a6c1c9',
          dishID: dishID,
          quantity: 1, 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add dish to cart');
      }

      console.log("Dish added to cart successfully");

    } catch (error) {
      console.error("Error adding dish to cart:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const dishCards = dishes.map((dish) => (
    <div key={dish._id} className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 mb-8 mx-4">
      <Link href={`/dishes/${dish._id}`}>
        <img className="w-full h-96 object-cover" src={dish.dishImage} alt={dish.dishName} />
      </Link>
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-1 line-clamp-2 hover:line-clamp-none">{dish.dishName}</div>
        <p className="text-gray-700 text-sm line-clamp-2 hover:line-clamp-none">{dish.description}</p>
        <p className="text-gray-700 text-sm mt-1">{dish.price} JOD</p>
        <div className="mt-2">
          <button onClick={() => addToCart(dish._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="text-center bg-gray-100 py-8">
      <h1 className="text-3xl font-semibold mb-6">Dishes List</h1>
      <div className="flex flex-wrap justify-center">
        {dishes.length > 0 ? dishCards : <div className="text-gray-600">No dishes found</div>}
      </div>
    </div>
  );
};

export default DishesList;