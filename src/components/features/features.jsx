import "./features.css";
import { FiPlay, FiShoppingBag} from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";



function Features(){
return(
<div className="features">
    <div className="eachFeatures">
        <div className="featuresPlay"><FiPlay  /></div>
        <h3>Instant Access</h3>
        <p>Purchase and stream your favorite movies instantly</p>
    </div>

    <div className="eachFeatures">
        <div className="featuresShoppingBag"><FiShoppingBag /></div>
        <h3>Easy Shopping</h3>
        <p>Add movies to cart and checkout in seconds</p>
    </div>

    <div className="eachFeatures">
        <div className="featuresTrendUp"><IoMdTrendingUp /></div>
        <h3>New Releases</h3>
        <p>Get access to the latest blockbusters first</p>
    </div>
</div>
);
}
export default Features;