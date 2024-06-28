import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchMovies } from "../slice";

const img_base_path = "https://image.tmdb.org/t/p/original/";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

function SearchResults() {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMovies(searchTerm));
  }, [dispatch, searchTerm]);

  const { searchResults } = useSelector((state) => state.movieReducer);

  return (
    <>
      <h2 className="text-3xl font-bold my-6 p-12">{`Search Results for "${searchTerm}"`}</h2>

      <div  className="flex flex-wrap justify-center gap-10 mb-12">
        {searchResults
          ? searchResults.map((movie, index) => (
              <div
                className=" flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-60"
                key={index}
              >
                <div className=" w-full h-80 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={img_base_path + movie.poster_path}
                    alt={movie.title || movie.original_title}
                  />
                </div>
                <div className=" p-4 text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {movie.title ||
                      movie.original_title ||
                      movie.name ||
                      movie.original_name}
                  </h3>
                  <p className="text-gray-600">
                    {movie.release_date
                      ? formatDate(movie.release_date)
                      : formatDate(movie.first_air_date)}
                  </p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}

export default SearchResults;