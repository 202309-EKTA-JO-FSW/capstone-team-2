/*******new */
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

function ActorSinglePage() {
  const router = useRouter()
  const [singleActor, setSingleActor] = useState("")
  const [isLoading, setLoading] = useState(true)
  const actorId = router.query.actorId

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${actorId}?append_to_response=movie_credits&language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        setSingleActor(data)
        setLoading(false)
      })
  }, [])
  

  if (isLoading) return <p>Loading..</p>
  else {
    return (
      <div className="bg-zinc-800 text-white">
        <div className="container mx-auto my-8 px-4">
          <h1 className="text-3xl font-bold mb-6">{singleActor.name}</h1>
          <div className="flex items-center mb-6">
            <img
              src={`https://image.tmdb.org/t/p/original${singleActor.profile_path}`}
              alt={singleActor.name}
              className="w-40 h-50 object-cover rounded-md mr-8"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Gender: {singleActor.gender === 2 ? "Male" : "Female"}
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Popularity: {Math.round(singleActor.popularity)}
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Birthday: {singleActor.birthday}
              </h3>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Biography:</h3>
            <p>{singleActor.biography}</p>
          </div>
          <div className="container mx-auto p-8">
            <h3 className="text-xl font-semibold mb-2">List of Movies:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {singleActor &&
                singleActor.movie_credits.cast
                  .slice(0, 10)
                  .map((el) => (
                    <MovieCard
                      id={el.id}
                      title={el.title}
                      image={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ActorSinglePage