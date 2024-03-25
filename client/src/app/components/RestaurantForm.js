"use client";
import React, { useState } from "react";

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    restaurantLocation: "",
    imageURL: "",
    description: "",
    dishes: [],
    cuisineType: "", // Added cuisineType field
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://www.localhost:3001/admin/restaurant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Restaurant added successfully:", data);
        setSuccessMessage("Restaurant added successfully");
        setErrorMessage(""); // Reset error message
        // Clear input fields
        setFormData({
          name: "",
          restaurantLocation: "",
          imageURL: "",
          description: "",
          dishes: [],
          cuisineType: "", // Reset cuisineType field
        });

        // Reload the page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        const error = await response.json();
        console.error("Failed to add restaurant:", error.message);
        setErrorMessage("Failed to add restaurant: " + error.message);
        setSuccessMessage(""); // Reset success message
      }
    } catch (error) {
      console.error("Error adding restaurant:", error.message);
      setErrorMessage("Error adding restaurant: " + error.message);
      setSuccessMessage(""); // Reset success message
    }
  };

  return (
    <div>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form
        onSubmit={handleAddRestaurant}
        className="max-w-md mx-auto bg-white p-8 mt-10 rounded-md shadow-md"
      >
        <label className="block mb-4">
          <span className="text-black">Restaurant Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Add Restaurant Name"
            className="form-input mt-1 block w-full rounded-md border border-blue-300 focus:border-blue-500 text-black"
          />
        </label>
        <label className="block mb-4">
          <span className="text-black">Restaurant Location:</span>
          <input
            type="text"
            name="restaurantLocation"
            value={formData.restaurantLocation}
            onChange={handleChange}
            placeholder="Add Restaurant Location"
            className="form-input mt-1 block w-full rounded-md border border-blue-300 focus:border-blue-500 text-black"
          />
        </label>
        <label className="block mb-4">
          <span className="text-black">Restaurant Image URL:</span>
          <input
            type="text"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="Add Restaurant Image URL"
            className="form-input mt-1 block w-full rounded-md border border-blue-300 focus:border-blue-500 text-black"
          />
        </label>
        <label className="block mb-4">
          <span className="text-black">Restaurant Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add Restaurant Description"
            className="form-input mt-1 block w-full rounded-md border border-blue-300 focus:border-blue-500 text-black"
          />
        </label>
        <label className="block mb-4">
          {" "}
          {/* Added Cuisine Type field */}
          <span className="text-black">Cuisine Type:</span>
          <input
            type="text"
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            placeholder="Add Cuisine Type"
            className="form-input mt-1 block w-full rounded-md border border-blue-300 focus:border-blue-500 text-black"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;
