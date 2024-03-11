import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import MovieCard from "@/components/MovieCard/MovieCard"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDllYTE2ZDdhNmVjOTAzY2ZmN2YzMDJiMmYyMDU5MiIsInN1YiI6IjY1NjYxN2Q4MTdiNWVmMDEyMjgyNGYzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mF8tp__6uLCuwdeR_lYkKvYC9qoZrvOpqqcOLnpOEDs",
  },
}

export default function Movies() {
  const router = useRouter()
  const [movies, setMovies] = useState([])
  const moviesToList = router.query.movieId
  const Url = router.query.Url

  useEffect(() => {
    fetch(Url + moviesToList, options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
      })
  }, [router.query.movieId])

  console.log(movies)
  console.log(Url + moviesToList)

  return (
    <div className="bg-zinc-800 text-white " >
    <div className="container mx-auto p-4 mt-0">
      <h1 className="text-4xl font-bold mb-8"> List of {moviesToList} Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">{moviesToList &&
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.original_title}
            id={movie.id}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : noimage.src
            }
          />
        ))}</div>
      </div>
    
    </div>
  )
}