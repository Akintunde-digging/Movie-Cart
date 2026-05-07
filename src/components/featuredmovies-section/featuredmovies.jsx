import "./featuredmovies.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {FaStar } from "react-icons/fa";
import { LuShoppingCart, LuInfo } from "react-icons/lu";
import { useCart } from "../context/cartcontext";

function FeaturedMovies({ limit, showHeading = true, showViewMore = true, search = "", onCountChange, showOverview = false}) {

    const [featured, setFeatured] = useState([]);
    const [genres, setGenres] = useState({});
    const shortNames = {
    "Science Fiction": "Sci-Fi",
    };
    const { addToCart } = useCart();
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [allMovies, setAllMovies] = useState([]);

useEffect(() => {

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const genreMap = {};
            data.genres.forEach(g => genreMap[g.id] = g.name);
            setGenres(genreMap);
        });

   fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        setFeatured(data.results);
        setAllMovies(data.results);
    });
}, []);

useEffect(() => {
    if (!onCountChange) return;
    const total = limit ? featured.slice(0, limit) : featured;
    const filtered = total.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );
    onCountChange(filtered.length, total.length);
}, [featured, search]);

    return(
        <div className="featuredMovies">
            {showHeading && 
            <div className="featuredHeading">
                <h1>Featured Movies</h1>
                <p>Discover our handpicked collection of must watch films</p>
            </div>
            }

            <div className="movieCardSection">{featured .filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())) .slice(0, limit) .map(movie => (
                <div key={movie.id} className="movieCard">
                    <div className="movieImgAndOverlayWrapper">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                        <div className="cardOverlay">
                            <button onClick={() => addToCart(movie)}><LuShoppingCart className="overlayIcons"/></button>
                            <Link to={`/movie/${movie.id}`} className="infoLink"><LuInfo className="overlayIcons"/></Link>
                        </div>
                    </div>
                    <div className="movieDetails">
                        <h3>{movie.title}</h3>
                        <div className="ratingAndYear">
                            <p className="rating"><FaStar />{movie.vote_average.toFixed(1)}</p>
                            <p className="year">{movie.release_date.slice(0, 4)}</p>
                        </div>
                       <div className="genres">{movie.genre_ids.slice(0, 2).map(id => (<span key={id} className="genrePill">{shortNames[genres[id]] || genres[id]}</span>))}</div>
                       {showOverview &&
                       <p className="movieOverview">{movie.overview}</p>
                       }
                       <div className="priceAndButton">
                            <p className="price">$ {(Math.floor(movie.vote_average * 2) + 0.99).toFixed(2)}</p>
                            <button onClick={() => addToCart(movie)}>Add to Cart</button>
                       </div>
                    </div>
                </div>
                    ))}
            </div>

            {showViewMore &&
            <div className="viewAllMovies"><Link to="/movies"><button>View All Movies</button></Link></div>
            }
        </div>


    );
}
export default FeaturedMovies;