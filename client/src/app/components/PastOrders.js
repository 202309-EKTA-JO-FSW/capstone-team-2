import React, { useState, useEffect } from "react";

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPastOrders = async () => {
      try {
        const storedUserInfo = localStorage.getItem("userInfo");
        const user = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        const response = await fetch(
          `http://localhost:3001/user/orders/past?userID=${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch past orders");
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
      const fetchOrderItems = async (order) => {
        const updatedItems = [];
        for (const item of order.orderItems) {
          try {
            const dishDetails = await fetchDishDetails(item.dishID);
            updatedItems.push({
              ...item,
              dishDetails,
              totalPrice: item.quantity * dishDetails.price,
            });
          } catch (error) {
            console.error("Error fetching dish details:", error.message);
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
    <div className="py-8 bg-[#F9F9F7]">
      <div className="container mx-auto px-4 h-full">
        <h1 className="text-2xl font-semibold mb-4 text-black ml-5">
          Past Completed Orders
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="md:w-full">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex items-center mb-4">
                  <span className="font-bold text-green-500 ">Status:</span>
                  <span className="ml-1 text-black">{order.status}</span>
                  <div className="flex-grow"></div>
                  <span className="font-bold text-red-500">Total Bill:</span>
                  <span className="ml-1 text-black">{order.totalBill} JOD</span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="font-bold text-black">Order Date:</span>
                  <span className="ml-1 text-black">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <hr className="my-4" />
                <h3 className="text-lg font-semibold mb-6 mt-4 text-black">
                  Ordered Items
                </h3>
                <ul className="list-none p-0">
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="mb-4 flex items-center">
                      {item.dishDetails ? (
                        <>
                          <img
                            src={item.dishDetails.dishImage}
                            alt="Dish"
                            className="h-16 w-16 rounded-lg overflow-hidden object-cover mr-16 ml-5"
                          />
                          <div>
                            <p className="font-bold text-md text-black">
                              {item.dishDetails.dishName}
                            </p>
                            <p className="text-base leading-6 text-black">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-base leading-6 text-black">
                              Price: {item.totalPrice} JOD
                            </p>
                          </div>
                        </>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastOrders;
