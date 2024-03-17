"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const DishesList = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);

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

        // Extract unique category options from the fetched dishes
        const uniqueCategories = [...new Set(data.map(dish => dish.category).flat())];
        setCategoryOptions(uniqueCategories);
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
    <div key={dish._id} className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 mb-8 mx-4">
      <Link href={`/dishes/${dish._id}`}>
        <img className="w-full h-96 object-cover" src={dish.dishImage} alt={dish.dishName} />
      </Link>
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-1 line-clamp-2 hover:line-clamp-none">{dish.dishName}</div>
        <p className="text-gray-700 text-sm line-clamp-2 hover:line-clamp-none">{dish.description}</p>
        <p className="text-gray-700 text-sm mt-1">{dish.price} JOD</p>
        <p className="text-gray-700 text-sm mt-1">{dish.category}</p>
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
    </div>
  );
};

export default DishesList;
