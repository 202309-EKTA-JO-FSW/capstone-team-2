import React, { useState } from "react"
import Link from "next/link"

export default function DropdownGenres({ items, dropDownName }) {
  console.log(items)

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  const transClass = isOpen ? "flex" : "hidden"
  const Url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&with_genres=`

  return (
    <>
      <div className="relative">
        <button type="button" className="hover:text-blue-400" onClick={toggle}>
          {dropDownName}
        </button>
        <div
          className={`absolute top-8 z-30 w-[250px] min-h-auto flex flex-col py-4 bg-zinc-400 rounded-md ${transClass}`}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1"
              href={{
                pathname: "/movies",
                query: { movieId: item.id, Url: Url },
              }}
              onClick={toggle}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      {isOpen ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </>
  )
}