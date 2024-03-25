// import React from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// function LogOut() {
//   const router = useRouter(); 
 
//   const handleLogOut = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/user/signout');

//       if (response) {  
//         router.push('/');
//       } else {
//         // Handle signout failure
//         console.error('Signout failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <button
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         onClick={handleLogOut}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default LogOut;