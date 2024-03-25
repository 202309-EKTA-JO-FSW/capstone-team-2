"use client";

import React, { useState, useEffect } from "react";

const CurrentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let storedUserInfo;
  let user;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        storedUserInfo = localStorage.getItem("userInfo");
        user = storedUserInfo ? JSON.parse(storedUserInfo) : null;

        // const userID = '65e7896edc1e5b0138a6c1c1';
        const response = await fetch(
          `http://localhost:3001/user/orders/current?userID=${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
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
      const response = await fetch(
        `http://localhost:3001/user/dishes/${dishID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dish details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching dish details:", error.message);
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
          updatedOrderItems.push({
            ...item,
            dishDetails,
            totalPrice: item.quantity * dishDetails.price,
            loading: false,
          });
        }
        updatedOrders.push({ ...order, orderItems: updatedOrderItems });
      });
      Promise.all(promises).then(() => {
        setOrders(updatedOrders);
      });
    }
  }, [orders, loading]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/orders/${orderId}/cancel?userID=${user._id}`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }
      // Reload the page after successful cancellation
      window.location.reload();
    } catch (error) {
      console.error("Error canceling order:", error.message);
      setError(error.message);
    }
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/orders/${orderId}/confirm`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        // throw new Error('Failed to confirm order');
        const errorMessage = await response.text(); // Get error message from response body
        throw new Error(`Failed to confirm order: ${errorMessage}`);
      }
      // Reload the page after successful confirmation
      window.location.reload();
    } catch (error) {
      console.error("Error confirming order:", error.message);
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
    <div className="mt-28">
      <h1 className="text-3xl font-bold text-gray-900 ml-9">Current Order</h1>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-[#fafafa] rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-bold text-black ">Product</th>
                    <th className="text-left font-bold text-black ">
                      Quantity
                    </th>
                    <th className="text-left font-bold text-black">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-4 text-black">
                        No current orders available
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) =>
                      order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-20 w-20 mr-4 rounded-md"
                                src={
                                  item.dishDetails
                                    ? item.dishDetails.dishImage
                                    : ""
                                }
                                alt="Product image"
                              />
                              <span className="font-semibold text-black">
                                {item.dishDetails
                                  ? item.dishDetails.dishName
                                  : "Unknown"}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <span className="text-center w-8 text-black">
                                {item.quantity}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-black">
                            {item.totalPrice} JOD
                          </td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {orders.map((order) => (
            <div className="md:w-1/4" key={order._id}>
              <div className="bg-[#fafafa] rounded-lg shadow-md p-6 mb-6 px-2">
                <h2 className="text-lg font-semibold mb-4 text-black">
                  Payment Summary
                </h2>
                <div className="flex justify-between mb-2 text-black">
                  <span className="text-green-600 font-bold">Status</span>
                  <span>{order.status}</span>
                </div>
                <div className="flex justify-between mb-2 text-black">
                  <span>Order Date</span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2 text-black mt-8">
                  <span className="font-bold text-red-600">Total Bill</span>
                  <span>{order.totalBill} JOD</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="px-4 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-700 mr-2"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={() => handleConfirmOrder(order._id)}
                    className="px-4 py-2 rounded-md text-base font-medium bg-green-500 text-white hover:bg-green-700 mr-2"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentOrder;
