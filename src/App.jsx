import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header'
import Home from './pages/home';
import AllMovies from './pages/movies';
import CartSection from './pages/cart';
import FooterSection from './components/footer/footer';
import MovieDetails from './pages/moviedetails';


const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/movies' element={<AllMovies/>}/>
      <Route path='/cart' element={<CartSection/>}/>
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
    <FooterSection/>
   </>
  )
}

export default App