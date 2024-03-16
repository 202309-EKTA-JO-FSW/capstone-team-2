import React from 'react';

const DeleteDishButton = ({ dishId, onDelete }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this dish?');
    if (confirmDelete) {
      onDelete(dishId);
    }
  };

  return (
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
      Delete Dish
    </button>
  );
};

export default DeleteDishButton;