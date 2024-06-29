import React, { useState, useEffect, useRef } from 'react';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Header() {
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const toggleInput = () => {
    setShowInput(prevState => !prevState);
  };

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/search/" + searchTerm);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };

    const handleScroll = () => {
      setShowInput(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

  }, []);

  return (
    <header className='backdrop-blur-sm w-full fixed z-50 top-0'>
      <div className='flex items-center justify-between py-5 px-[8rem]'>
        <div className="logo text-orange-400 text-2xl font-bold">
          <Link to="/"><span>MOVIES.com</span></Link>
        </div>
        <div className="navlinks flex items-center gap-6 font-semibold">
          <Link to="/movies"><li>Movies</li></Link>
          <Link to="/tv"><li>TV Shows</li></Link>
          <div className='flex items-center' ref={inputRef}>
            {showInput && (
              <form onSubmit={handleSubmit} className="flex items-center">
                <input 
                  type="text" 
                  className="search-input bg-transparent text-white border-b px-2 outline-none"
                  placeholder="Search..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            )}
            <CiSearch className='icons cursor-pointer text-white text-xl hover:text-sky-700' onClick={toggleInput} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
