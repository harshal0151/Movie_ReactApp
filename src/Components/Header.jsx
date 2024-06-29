import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
// import Logo from "../assets/logo.png"


function Header() {
  return (
   <header className=' backdrop-blur-sm w-full fixed z-50 top-0 '>
     <div className='flex items-center justify-between py-5 px-[8rem]   '>
        <div className="logo text-orange-400 text-2xl font-bold" >
            <Link to="/"><span >MOVIES.com</span></Link>
        </div>
        <div className="navlinks flex gap-6 font-semibold">
            <Link to= "./movies"><li>Movies</li></Link>
            <Link to= "/tv"><li>TV Shows</li></Link>
            <Link className='icons'><li><CiSearch/></li></Link>
        </div>
    </div>
   </header>
  )
}   

export default Header