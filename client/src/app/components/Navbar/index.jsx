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
    <div className="fixed top-0 left-0 w-full z-50 bg-[#222222]">
      <div className="flex firstPiece items-center space-x-2 py-4 sticky">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse 2xs:pl-4 sm:pl-6 w-[200px] md:pl-10 xl:pl-10"
          onClick={() => changeActivePage("home")}
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            OrderJo
          </span>
        </Link>

        <div
          className="flex justify-end text-[#FFC245] w-full 
          xl:space-x-8 xl:pr-10  xl:text-[16px] 
          md:space-x-4 md:pr-10  2xs:space-x-2 2xs:pr-4 2xs:text-xs"
        >
          <Link href="/restaurents" className="hover:text-blue-400 text-white">
            <span>Restaurents</span>
          </Link>
          <Link href="/dishes" className="hover:text-blue-400 text-white">
            <span>Dishes</span>
          </Link>

          <Link href="/contactus" className="hover:text-blue-400 text-white">
            <span>Contact Us</span>
          </Link>
          <Link href="/about" className="hover:text-blue-400 text-white">
            <span>About</span>
          </Link>

          <div className="inActive">
            {!token && <Log changeActivePage={changeActivePage} />}
          </div>
          {!token && (
            <button
              className={`bg-[#AD343E] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isActive === "home" ? "active" : "inActive"
              }`}
              onClick={() => {
                changeActivePage("signup");
                router.push("/signup");
              }}
            >
              SignUp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
