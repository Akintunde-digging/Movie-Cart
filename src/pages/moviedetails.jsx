import "./moviedetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { LuArrowLeft, LuShoppingCart, LuCalendar, LuClock} from "react-icons/lu";
import { useCart } from "../components/context/cartcontext";

const API_KEY = import.meta.env.VITE_API_KEY;
const shortNames = { "Science Fiction": "Sci-Fi" };

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [movie, setMovie] = useState(null);
    const [allMovies, setAllMovies] = useState([]);
    const [genres, setGenres] = useState({});
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setMovie(data));

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setAllMovies(data.results));

        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const genreMap = {};
                data.genres.forEach(g => genreMap[g.id] = g.name);
                setGenres(genreMap);
        });
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const officialTrailer = data.results.find(
                    v => v.type === "Trailer" && v.site === "YouTube"
                );
                setTrailer(officialTrailer);
        });
    }, [id]);

    if (!movie) return <div className="loading">Loading...</div>;

    const similar = allMovies
        .filter(m =>
            m.id !== movie.id &&
            m.genre_ids.some(id => movie.genres.map(g => g.id).includes(id))
        )
        .slice(0, 4);

    return (
        <div className="movieDetailsPage">
            <div className="movieDetailsHero" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: "cover",backgroundPosition: "center"}}>
                <div className="buttonImageAndDetails">
                    <div ><button className="backButton" onClick={() => navigate(-1)}><LuArrowLeft className="backArrow"/>Back</button></div>
                    <div className="imgAndDetails">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="detailsPoster" />
                        <div className="detailsInfo">
                            <h1>{movie.title}</h1>
                            <div className="detailsSDT">
                                <div className="testing"><FaStar className="detailsIcon"/> <span>{movie.vote_average.toFixed(1)}</span></div>
                                {/* this part is not aligning, improvised using the testing above <span className="movieStar"><FaStar className="detailsIcons"/> {movie.vote_average.toFixed(1)}</span>  */}
                                <span className="movieDate"><LuCalendar className="detailsIcons"/> {movie.release_date.slice(0, 4)}</span>
                                <span className="movieTime"><LuClock className="detailsIcons"/> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                            </div>
                            <div className="detailsGenres">{movie.genres.slice(0, 2).map(g => (<span key={g.id} className="detailsGenrePill">{shortNames[g.name] || g.name}</span>))}</div>
                            <div className="detailsSynopsis">
                                <h2>Synopsis</h2>
                                <p className="detailsOverview">{movie.overview}</p>
                            </div>

                            {trailer &&(
                                <div className="detailsTrailer">
                                    <h3>Watch Trailer</h3>
                                    <div className="trailerVideo">
                                        
                                        <iframe
                                            src={`https://www.youtube.com/embed/${trailer.key}`}
                                            title={trailer.name}
                                            allowFullScreen
                                            width="523px"
                                            height="294px"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="detailsPriceAndCart">
                                <div className="detailsPrice">
                                    <span>Price</span>
                                    <p className="">$ {(Math.floor(movie.vote_average * 2) + 0.99).toFixed(2)}</p>
                                </div>
                                <button onClick={() => addToCart(movie)}><LuShoppingCart className="detailsCartIcon"/>  <span>Add to Cart</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {similar.length > 0 && (
                <div className="youMayAlsoLike">
                    <h2>You May Also Like</h2>
                    <div className="similarMovies">
                        {similar.map(m => (
                            <div key={m.id} className="similarCard" onClick={() => navigate(`/movie/${m.id}`)}>
                                <div className="similarImgWrapper">
                                    <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title}/>
                                </div>
                                <div className="similarDetails">
                                    <h3>{m.title}</h3>
                                    <div className="similarDetailsRatingAndPrice">
                                        <p className="rating"><FaStar className="similarDetailsStar"/>{m.vote_average.toFixed(1)}</p>
                                        <p className="price">$ {(Math.floor(m.vote_average * 2) + 0.99).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;