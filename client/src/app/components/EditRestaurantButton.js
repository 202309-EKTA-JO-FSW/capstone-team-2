// import React, { useState } from 'react';

// const EditRestaurantButton = ({ restaurantId }) => {
//   const [updatedName, setUpdatedName] = useState('');
//   const [updatedLocation, setUpdatedLocation] = useState('');
//   const [updatedImageURL, setUpdatedImageURL] = useState('');
//   const [updatedDescription, setUpdatedDescription] = useState('');
//   const [editSuccess, setEditSuccess] = useState(false);

//   const handleEdit = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/admin/restaurant/edit?restaurantID=${restaurantId}`, {
//         method: 'PUT', // Using PUT method for editing
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           // Include the updated fields
//           name: updatedName,
//           restaurantLocation: updatedLocation,
//           imageURL: updatedImageURL,
//           description: updatedDescription,
//           // Add other fields here if needed
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Restaurant updated successfully:', data);
        
//               // Reload the page after 3 seconds
//               setTimeout(() => {
//                 window.location.reload();
//               }, 3000);
  
//         setEditSuccess(true); // Set editSuccess to true
//         // Reset form fields
//         setUpdatedName('');
//         setUpdatedLocation('');
//         setUpdatedImageURL('');
//         setUpdatedDescription('');
//         // Hide the success message after 3 seconds
//         setTimeout(() => {
//           setEditSuccess(false);
//         }, 3000);
//       } else {
//         console.error('Failed to update restaurant:', response.statusText);
        
//       }
//     } catch (error) {
//       console.error('Error updating restaurant:', error.message);
//     }
//   };
   
//  return (
//     <div className="flex items-center my-4">
//       <input
//         className="border rounded-l py-2 px-3 w-1/4 mr-2 focus:outline-none"
//         type="text"
//         value={updatedName}
//         onChange={(e) => setUpdatedName(e.target.value)}
//         placeholder="Edit Name"
//       />
//       <input
//         className="border rounded-r py-2 px-3 w-1/4 mr-2 focus:outline-none"
//         type="text"
//         value={updatedLocation}
//         onChange={(e) => setUpdatedLocation(e.target.value)}
//         placeholder="Edit Location"
//       />
//       <input
//         className="border rounded py-2 px-3 w-1/2 mr-2 focus:outline-none"
//         type="text"
//         value={updatedImageURL}
//         onChange={(e) => setUpdatedImageURL(e.target.value)}
//         placeholder="Edit Image URL"
//       />
//       <textarea
//         className="border rounded py-2 px-3 w-full focus:outline-none"
//         value={updatedDescription}
//         onChange={(e) => setUpdatedDescription(e.target.value)}
//         placeholder="Edit Description"
//       />
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-r" onClick={handleEdit}>
//         Edit
//       </button>
//       {editSuccess && <p className="text-green-500 ml-2">Restaurant updated successfully</p>}
//     </div>
//   );
// };

// export default EditRestaurantButton;

import React, { useState } from 'react';

const EditRestaurantButton = ({ restaurantId }) => {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');
  const [updatedImageURL, setUpdatedImageURL] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [updatedCuisineType, setUpdatedCuisineType] = useState(''); // TODO: added

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/admin/restaurant/edit?restaurantID=${restaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedName,
          restaurantLocation: updatedLocation,
          imageURL: updatedImageURL,
          description: updatedDescription,
          cuisineType: updatedCuisineType, // TODO: added
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Restaurant updated successfully:', data);
        setEditSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error('Failed to update restaurant:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating restaurant:', error.message);
    }
  };

  const cancelEdit = () => {
    setShowForm(false); // Hide the form
    setUpdatedName('');
    setUpdatedLocation('');
    setUpdatedImageURL('');
    setUpdatedDescription('');
    setUpdatedCuisineType('');
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " style={{borderRadius:"12px" }}
        onClick={() => setShowForm(true)} 
      >
        Edit Restaurant Information
      </button>
      {showForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center" >
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Edit Restaurant Information</h2>
            <div className="flex items-center my-4">
              <input
                className="border rounded-l py-2 px-3 w-1/4 mr-2 focus:outline-none"
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Edit Name"
              />
              <input
                className="border rounded-r py-2 px-3 w-1/4 mr-2 focus:outline-none"
                type="text"
                value={updatedLocation}
                onChange={(e) => setUpdatedLocation(e.target.value)}
                placeholder="Edit Location"
              />
              <input
                className="border rounded py-2 px-3 w-1/2 mr-2 focus:outline-none"
                type="text"
                value={updatedImageURL}
                onChange={(e) => setUpdatedImageURL(e.target.value)}
                placeholder="Edit Image URL"
              />
            </div>
            <input //TODO: added
              className="border rounded py-2 px-3 w-full mb-4 focus:outline-none"
              type="text"
              value={updatedCuisineType}
              onChange={(e) => setUpdatedCuisineType(e.target.value)}
              placeholder="Edit Cuisine Type"
            />
            <textarea
              className="border rounded py-2 px-3 w-full focus:outline-none"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              placeholder="Edit Description"
            />
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
              {editSuccess && <p className="text-green-500 ml-2">Restaurant updated successfully</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRestaurantButton;

