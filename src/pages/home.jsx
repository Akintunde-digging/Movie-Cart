import HeroSection from "../components/hero-section/herosection";
import FeaturedMovies from "../components/featuredmovies-section/featuredmovies";
import Features from "../components/features/features";

const Home = () => {
    return (
        <>
            <HeroSection/>
            <FeaturedMovies limit={6}/>
            <Features/>
        </>
    )
}

export default Home