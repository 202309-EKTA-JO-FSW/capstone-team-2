// "use client"
// import React, { useState, useEffect } from 'react';

// function PastOrders({ userId }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         // Fetch past orders for the user
//         const response = await fetch(`http://localhost:3001/user/orders/past?userID=65e78a0fdc1e5b0138a6c1cc`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const ordersData = await response.json();
//         setOrders(ordersData);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   if (loading) {
//     return <div className="text-white">Loading...</div>;
//   }

//   return (
//     <div className="text-black  py-16">
//       <h2>Past Orders</h2>
//       {orders.length === 0 ? (
//         <p>No past orders available.</p>
//       ) : (
//         <ul>
//           {orders.map(order => (
//             <li key={order._id}>
//               <span>Order ID: {order._id},</span>
//               <span> Total Bill: ${order.totalBill},</span>
//               <span> Status: {order.status},</span>
//               <span> Order Date: {order.orderDate}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default PastOrders;