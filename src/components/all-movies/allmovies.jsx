import "./allmovies.css";
import { useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { BsFunnel } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import FeaturedMovies from "../featuredmovies-section/featuredmovies";


  
function AllMovies(){
    const [search, setSearch] = useState("");

    const [filteredCount, setFilteredCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);


    return(
        <div className="allMovies">
            <div className="allMoviesHeading">
                <h1>All Movies</h1>
                <p>Browse our complete collection of movies</p>
            </div>

            <div>
                <div className="searchBarSection">
                    <FiSearch className="searchIcon" />
                    <input type="search" placeholder="Search movies..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <div className="filters"><button><LuSlidersHorizontal className="slider"/>Filters<BsFunnel /></button></div>
                </div>
            </div>

            <p className="showing">Showing {filteredCount} of {totalCount} movies</p>

            <div><FeaturedMovies limit={18} showHeading={false} showViewMore={false} search={search} showOverview={true} onCountChange={(filtered, total) => {setFilteredCount(filtered); setTotalCount(total);}}/></div>
        </div>
    )
}

export default AllMovies;