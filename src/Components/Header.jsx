import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className='flex items-center justify-around py-3 bg-slate-400'>
        <div className="logo">
            <Link to="/"><h1>Movies.com</h1></Link>
        </div>
        <div className="navlinks flex gap-8">
            <Link to= "./movies"><li>Movies</li></Link>
            <Link to= "/tv"><li>TV Shows</li></Link>
            <Link className='icons'><li><CiSearch/></li></Link>
        </div>
    </header>
  )
}   

export default Header