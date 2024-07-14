/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Slider from "react-slick";
import MovieDisplay from "./MovieDisplay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'tailwindcss/tailwind.css';

function MoviesDisplay({ heading, option1, option2, choice1, choice2 }) {
  const [visible, setVisible] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 6,
    slidesToScroll: 5,

    autoplaySpeed: 200,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
         
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };

  return (
    <>
      <section id="movieDisplay" className="p-10">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold m-2">{heading}</h2>
          <div className="flex space-x-4">
            <span
              className={`cursor-pointer ${visible ? "text-blue-500" : "text-gray-500"}`}
              onClick={() => setVisible(true)}
            >
              {choice1}
            </span>
            <span
              className={`cursor-pointer ${!visible ? "text-blue-500" : "text-gray-500"}`}
              onClick={() => setVisible(false)}
            >
              {choice2}
            </span>
          </div>
        </header>
        <section id="movieWrapper">
          <Slider {...settings}>
            {visible
              ? option1.map((movie, index) => (
                  <div key={index} className="px-2">
                    <MovieDisplay movie={movie} />
                  </div>
                ))
              : option2.map((movie, index) => (
                  <div key={index} className="px-2">
                    
                    <MovieDisplay movie={movie} />
                    
                  </div>
                ))}
          </Slider>
        </section>
      </section>
    </>
  );
}

export default MoviesDisplay;
