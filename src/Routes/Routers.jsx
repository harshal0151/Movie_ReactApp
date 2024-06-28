import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Home from '../Pages/Home'
import TvShows from '../Pages/TvShows'
import Movies from '../Pages/Movies'
import SearchResults from '../Components/SearchResults'



function Router() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movies" element={<Movies/>} />
    <Route path="/tv" element={<TvShows />} />
    <Route path="/search/:searchTerm" element={<SearchResults />}></Route>
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default Router