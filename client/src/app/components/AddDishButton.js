

import React, { useState } from 'react';

const AddDishButton = ({ restaurantId }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dishName: '',
    dishImage: '',
    description: '',
    price: 0,
    category: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch(`http://localhost:3001/admin/dishtorestaurant?restaurantID=${restaurantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data to the server
      });

      if (response.ok) {
        setShowSuccessMessage(true); // success message
        setFormData({
          dishName: '',
          dishImage: '',
          description: '',
          price: 0,
          category: '',
        }); // Clear form data
        setShowForm(false); // Hide the form
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after some time
        }, 3000);
      } else {
        console.error('Failed to add dish:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding dish:', error.message);
    }
  };

  return (
    <div>
      {!showForm && !showSuccessMessage && (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(true)}
        >
          Add New Dish
        </button>
      )}
      {showForm && !showSuccessMessage && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Dish</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="dishName" className="block text-sm font-bold mb-2">Dish Name</label>
                <input
                  type="text"
                  id="dishName"
                  name="dishName"
                  value={formData.dishName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter dish name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dishImage" className="block text-sm font-bold mb-2">Dish Image URL</label>
                <input
                  type="text"
                  id="dishImage"
                  name="dishImage"
                  value={formData.dishImage}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-bold mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter description"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-bold mb-2">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter price"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-bold mb-2">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter category"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showSuccessMessage && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          Dish added successfully!
        </div>
      )}
    </div>
  );
};

export default AddDishButton;
