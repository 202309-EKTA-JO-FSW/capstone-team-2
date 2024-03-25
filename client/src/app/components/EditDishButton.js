import React, { useState } from "react";

const EditDishButton = ({ dishId }) => {
  const [updatedDishName, setUpdatedDishName] = useState("");
  const [updatedDishImage, setUpdatedDishImage] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/dish/edit?dishID=${dishId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dishID: dishId,
            dishName: updatedDishName,
            dishImage: updatedDishImage,
            description: updatedDescription,
            price: updatedPrice,
            category: updatedCategory,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Dish updated successfully:", data);
        setEditSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error("Failed to update dish:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating dish:", error.message);
    }
  };

  const cancelEdit = () => {
    setShowForm(false);
    setUpdatedDishName("");
    setUpdatedDishImage("");
    setUpdatedDescription("");
    setUpdatedPrice(0);
    setUpdatedCategory("");
  };

  return (
    <div>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(true)}
      >
        Edit Dish
      </button>
      {showForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Edit Dish</h2>
            <div className="flex items-center my-4">
              <input
                className="border rounded py-2 px-3 w-full focus:outline-none"
                type="text"
                value={updatedDishName}
                onChange={(e) => setUpdatedDishName(e.target.value)}
                placeholder="Edit Dish Name"
              />
            </div>
            <div className="flex items-center my-4">
              <input
                className="border rounded py-2 px-3 w-full focus:outline-none"
                type="text"
                value={updatedDishImage}
                onChange={(e) => setUpdatedDishImage(e.target.value)}
                placeholder="Edit Dish Image URL"
              />
            </div>
            <textarea
              className="border rounded py-2 px-3 w-full focus:outline-none"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              placeholder="Edit Description"
            />
            <div className="flex items-center my-4">
              <input
                className="border rounded py-2 px-3 w-1/2 mr-2 focus:outline-none"
                type="number"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
                placeholder="Edit Price"
              />
              <input
                className="border rounded py-2 px-3 w-1/2 mr-2 focus:outline-none"
                type="text"
                value={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
                placeholder="Edit Category"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              {editSuccess && (
                <p className="text-green-500 ml-2">Dish updated successfully</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDishButton;
