"use client";

import React, { useState, useEffect } from 'react';

const CurrentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userID = '65e7896edc1e5b0138a6c1c1'; 
        const response = await fetch(`http://localhost:3001/user/orders/current?userID=${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchDishDetails = async (dishID) => {
    try {
      const response = await fetch(`http://localhost:3001/user/dishes/${dishID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dish details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dish details:', error.message);
      return null;
    }
  };

  useEffect(() => {
    if (!loading && orders.length > 0) {
      const updatedOrders = [];
      const promises = orders.map(async (order) => {
        const updatedOrderItems = [];
        for (const item of order.orderItems) {
          const dishDetails = await fetchDishDetails(item.dishID);
          updatedOrderItems.push({ ...item, dishDetails, totalPrice: item.quantity * dishDetails.price, loading: false });
        }
        updatedOrders.push({ ...order, orderItems: updatedOrderItems });
      });
      Promise.all(promises)
        .then(() => {
          setOrders(updatedOrders);
        });
    }
  }, [orders, loading]);
  
  const handleCancelOrder = async (orderId, userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/orders/${orderId}/cancel?userID=${userId}`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
      // Reload the page after successful cancellation
      window.location.reload();
    } catch (error) {
      console.error('Error canceling order:', error.message);
      setError(error.message);
    }
  };
  
  const handleConfirmOrder = async (orderId, userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/orders/${orderId}/confirm`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        // throw new Error('Failed to confirm order');
        const errorMessage = await response.text(); // Get error message from response body
        throw new Error(`Failed to confirm order: ${errorMessage}`);
      }
      // Reload the page after successful confirmation
      window.location.reload();
    } catch (error) {
      console.error('Error confirming order:', error.message);
      setError(error.message);
    }
  };
  
    if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <br></br>
      <br></br>
      <br></br>

    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <div className="w-1/3 bg-gray-100 rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-semibold mb-4">Payment Summary</h2>
          <ul className="list-none p-0">
            {orders.map((order) => (
              <li key={order._id} className="mb-4">
                <p className="font-bold text-xl mb-2">Current Order</p>
                <p className="mb-4">
                  <span className="font-bold text-green-500">Status: </span>
                  {order.status}
                </p>
                <p className="mb-4">
                  <span className="font-bold text-red-500">Total Bill: </span>
                  {order.totalBill} JOD
                </p>
                <p  className="mb-4">
                  <span className="font-bold mb-4">Order Date: </span>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <div className="px-4 py-2 rounded-md text-base font-medium bg-green-500 text-white hover:bg-green-700 mb-2">
                <button
                  onClick={() => handleConfirmOrder(order._id, order.userID)}
                >
                  Confirm Order
                </button>
                </div>
                <div className="px-4 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-700 mb-6">
                <button
                  onClick={() => handleCancelOrder(order._id, order.userID)}
                >
                  Cancel Order
                </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 bg-gray-100 rounded-lg shadow-md p-4">
          <h1 className="text-3xl font-bold mb-4">Your Basket</h1>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orders.map((order) => (
              order.orderItems.map((item) => (
                <li key={item._id.$oid} className="mb-4 flex items-center">
                  <a href={`http://localhost:3000/dishes/${item.dishID}`}>
                    <img
                      src={item.dishDetails? item.dishDetails.dishImage : ''}
                      alt="Dish"
                      className="w-20 h-20 rounded-lg overflow-hidden object-cover mr-4"
                    />
                  </a>
                  <div>
                    <p className="font-bold text-md">{item.dishDetails ? item.dishDetails.dishName : 'Unknown'}</p>
                    <p className="text-base  leading-6">Quantity: {item.quantity}</p>
                    <p className="text-base leading-6">Price: {item.totalPrice} JOD</p>
                  </div>
                </li>
              ))
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);
};

export default CurrentOrder;

