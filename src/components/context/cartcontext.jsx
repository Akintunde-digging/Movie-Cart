import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const API_KEY = import.meta.env.VITE_API_KEY;
const shortNames = { "Science Fiction": "Sci-Fi" };

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [genres, setGenres] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const genreMap = {};
                data.genres.forEach(g => genreMap[g.id] = g.name);
                setGenres(genreMap);
            });
    }, []);

    async function addToCart(movie) {
        let movieData = movie;

        if (!movie.runtime) {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
            const details = await res.json();
            movieData = { ...movie, runtime: details.runtime };
        }

        const normalizedMovie = {
            ...movieData,
            genres: movieData.genres ||
                    (movieData.genre_ids || []).map(id => ({ id, name: genres[id] }))
        };

        setCart(prev => {
            const exists = prev.find(item => item.id === normalizedMovie.id);
            if (exists) {
                return prev.map(item =>
                    item.id === normalizedMovie.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...normalizedMovie, quantity: 1 }];
        });
    }

    function removeFromCart(id) {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    function decreaseQuantity(id) {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0)
        );
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}