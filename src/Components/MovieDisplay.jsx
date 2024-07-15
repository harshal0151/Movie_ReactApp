import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const img_base_path = "https://image.tmdb.org/t/p/original/";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

function MovieDisplay({ movie }) {
  return (
    <div className="movie relative">
      <Link to={`/singleItem/${movie.id}`}>
        <div className="image-container overflow-hidden">
          <img
            className="object-cover transition ease-in-out delay-150 hover:scale-110 duration-300"
            src={img_base_path + movie.poster_path}
            alt={movie.title || movie.original_title}
          />
        </div>
      </Link>
      <div className="info m-1">
        <Link to={`/singleItem/${movie.id}`}>
          <h3 className="font-bold">
            {movie.title || movie.original_title || movie.name || movie.original_name}
          </h3>
        </Link>
        <p className="mt-2">
          {movie.release_date ? formatDate(movie.release_date) : formatDate(movie.first_air_date)}
        </p>
      </div>
      <div className="flex justify-center items-center gap-1 absolute bg-white px-2 rounded-lg right-3 top-2 ">
        <FaStar className="text-amber-400 text-sm" />
        <span className="text-black text-sm font-bold ">{Math.floor(movie.vote_average)}</span>
      </div>
    </div>
  );
}

export default MovieDisplay;
