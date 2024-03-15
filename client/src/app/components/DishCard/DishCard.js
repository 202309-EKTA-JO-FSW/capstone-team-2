import React from 'react';

const DishCard = ({ dish }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img className="w-full" src={dish.dishImage} alt={dish.dishName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{dish.dishName}</div>
        <p className="text-gray-700 text-base">{dish.description}</p>
        <p className="text-gray-700 text-base mt-2">{dish.price} JOD</p>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;