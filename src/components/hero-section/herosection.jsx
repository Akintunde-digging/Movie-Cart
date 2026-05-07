import "./herosection.css";
import { useState, useEffect } from "react";
import { FiPlay, FiShoppingBag } from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";
import { Link } from "react-router-dom";

function HeroSection(){
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setMovie(data.results[0]));
    }, []);

    if (!movie) return <div>Loading...</div>;

    return(
        <div className="heroSection" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: "cover", backgroundPosition: "center 15%"}}>
            <div className="trendingNow">
                <IoMdTrendingUp />
                <p>Trending Now</p>
            </div>
            <div className="h1p">
                <Link to={`/movie/${movie.id}`}><h1>{movie.title}</h1></Link>
                <p>{movie.overview}</p>
            </div>
            <div className="browseAndSign">
                <Link to="/movies"><button className="browseButton"><FiPlay className="playbutton" />Browse Movies</button></Link>
                <button className="signButton"><FiShoppingBag className="shoppingbag" />Sign Up</button>
            </div>
        </div>
    );
}
export default HeroSection;