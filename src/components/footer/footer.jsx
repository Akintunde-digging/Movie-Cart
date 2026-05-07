import "./footer.css";
import { NavLink } from 'react-router-dom';
import { LuFilm, LuFacebook, LuInstagram } from "react-icons/lu";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";


function FooterSection(){
    return(
        <div className="footer">
            <div className="logoToFollow">
                <div>
                    <div className="movieCartLogo">
                        <div className="filmIconDiv"><LuFilm className="filmIcon"/></div>
                        <div><h1>MovieCart</h1></div>
                    </div>
                    <p>Your premier destination for purchasing the latest and greatest movies. Experience cinema at home.</p>
                </div>

                <div>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><NavLink to="/" end>Home</NavLink></li>
                        <li><NavLink to="/movies">Movies</NavLink></li>
                        <li><NavLink to="/cart">Cart</NavLink></li>
                        <li></li>
                    </ul>
                </div>

                <div>
                    <h3>Categories</h3>
                    <ul>
                        <li>Action</li>
                        <li>Horror</li>
                        <li>Sci-Fi</li>
                        <li>Drama</li>
                        <li>Romance</li>
                    </ul>
                </div>

                <div>
                    <h3>Follow Us</h3>
                    <div className="mysocialsIcons">
                        <div><a href="https://www.facebook.com/highzick.akintunde?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer"><LuFacebook className="socialIcon"/></a></div>
                        <div><a href="" target="_blank" rel="noopener noreferrer"><FaXTwitter className="socialIcon"/></a></div>
                        <div><a href="https://www.instagram.com/highzickakintunde?igsh=cXo1M2I4cXVncm1q&utm_source=qr" target="_blank" rel="noopener noreferrer"><LuInstagram className="socialIcon"/></a></div>
                        <div><a href="https://www.linkedin.com/in/isaac-akintunde-7563bb300?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer"><FaLinkedin className="socialIcon"/></a></div>
                    </div>
                </div>
            </div>
            <div className="border"></div>
            <div className="rightsAndPolicy">
                <p>© 2026 Akintunde. All rights reserved.</p>
                <div className="privacyPolicy">
                    <a href="">Privacy Policy</a>
                    <a href="">Terms of Service</a>
                    <a href="https://wa.me/+2348070932173" target="_blank">Contact Us</a>
                </div>
            </div>
        </div>
    )
}
export default FooterSection;