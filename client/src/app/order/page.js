"use client";

import React from "react";
import CurrentOrder from "../components/CurrentOrder";
import PastOrders from "../components/PastOrders";

const OrderPage = () => {
  return (
    <div>
      <CurrentOrder />
      <PastOrders />
    </div>
  );
};

export default OrderPage;
