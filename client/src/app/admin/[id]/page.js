// admin/[id]/page.js
"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DeleteDishButton from '../../components/DeleteDishButton';
import EditDishButton from '../../components/EditDishButton';

export default function Rest(props) {
  const restaurantId = props.params.id;
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/restaurants/${restaurantId}`);
        const data = await response.json();
        setDishes(data.dishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, [restaurantId]);

  const handleDeleteDish = async (dishId) => {
    try {
      const response = await fetch('http://localhost:3001/admin/dishdelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: [dishId] }),
      });
      if (response.ok) {
        setDishes(dishes.filter(dish => dish._id !== dishId));
      } else {
        console.error('Failed to delete dish:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  return (
    <div className="text-center text-slate-100 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
      <h1 className="text-5xl tracking-wider font-semibold pt-8" style={{marginTop:"50px"}}>Restaurant Dishes</h1>
      <div className="flex flex-none flex-wrap flex-initial justify-center py-6">
        {Array.isArray(dishes) && dishes.map((dish, index) => (
          <div
          key={index}
          className="md:max-xl:flex min-w-[300px] mt-6 mb-6 mx-3 rounded-lg w-[230px] pt-6 pr-4 pb-2 pl-2 px-8 py-12 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
        >
            <Link href={`/dishes/${dish._id}`}>
              <img
                className="rounded-lg w-130 h-80"
                src={dish.dishImage}
                alt={dish.dishName}
              />
            </Link>
            <p
              className="text-lg font-semibold line-clamp-3 hover:line-clamp-4 max-w-[150px] mx-auto"
             style={{minHeight:"100px"}}>
              {dish.dishName}
            </p>
            <div className="flex justify-between mt-2">
              <EditDishButton dishId={dish._id} />
              <DeleteDishButton dishId={dish._id} onDelete={handleDeleteDish} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}