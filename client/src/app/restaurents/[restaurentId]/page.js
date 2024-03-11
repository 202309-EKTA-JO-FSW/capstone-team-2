import React , {useEffect, useState}from "react"


import { useRouter } from "next/router";
import ActorCard from "@/components/ActorCard/ActorCard";
import MovieCard from "@/components/MovieCard/MovieCard";

function Movie (){
    const router = useRouter()
    const [movieDetails, setMovieDetails]= useState([])
    const [movieTrailer, setMovieTrailer] = useState ([])
    const [similarMovies, setSimilarMovies]=useState ([])
    const [topActors, setTopActors]= useState([])

    
   // console.log(router.query.movieId)
    const movieId = router.query.movieId
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWMzZThjZjk4NjY1ZTllYmEwNmViZTRmZDY3NzQ5NiIsInN1YiI6IjY1NjYwODA2YTM0OTExMDBmZTI1MmQyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8d4tAxdn5rG4IJsZOXy8nseH5FUSp9eIcZhcMbKKmzs'
        }
      };
      useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)

        .then(response => response.json())
        .then(response => setMovieDetails(response))
        .catch(err => console.error(err))
    },[movieId]);
    
     useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
       .then(response => response.json())
       .then(response => setMovieTrailer(response))
       .catch(err => console.error(err));
     },[movieId])
     useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, options)
       .then(response => response.json())
       .then(response => setSimilarMovies(response.results.slice(0, 5)))
       .catch(err => console.error(err));
     },[movieId])
     useEffect (()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
    .then(response => response.json())
    .then(response => setTopActors(response.cast.slice(0,5)))
    .catch(err => console.error(err));
     },[movieId])

    return (
        <div className="bg-zinc-800 text-white p-8" >
          {/* Movie Poster Section */}
      <div className="mb-8">
        <img className="w-1/2 h-auto" src={`https://image.tmdb.org/t/p/original/${movieDetails ? movieDetails.poster_path : ""}`} alt="Movie Poster" />
      </div>

      {/* Movie Details Section */}
      <div className="mb-8">
        <div className="text-3xl font-bold mb-2">{movieDetails ? movieDetails.original_title : ""}</div>
        <div className="flex items-center mb-2">
          <span className="mr-4">Release Date: {movieDetails ? movieDetails.release_date : ""}</span>
          <span className="mr-4">Run Time: {movieDetails ? movieDetails.runtime + " mins" : ""}</span>
          <span>Language: {movieDetails ? movieDetails.original_language : ""}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-4">Rating: {movieDetails ? movieDetails.vote_average : ""}</span>
          <span>Votes: {movieDetails ? "(" + movieDetails.vote_count + ") votes" : ""}</span>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <div className="text-xl font-bold mb-2">Overview</div>
        <p>{movieDetails ? movieDetails.overview : ""}</p>
      </div>

      {/* Top Cast Section */}
      <div className="mb-8">
        <div className="text-3xl font-bold mb-4">Top Cast</div>
        <div className="flex gap-4">
        {topActors.map((topActor)=>(
                    <ActorCard  id={topActor.id} image={`https://image.tmdb.org/t/p/original/${topActor?topActor.profile_path:""}`} name={topActor.name}/>
                ))}
        </div>
      </div>

      {/* Related Movies Section */}
      <div className="mb-8">
        <div className="text-3xl font-bold mb-4">Related Movies</div>
        <div className="flex gap-4">
        {similarMovies.map((similarMovie)=>(
                    <MovieCard id={similarMovie.id} image={`https://image.tmdb.org/t/p/original/${similarMovie?similarMovie.poster_path:""}`} title={similarMovie.original_title}/>
                ))}
        </div>
      </div>

      {/* Trailer Section */}
      <div className="mb-8">
        <div className="text-3xl font-bold mb-4">Trailer</div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${
            movieTrailer &&
            movieTrailer.results &&
            movieTrailer.results
              .filter(result => result.name === "Official Trailer")
              .map(result => result.key)
              .join("")
          }`}
          title="YouTube video player"
          //frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

      </div>

      {/* Production Companies Section */}
      <div>
        <div className="text-3xl font-bold mb-4">Production Companies</div>
        <div className="flex gap-4">
          {movieDetails && movieDetails.production_companies && movieDetails.production_companies.map(company => (
            <div key={company.id} className="flex items-center">
              {company.logo_path && <img className="w-12 h-12" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt={company.name} />}
              <span className="ml-2">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
      
        </div>
    )
}
export default Movie
