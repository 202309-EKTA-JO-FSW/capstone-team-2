"use client";
import React, { useEffect, useState } from "react";
import Log from "../Button/Log";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(false);
  const [isActive, setActive] = useState("");

  useEffect(() => {
    let activePage = localStorage.getItem("activePage");
    changeActivePage(activePage);
  }, []);

  function changeActivePage(pageName) {
    localStorage.setItem("activePage", pageName);
    setActive(pageName);
  }

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 bg-[#222222]"
      style={{ paddingBottom: "8px" }}
    >
      <div className="flex firstPiece items-center space-x-2 py-4 sticky">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse 2xs:pl-4 sm:pl-6 w-[200px] md:pl-10 xl:pl-10"
          onClick={() => changeActivePage("home")}
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white mr-4  hover:text-[#FFC245] ">
            OrderJo
          </span>
        </Link>

        <div
          className="flex justify-start text-[#FFC245] w-full 
          xl:space-x-8 xl:pr-10  xl:text-[16px] 
          md:space-x-4 md:pr-10  2xs:space-x-2 2xs:pr-4 2xs:text-xs"
        >
          <Link
            href="/restaurents"
            className="hover:text-blue-400 text-white"
            style={{ marginTop: "9px" }}
          >
            <span>Restaurants</span>
          </Link>
          <Link
            href="/dishes"
            className="hover:text-blue-400 text-white"
            style={{ marginTop: "9px" }}
          >
            <span>Dishes</span>
          </Link>

          <Link
            href="/contactus"
            className="hover:text-blue-400 text-white"
            style={{ marginTop: "9px" }}
          >
            <span>Contact Us</span>
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-400 text-white"
            style={{ marginTop: "9px" }}
          >
            <span>About</span>
          </Link>

          
        </div>
        <div className="inActive">
            {!token && <Log changeActivePage={changeActivePage} />}
          </div>
      </div>
    </div>
  );
}

export default Navbar;
