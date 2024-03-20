// import React, { useState } from 'react';

// const AddToCartForm = ({ onAddToCart }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [specificRequests, setSpecificRequests] = useState('');

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     // Call the onAddToCart function passed from the parent component
//     onAddToCart({ quantity, specificRequests });
//   };

//   return (
//     <form onSubmit={handleAddToCart}>
//       <div>
//         <label htmlFor="quantity">Quantity:</label>
//         <input
//           type="number"
//           id="quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           min={1}
//         />
//       </div>
//       <div>
//         <label htmlFor="specificRequests">Specific Requests:</label>
//         <textarea
//           id="specificRequests"
//           value={specificRequests}
//           onChange={(e) => setSpecificRequests(e.target.value)}
//         />
//       </div>
//       <button type="submit">Add to Cart</button>
//     </form>
//   );
// };

// export default AddToCartForm;

import React, { useState } from 'react';

const AddToCartForm = ({ onAddToCart, dishName }) => {
  const [quantity, setQuantity] = useState(1);
  const [specificRequests, setSpecificRequests] = useState('');

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Call the onAddToCart function passed from the parent component
    onAddToCart({ quantity, specificRequests });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg w-96">
      <h2 className="text-lg font-bold mb-4">{dishName}</h2>
      <form onSubmit={handleAddToCart}>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="specificRequests" className="block text-sm font-medium text-gray-700">Specific Requests:</label>
          <textarea
            id="specificRequests"
            value={specificRequests}
            onChange={(e) => setSpecificRequests(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32"
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