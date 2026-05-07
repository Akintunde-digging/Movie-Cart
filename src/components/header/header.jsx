import "./header.css";
import { NavLink, Link } from 'react-router-dom';
import { LuFilm, LuShoppingCart, LuX} from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";

import { useCart } from "../context/cartcontext";
import { useState } from "react";
function Header() {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const [menuOpen, setMenuOpen] = useState(false);
    

    return (
        <header>
            <nav>
                <Link to="/">
                    <div className="headermovieCartLogo">
                        <div className="filmIconDiv"><LuFilm className="filmIcon"/></div>
                        <div><h1>MovieCart</h1></div>
                    </div>
                </Link>
                <div className="mobileRight">
                    <Link to="/cart"><div className="cartIconWrapper"><LuShoppingCart className="headerCart"/>{totalItems > 0 && <span className="cartBadge">{totalItems}</span>}</div></Link>
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <LuX /> : <RiMenu3Fill />}</button>
                </div>
                <div className={`navMenu ${menuOpen ? "open" : ""}`}>               
                    <ul>
                        <li><NavLink to="/" end  onClick={() => setMenuOpen(false)}>Home</NavLink></li>
                        <li><NavLink to="/movies"  onClick={() => setMenuOpen(false)}>Movies</NavLink></li>
                        <li><NavLink to="/cart"  onClick={() => setMenuOpen(false)}>Cart</NavLink></li>
                    </ul>
                    <div className="lsbutton">
                        <div className="border"></div>
                        <Link to="/cart" onClick={() => setMenuOpen(false)} className="headerCartLink"><div className="cartIconWrapper"><LuShoppingCart className="headerCart"/>{totalItems > 0 && <span className="cartBadge">{totalItems}</span>}</div></Link>
                        <div className="loginButton" onClick={() => setMenuOpen(false)}><button>Login</button></div>
                        <div className="signUpButton" onClick={() => setMenuOpen(false)}><button>Sign Up</button></div>
                    </div>
                </div> 
            </nav>
        </header>
    )
}

export default Header;