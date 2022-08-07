import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarHome, NavigationBar } from "../components/Navbar.js";
import { Link } from 'react-router-dom';
import left from "../icons/introduction-left.png";
import right from "../icons/introduction-right.png";
import logo1 from "../icons/foodsenselogo1.png";
import logo2 from "../icons/foodsenselogo2.png";
import logo3 from "../icons/foodsenselogo3.png";
import logo4 from "../icons/foodsenselogo4.png";
import sr from "../icons/searchrestaurant.png";
import nearme from "../icons/nearme.png";
import recommend from "../icons/myrecommendations.png";

function Home() {
    return (
        <div className="home">
            <NavigationBar/>
            <div className="home-content">
                <div className="welcome">
                    <img className="welcome-image" src={logo4} />
                    <h1 className="welcome-heading">Welcome to FoodSense!</h1>
                    <h2 className="welcome-body">Where We Sense the Best Restaurant in Singapore</h2>
                </div>
                <div className="introduction">
                    <img src={left} className="image-left"/><img src={right} className="image-right"/>
                    <h1 className="introduction-heading">Our Algorithm...</h1>
                    <h2 className="introduction-body">
                        <p className="introduction-body-one">We analyzed over <div className="green">1,000</div> restaurants,</p>
                        <p className="introduction-body-two">across more than <div className="green">2,000</div> locations in Singapore,</p>
                        <p className="introduction-body-three">and exceeding <div className="green">70,000</div> reviews from all over the Internet.</p>
                        <p className="introduction-body-four">Using our machine learning algorithm, we processed </p>
                        <p className="introduction-body-five">all those reviews to give the <div className="green">Best Analysis</div> of every restaurant for you!</p>
                    </h2>
                </div>
                <div className="search">
                    <h1 className="search-heading">Don't Believe Us?</h1>
                    <h2 className="search-body"> Why Not Give It a Try? </h2>
                    <img className="search-image" src={sr}/>
                    <p className="search-link"><Link to='/restaurant/'>Search a Trending Restaurant Right Now!</Link></p>
                </div>
                <div className="nearme">
                    <h1 className="nearme-heading">Personalized Search!</h1>
                    <h2 className="nearme-body">Use Our Near Me to Find a Trending Restaurant in Your Area! </h2>
                    <img className="nearme-image" src={nearme}/>
                    <p className="nearme-link"><Link to='/nearme/'>Use Near Me Right Now!</Link></p>
                </div>
                <div className="recommend">
                    <h1 className="recommend-heading">Your Own Recommendations!</h1>
                    <h2 className="recommend-body">We Curated Restaurant Recommendations Specially For You!</h2>
                    <img className="recommend-image" src={recommend}/>
                    <p className="recommend-link"><Link to='/recommend/'>Go To My Recommendations Right Now!</Link></p>
                </div>
                <div className="account">
                    <h1 className="account-heading">Help Us :)</h1>
                    <h2 className="account-body"><Link to='/login/' className="account-link">Log In</Link> or <Link to='/signup/'>Sign Up</Link> to Support Our Website!</h2>
                </div>
            </div>

        </div>
    );
}

export default Home;

/*
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarHome } from "../components/Navbar.js";
import { Link } from 'react-router-dom';
import left from "../icons/introduction-left.png";
import right from "../icons/introduction-right.png";
import logo1 from "../icons/foodsenselogo1.png";
import logo2 from "../icons/foodsenselogo2.png";
import logo3 from "../icons/foodsenselogo3.png";
import logo4 from "../icons/foodsenselogo4.png";
import sr from "../icons/searchrestaurant.png";
import nearme from "../icons/nearme.png";
import recommend from "../icons/myrecommendations.png";

function Home() {
    return (
        <div className="home">
            <NavbarHome />
            <div className="home-content">
                <div className="welcome">
                    <img className="welcome-image" src={logo4} />
                    <h1 className="welcome-heading">Welcome to FoodSense!</h1>
                    <h2 className="welcome-body">Where We Sense the Best Restaurant in Singapore</h2>
                </div>
                <div className="introduction">
                    <img src={left} className="image-left"/><img src={right} className="image-right"/>
                    <h1 className="introduction-heading">Our Algorithm...</h1>
                    <h2 className="introduction-body">
                        <p className="introduction-body-one">We analyzed over <div className="green">1,000</div> restaurants,</p>
                        <p className="introduction-body-two">across more than <div className="green">2,000</div> locations in Singapore,</p>
                        <p className="introduction-body-three">and exceeding <div className="green">70,000</div> reviews from all over the Internet.</p>
                        <p className="introduction-body-four">Using our machine learning algorithm, we processed </p>
                        <p className="introduction-body-five">all those reviews to give the <div className="green">Best Analysis</div> of every restaurant for you!</p>
                    </h2>
                </div>
                <div className="search">
                    <h1 className="search-heading">Don't Believe Us?</h1>
                    <h2 className="search-body"> Why Not Give It a Try? </h2>
                    <img className="search-image" src={sr}/>
                    <p className="search-link"><Link to='/restaurant/'>Search a Trending Restaurant Right Now!</Link></p>
                </div>
                <div className="nearme">
                    <h1 className="nearme-heading">Personalized Search!</h1>
                    <h2 className="nearme-body">Use Our Near Me to Find a Trending Restaurant in Your Area! </h2>
                    <img className="nearme-image" src={nearme}/>
                    <p className="nearme-link"><Link to='/nearme/'>Use Near Me Right Now!</Link></p>
                </div>
                <div className="recommend">
                    <h1 className="recommend-heading">Your Own Recommendations!</h1>
                    <h2 className="recommend-body">We Curated Restaurant Recommendations Specially For You!</h2>
                    <img className="recommend-image" src={recommend}/>
                    <p className="recommend-link"><Link to='/recommend/'>Go To My Recommendations Right Now!</Link></p>
                </div>
                <div className="account">
                    <h1 className="account-heading">Help Us :)</h1>
                    <h2 className="account-body"><Link to='/login/' className="account-link">Log In</Link> or <Link to='/signup/'>Sign Up</Link> to Support Our Website!</h2>
                </div>
            </div>

        </div>
    );
}

export default Home;
*/