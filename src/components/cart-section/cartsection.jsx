import "./cartsection.css";
import { Link } from "react-router-dom";
import { LuShoppingCart, LuShoppingBag, LuTrash2, LuMinus, LuPlus, LuArrowRight } from "react-icons/lu";
import { useCart } from "../context/cartcontext";

function CartSection() {
    const { cart, removeFromCart, decreaseQuantity, addToCart } = useCart();
    const shortNames = { "Science Fiction": "Sci-Fi" };
    const subtotal = cart.reduce((sum, movie) => sum + (Math.floor(movie.vote_average * 2) + 0.99) * movie.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (cart.length === 0) {
        return (
            <div className="emptyCart">
                <div className="emptyCartIconDiv"><LuShoppingBag className="emptyCartIcon"/></div>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any movies yet. Start browsing our collection!</p>
                <Link to="/movies"><button>Browse Movies</button></Link>
            </div>
        );
    }

    return (
        <div className="cartWithItems">
            <div className="cartHeading">
                <h1>Shopping Cart</h1>
                <p>{cart.length} {cart.length === 1 ? "item" : "items"} in your cart</p>
            </div>
            <div className="cartItemsAndSummary">
                <div className="cartItems">
                    {cart.map(movie => (
                        <div key={movie.id} className="cartItem">
                            <Link to={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/></Link>
                            <div className="detailsQuantitiesAndPrice">
                                <div className="cartMovieTitle">
                                    <Link to={`/movie/${movie.id}`}><h3>{movie.title}</h3></Link>
                                    <div className="cartMovieGenres">{(movie.genres || []).slice(0, 2).map(g => (<span key={g.id} className="cartMovieGenrePill">{shortNames[g.name] || g.name}</span>))}</div>
                                    <p>{movie.release_date?.slice(0, 4)} • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
                                </div>
                                <div className="QuantityAndPrice">
                                    <div className="quantityControls">
                                        <span className="quantityText">Quantity: </span>
                                        <div className="quantityButtons">
                                            <button onClick={() => decreaseQuantity(movie.id)}><LuMinus className="quantityIcon"/></button>
                                            <span>{movie.quantity}</span>
                                            <button onClick={() => addToCart(movie)}><LuPlus className="quantityIcon"/></button>
                                        </div>
                                    </div>
                                    <div className="priceAndTrash">
                                        <p>$ {((Math.floor(movie.vote_average * 2) + 0.99) * movie.quantity).toFixed(2)}</p>
                                        <button onClick={() => removeFromCart(movie.id)}><LuTrash2 className="trashButton"/></button>
                                    </div>
                                </div>               
                            </div>
                        </div>
                    ))}
                </div>
                <div className="summary">
                    <h1>Order Summary</h1>
                    <div className="calculations">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="tax">
                            <span>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="divider"></div>
                        <div className="total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button><span>Proceed to Checkout</span> <LuArrowRight className="rightArrow"/></button>
                    <Link to="/movies" className="continueShopping">Continue Shopping</Link>
                    <div className="thankYou">Thanks for shopping with Akintunde's cart!</div>
                </div>
            </div>
        </div>
    )
}
export default CartSection;