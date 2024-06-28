/* eslint-disable react/prop-types */
const img_base_path = "https://image.tmdb.org/t/p/original/";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

function MovieDisplay({ movie }) {
  return (
    <div className="movie">
      <div className="image-container">
        <img
          src={img_base_path + movie.poster_path}
          alt={movie.title || movie.original_title}
        />
      </div>
      <div className="info">
        <h3>
          {movie.title ||
            movie.original_title ||
            movie.name ||
            movie.original_name}
        </h3>
        <p>
          {movie.release_date
            ? formatDate(movie.release_date)
            : formatDate(movie.first_air_date)}
        </p>
      </div>
    </div>
  );
}

export default MovieDisplay;
