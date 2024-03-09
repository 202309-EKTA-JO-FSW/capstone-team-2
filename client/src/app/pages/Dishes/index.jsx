/****************new */
import React from "react"
import Link from "next/link"
import ActorCard from "@/components/ActorCard/ActorCard"
import noimage from "@/assets/images/noimage.png"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDllYTE2ZDdhNmVjOTAzY2ZmN2YzMDJiMmYyMDU5MiIsInN1YiI6IjY1NjYxN2Q4MTdiNWVmMDEyMjgyNGYzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mF8tp__6uLCuwdeR_lYkKvYC9qoZrvOpqqcOLnpOEDs",
  },
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/person/popular?language=en-US&page=1",
    options,
  )

  const data = await res.json()

  return {
    props: { actors: data.results },
  }
}
export default function Actors({ actors }) {
  return (
    <div className="bg-zinc-800 text-white ">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 ">List of Actors</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {actors.map((actor) => (
            <ActorCard
              key={actor.id}
              id={actor.id}
              image={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                  : noimage.src
              }
              name={actor.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}