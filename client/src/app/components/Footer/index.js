// import Link from "next/link"
import React from "react"

function Footer() {
  return (
    <div className="text-center h-32 flex items-center justify-around">
      <p className="text-xl text-gray-800">
        Hammam <span className="font-bold">Abu Shehadeh</span>
        <a
          className="flex flex-col "
          href="https://www.linkedin.com/in/hammam-abu-shehadeh-779525295/"
          target={"_blank"}
        >
          LinkedIn
        </a>
        <a
          className="flex flex-col "
          href="https://github.com/HammamAbuShehadeh"
          target={"_blank"}
        >
          Git Hub
        </a>
      </p>
    </div>
  )
}

export default Footer