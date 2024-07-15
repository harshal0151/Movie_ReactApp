import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDiscover } from '../slice';
import looding from '../assets/lodding.gif'
import { Link } from 'react-router-dom';


const img_base_path = "https://image.tmdb.org/t/p/original/";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

function TvShows() {
  const dispatch = useDispatch();
  const { AllTv, page, status } = useSelector((state) => state.movieReducer);

  useEffect(() => {
    dispatch(fetchAllDiscover({ page: 1 }));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (status === 'Loading...') return;
    dispatch(fetchAllDiscover({ page: page + 1 }));
  }, [dispatch, page, status]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <>
      <div className='mt-[5rem] m-12 text-3xl font-bold my-6 p-12'>
        <h1>All TV Shows</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {AllTv.map((movie, index) => (
          <div className="flex flex-col items-center rounded-lg shadow-lg overflow-hidden w-60" key={index}>
            <Link to={`/singleItem/${movie.id}`} className="w-full h-80 overflow-hidden">
              <img
                className="object-cover transition ease-in-out delay-150 hover:scale-110 duration-300 w-full h-full"
                src={movie.poster_path ? img_base_path + movie.poster_path : 'NoPoster'}
                alt={movie.title || movie.original_title || 'No Poster Available'}
              />
            </Link>
            <div className="py-4 text-center">
              <h3 className="text-lg font-semibold mb-2">
                {movie.title || movie.original_title || movie.name || movie.original_name}
              </h3>
              <p>
                {movie.release_date
                  ? formatDate(movie.release_date)
                  : movie.first_air_date
                  ? formatDate(movie.first_air_date)
                  : 'Unknown Release Date'}
              </p>
            </div>
          </div>
        ))}
      </div>
      {status === 'Loading...' && <div><img src={looding} alt="" /></div>}
    </>
  );
}

export default TvShows;
