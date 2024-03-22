"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function PostsPage() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/admin/restaurants",
          {
            next: {
              revalidate: 120,
            },
          }
        );
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
          (dish) =>
            dish.restaurantLocation.toLowerCase() ===
            selectedLocation.toLowerCase()
        );
      }

      // Filter by cuisine type
      if (selectedCuisine) {
        filtered = filtered.filter(
          (dish) =>
            dish.cuisineType &&
            dish.cuisineType.toLowerCase() === selectedCuisine.toLowerCase()
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
        <div className="  card" style={{ border: "5px solid black" }}>
          <img
            className=""
            style={{ background: "grey" }}
            src={dish.imageURL}
            alt={dish.name}
          />
          <div className="card__content | flow">
            <div className="card__content--container | flow">
              <h1 className=" card__title" style={{ color: "white" }}>
                {dish.name}
              </h1>
              <p
                className="text-sm text-gray-700 mt-1 line-clamp-3 card__description"
                style={{ color: "white" }}
              >
                {dish.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    ));

  return (
    <div className="py-16">
      {/* Location dropdown */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          style={{
            textAlign: "center",
            border: "6px solid transparent",
            outline: "2px solid black",
            marginRight: "20px",
            borderRadius: "12px",
            backgroundColor: "#AD343E",
          }}
        >
          <option value="">All Locations</option>
          {Array.from(
            new Set(dishes.map((dish) => dish.restaurantLocation))
          ).map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Cuisine type dropdown */}
        <select
          value={selectedCuisine}
          onChange={handleCuisineChange}
          style={{
            textAlign: "center",
            border: "6px solid transparent",
            outline: "2px solid black",
            borderRadius: "12px",
            backgroundColor: "#AD343E",
          }}
        >
          <option value="">All Cuisine Types</option>
          {Array.from(new Set(dishes.map((dish) => dish.cuisineType))).map(
            (cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            )
          )}
        </select>
      </div>

      {/* Display remaining count of filtered dishes */}
      <p>Remaining Cards: {filteredDishes.length}</p>

      {/* Dishes */}
      <div
        className="flex flex-none flex-wrap flex-initial justify-center py-6"
        style={{ rowGap: "20px", columnGap: "20px" }}
      >
        {dishesJSX(filteredDishes)}
      </div>
    </div>
  );
}
