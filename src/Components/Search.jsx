import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const img_base_path = "https://image.tmdb.org/t/p/original/";

function Search({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/search/" + searchTerm);
  }

  console.log(data);

  const settings = {
    fade: true,
    speed: 5000,
    autoplaySpeed: 8000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <>
      <section className="w-full h-screen overflow-hidden relative">
        {data && data.length > 0 ? (
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index} className="w-full h-screen">
                <img
                  src={img_base_path + item.backdrop_path}
                  alt={item.title || "Image"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="opacity-layer"></div>
                
              </div>
               
            ))}
          </Slider>
        ) : (
          <p>No data available</p>
        )}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-8">
          <h1 className="text-5xl font-bold text-white">Welcome.</h1>
          <p className="text-lg text-gray-300 max-w-lg text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
            exercitationem nisi necessitatibus totam vero dolore nihil quas
            ipsum! Labore, totam.
          </p>
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              className="bg-transparent backdrop-blur-xl border text-slate-100  w-[500px] p-3 px-4 rounded-xl focus:outline-none focus:ring-2 "
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className=" text-white p-3 w-[20%] rounded-xl border bg-sky-700 hover:bg-blue-600 transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Search;
