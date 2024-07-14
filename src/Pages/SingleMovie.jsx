import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";

const img_base_path = "https://image.tmdb.org/t/p/original/";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

function SingleMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovie(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className=" flex justify-around  w-full  relative ">
    <div className='w-full h-screen'>
    <img src={img_base_path + movie.backdrop_path} alt="" className=' object-cover w-full h-screen' />
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="opacity-layer"></div>
    </div>

    <div className=' absolute  w-full h-screen flex  justify-around '>
    <div className=" w-[50%] flex justify-center items-center">
        <img
          className="object-cover w-[300px]"
          src={img_base_path + movie.poster_path}
          alt={movie.title || movie.original_title}
        />
        </div>
       <div className='flex flex-col gap-[2rem]  items-start justify-center w-[80%]'>
       <h1 className="text-4xl font-bold">{movie.title || movie.original_title}</h1>
        <p className="text-lg w-[80%]">{movie.overview}</p>
       <div>
       <p className="text-lg mb-3 flex gap-2">
          <strong>Release Date:</strong> {formatDate(movie.release_date)}
        </p>
        <p className="text-lg flex items-center gap-2">
          <strong>Rating:</strong><FaStar className="text-amber-400 text-sm" /> {Math.floor(movie.vote_average)} / 10
        </p>
       </div>
       
       <div className='flex w-full gap-5 mt-3 flex-wrap'>
        
        {
          movie.production_companies.map((production , index)=>{
            return(
              
              <div key={index} className='flex flex-col  items-center justify-between gap-2'>
             <div className='w-[100px] h-12 overflow-hidden bg-white p-2 rounded-md'>
             <img src={img_base_path + production.logo_path }  className='w-full h-[100%]  object-contain'/>
             </div>
              <p>{production.name}</p>
             </div>
            )
          })
        }
       </div>
       </div>
    </div>
      
    </div>
  );
}

export default SingleMovie;

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}
