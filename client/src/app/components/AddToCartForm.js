import React, { useState } from 'react';

const AddToCartForm = ({ onAddToCart, dishName }) => {
  const [quantity, setQuantity] = useState(1);
  const [specificRequests, setSpecificRequests] = useState('');

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Call the onAddToCart function passed from the parent component
    onAddToCart({ quantity, specificRequests });
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg w-96">
      <h2 className="text-lg  text-black font-bold mb-4">{dishName}</h2>
      <form onSubmit={handleAddToCart}>
        <div className="mb-4 flex items-center">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-2">Quantity:</label>
          <div className="flex items-center">
            <button type="button" onClick={decrementQuantity} className="bg-gray-200 text-gray-600 py-1 px-2 rounded-md mr-1">-</button>
            <input
              type="text"
              id="quantity"
              value={quantity}
              readOnly
              className="w-10 text-center border border-black border-gray-300"
            />
            <button type="button" onClick={incrementQuantity} className="bg-gray-200 text-gray-600 py-1 px-2 rounded-md ml-1">+</button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="specificRequests" className="block text-sm font-medium text-gray-700">Specific Requests:</label>
          <textarea
            id="specificRequests"
            value={specificRequests}
            onChange={(e) => setSpecificRequests(e.target.value)}
            className="mt-1 block w-full border border-black rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md w-full">
          Add to Cart
        </button>
      </form>
    </div>
  );
};

export default AddToCartForm;