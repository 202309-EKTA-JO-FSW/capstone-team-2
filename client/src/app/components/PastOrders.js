import React, { useState, useEffect } from 'react';

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPastOrders = async () => {
      try {
        const userID = '65e7896edc1e5b0138a6c1c1'; // Example userID, replace with actual userID
        const response = await fetch(`http://localhost:3001/user/orders/past?userID=${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch past orders');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPastOrders();
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
      const fetchOrderItems = async (order) => {
        const updatedItems = [];
        for (const item of order.orderItems) {
          try {
            const dishDetails = await fetchDishDetails(item.dishID);
            updatedItems.push({ ...item, dishDetails, totalPrice: item.quantity * dishDetails.price });
          } catch (error) {
            console.error('Error fetching dish details:', error.message);
            updatedItems.push({ ...item, dishDetails: null, totalPrice: 0 });
          }
        }
        return { ...order, orderItems: updatedItems };
      };

      Promise.all(orders.map(fetchOrderItems))
        .then((updatedOrders) => {
          setOrders(updatedOrders);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading, orders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Past Completed Orders</h1>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-gray-100 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">Past Order</h2>
              <p className="mb-2">
                <span className="font-bold text-green-500">Status: </span>
                {order.status}
              </p>
              <p className="mb-2">
                <span className="font-bold text-red-500">Total Bill: </span>
                {order.totalBill} JOD
              </p>
              <p className="mb-2">
                <span className="font-bold mb-2">Order Date: </span>
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <h3 className="text-lg font-semibold mb-2">Ordered Items</h3>
              <ul className="list-none p-0">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="mb-2 flex items-center">
                    {item.dishDetails ? (
                      <>
                        <img
                          src={item.dishDetails.dishImage}
                          alt="Dish"
                          className="w-12 h-12 rounded-lg overflow-hidden object-cover mr-2"
                        />
                        <div>
                          <p className="font-bold text-md">{item.dishDetails.dishName}</p>
                          <p className="text-base leading-6">Quantity: {item.quantity}</p>
                          <p className="text-base leading-6">Price: {item.totalPrice} JOD</p>
                        </div>
                      </>
                    ) : (
                      <div>Loading...</div> 
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastOrders;
