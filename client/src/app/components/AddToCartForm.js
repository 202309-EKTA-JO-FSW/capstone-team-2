import React, { useState } from 'react';

const AddToCartForm = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [specificRequests, setSpecificRequests] = useState('');

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Call the onAddToCart function passed from the parent component
    onAddToCart({ quantity, specificRequests });
  };

  return (
    <form onSubmit={handleAddToCart}>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min={1}
        />
      </div>
      <div>
        <label htmlFor="specificRequests">Specific Requests:</label>
        <textarea
          id="specificRequests"
          value={specificRequests}
          onChange={(e) => setSpecificRequests(e.target.value)}
        />
      </div>
      <button type="submit">Add to Cart</button>
    </form>
  );
};

export default AddToCartForm;