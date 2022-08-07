import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import Data from "../mockdata/restaurant.json";
import {categoryList, ratingList} from "../components/datalist.js";
import filter from "../icons/filter.png";
import star from "../icons/star.png";
import star2 from "../icons/star2.png";
import API from "../API/api.js";
import setting from "../icons/setting.png";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Restaurant() {
    const [data, setData] = useState(
        [{
            restaurantID: "",
            restaurantName: "",
            restaurantPhotoUrl: {
                photoUrlOne: "#",
                photoUrlTwo: "#",
                photoUrlThree: "#",
                photoUrlFour: "#",
                photoUrlFive: "#"
            },
            restaurantSentimentAnalysis: {
                sentiment: "",
                rating: ""
            },
            restaurantDetails: {
                averageStar: "",
                restoDescription: "",
                price: "",
                category: "",
                physicalAddress: "",
                postalCode: "",
                geoLocation: {
                    lattitude: "",
                    longitude: ""
                },
                webAddress: "",
                phoneNumber: "",
                reviewLink: "",
                originalUrl: ""
            }
        }]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchRestaurantData = () => {       
        /*
        try {
          API.get(`http://localhost:3333/restaurant`).then((res) => {
            setData(res.data.data);
            setIsLoaded(true);
          });
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching restaurant data");
        }
        */
        try {
              setData(Data);
              setIsLoaded(true);
          } catch (err) {
            console.error(err);
            alert("An error occured while fetching restaurant data");
          }
        
    }
    
    useEffect(() => {
        if (!isLoaded) {
            fetchRestaurantData();
        }

    }, [
        isLoaded,
    ]);

    const [query, setQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [maxRestaurantShown, setMaxRestaurantShown] = useState(30);

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    function handleRatingChange(event) {
        setSelectedRating(event.target.value);
    }

    var restaurantCount = 0;
    const restaurantList = data
        .filter(restaurant => {
            if (restaurant !== null) {
                return restaurant;
            }
        })
        .filter(restaurant => {
            if (selectedCategory === '') {
                return restaurant;
            } else if (restaurant.restaurantDetails.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
                return restaurant;
            }
        })
        .filter(restaurant => {
            let lowerbound = 0, upperbound = 5;
            
            if (selectedRating === ratingList[0]) {
                lowerbound = 4;
                upperbound = 5;
            } else if (selectedRating === ratingList[1]) {
                lowerbound = 3;
                upperbound = 4;
            } else if (selectedRating === ratingList[2]) {
                lowerbound = 2;
                upperbound = 3;
            } else if (selectedRating === ratingList[3]) {
                lowerbound = 1;
                upperbound = 2;
            } else if (selectedRating === ratingList[3]) {
                lowerbound = 0;
                upperbound = 1;
            } 

            if (restaurant.restaurantSentimentAnalysis.rating >= lowerbound && restaurant.restaurantSentimentAnalysis.rating <= upperbound) {
                return restaurant;
            } 
        })
        .filter(restaurant => {
            if (restaurantCount < maxRestaurantShown) {
                if (query === '') {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantName.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantDetails.category.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantDetails.restoDescription.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                }
            }
        })
    
    return (
        <div>
            <NavigationBar className="navbar"/>
            { isLoaded &&
            <div className="searchRestaurant">
                <div className="searchBar">
                    <h1 className="searchBarCaptionHeading">Search a Restaurant Right Now!</h1>
                    <h1 className="searchBarCaptionBody">Our Algorithm Will Provide You with the Best Restaurant Analysis</h1>
                    <div className="queryContainer">
                        <input 
                            placeholder="Search by name or category..." 
                            className="query"
                            onChange={event => setQuery(event.target.value)}
                        />
                        <button className="filterButton" onClick={() => {setShowFilter(!showFilter); console.log(showFilter);}}><img src={filter} className="filterButtonImg" /></button>
                        {
                            showFilter &&
                            <div>
                                <div className="filter-container">
                                    <div className="filter-caption">Filter by Category:</div>
                                    <div>
                                        <select
                                            name="category-list"
                                            id="category-list"
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="">All</option>
                                            {
                                                categoryList.map((category) => (
                                                    <option value={category}>{category}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="filter-container">
                                    <div className="filter-caption">Filter by Rating:</div>
                                    <div>
                                        <select
                                            name="category-list"
                                            id="category-list"
                                            onChange={handleRatingChange}
                                        >
                                            <option value="">All</option>
                                            {
                                                ratingList.map((category) => (
                                                    <option value={category}>{category}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>


                </div>
                <div className="restaurantList">
                {   
                    restaurantList
                    .map((restaurant) => {
                        return (
                            <Card sx={{ maxWidth: 345 }} className="restaurantCard">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={restaurant.restaurantPhotoUrl.photoUrlOne}
                                    alt="Restaurant Photo"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {restaurant.restaurantName}
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                    {restaurant.restaurantSentimentAnalysis.rating} <img className="starImg" src={star} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {restaurant.restaurantDetails.physicalAddress}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" component={Link} to={'/restaurant/' + restaurant.restaurantID} className="readmore" >Read More</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
                </div>
                <div className="numShown">
                    <Button onClick={() => setMaxRestaurantShown(maxRestaurantShown + 30)} className="readmore">Show More</Button>
                </div>

            </div>
            }
        </div>
    );
}

/*
import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarSearch } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import Data from "../mockdata/restaurant.json";
import {categoryList, ratingList} from "../components/datalist.js";
import filter from "../icons/filter.png";
import star from "../icons/star.png";
import star2 from "../icons/star2.png";
import API from "../API/api.js";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default function Restaurant() {
    const [data, setData] = useState(
        [{
            restaurantID: "",
            restaurantName: "",
            restaurantPhotoUrl: {
                photoUrlOne: "#",
                photoUrlTwo: "#",
                photoUrlThree: "#",
                photoUrlFour: "#",
                photoUrlFive: "#"
            },
            restaurantSentimentAnalysis: {
                sentiment: "",
                rating: ""
            },
            restaurantDetails: {
                averageStar: "",
                restoDescription: "",
                price: "",
                category: "",
                physicalAddress: "",
                postalCode: "",
                geoLocation: {
                    lattitude: "",
                    longitude: ""
                },
                webAddress: "",
                phoneNumber: "",
                reviewLink: "",
                originalUrl: ""
            }
        }]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchRestaurantData = () => {       
        try {
          API.get(`http://localhost:3333/restaurant`).then((res) => {
            setData(res.data.data);
            setIsLoaded(true);
          });
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching restaurant data");
        }
    }
    
    useEffect(() => {
        if (!isLoaded) {
            fetchRestaurantData();
        }

    }, [
        isLoaded,
    ]);

    const [query, setQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [maxRestaurantShown, setMaxRestaurantShown] = useState(30);

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    function handleRatingChange(event) {
        setSelectedRating(event.target.value);
    }

    var restaurantCount = 0;
    const restaurantList = data
        .filter(restaurant => {
            console.log(restaurant);
            if (selectedCategory === '') {
                return restaurant;
            } else if (restaurant.restaurantDetails.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
                return restaurant;
            }
        })
        .filter(restaurant => {
            let lowerbound = 0, upperbound = 5;
            
            if (selectedRating === ratingList[0]) {
                lowerbound = 4;
                upperbound = 5;
            } else if (selectedRating === ratingList[1]) {
                lowerbound = 3;
                upperbound = 4;
            } else if (selectedRating === ratingList[2]) {
                lowerbound = 2;
                upperbound = 3;
            } else if (selectedRating === ratingList[3]) {
                lowerbound = 1;
                upperbound = 2;
            } else if (selectedRating === ratingList[3]) {
                lowerbound = 0;
                upperbound = 1;
            } 

            if (restaurant.restaurantSentimentAnalysis.rating >= lowerbound && restaurant.restaurantSentimentAnalysis.rating <= upperbound) {
                return restaurant;
            } 
        })
        .filter(restaurant => {
            if (restaurantCount < maxRestaurantShown) {
                if (query === '') {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantName.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantDetails.category.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantDetails.restoDescription.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                }
            }
        })
    
    return (
        <div>
            <NavbarSearch />
            { isLoaded &&
            <div className="searchRestaurant">
                <div className="searchBar">
                    <h1 className="searchBarCaptionHeading">Search a Restaurant Right Now!</h1>
                    <h2 className="searchBarCaptionBody">Our Algorithm Will Provide You with the Best Restaurant Analysis</h2>
                    <input 
                        placeholder="Search by name or category..." 
                        className="query"
                        onChange={event => setQuery(event.target.value)}
                    />
                    <button className="filterButton" onClick={() => {setShowFilter(!showFilter); console.log(showFilter);}}><img src={filter} className="filterButtonImg" /></button>
                    {
                        showFilter &&
                        <div>
                            <div className="filter-container">
                                <div>Filter by Category:</div>
                                <div>
                                    <select
                                        name="category-list"
                                        id="category-list"
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">All</option>
                                        {
                                            categoryList.map((category) => (
                                                <option value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="filter-container">
                                <div>Filter by Rating:</div>
                                <div>
                                    <select
                                        name="category-list"
                                        id="category-list"
                                        onChange={handleRatingChange}
                                    >
                                        <option value="">All</option>
                                        {
                                            ratingList.map((category) => (
                                                <option value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="restaurantList">
                {   
                    restaurantList
                    .map((restaurant) => {
                        return (
                            <Card sx={{ maxWidth: 345 }} className="restaurantCard">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={restaurant.restaurantPhotoUrl.photoUrlOne}
                                    alt="Restaurant Photo"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {restaurant.restaurantName}
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                    {restaurant.restaurantSentimentAnalysis.rating} <img className="starImg" src={star} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {restaurant.restaurantDetails.physicalAddress}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" component={Link} to={'/restaurant/' + restaurant.restaurantID} >Read More</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
                </div>
                <div className="numShown">
                    <Button onClick={() => setMaxRestaurantShown(maxRestaurantShown + 30)}>Show More</Button>
                </div>

            </div>
            }
        </div>
    );
}
*/

/*
import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarSearch } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import Data from "../mockdata/restaurant.json";
import {categoryList, ratingList} from "../components/datalist.js";
import filter from "../icons/filter.png";
import star from "../icons/star.png";
import star2 from "../icons/star2.png";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default function Restaurant() {
    const [query, setQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [maxRestaurantShown, setMaxRestaurantShown] = useState(30);

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    function handleRatingChange(event) {
        setSelectedRating(event.target.value);
    }

    var restaurantCount = 0;
    const restaurantList = Data
        .filter(restaurant => {
            if (selectedCategory === '') {
                return restaurant;
            } else if (restaurant.restaurantDetails.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
                return restaurant;
            }
        })
        .filter(restaurant => {
            let lowerbound = 0, upperbound = 5;
            
            if (selectedRating === ratingList[0]) {
                lowerbound = 4;
                upperbound = 5;
            } else if (selectedRating === ratingList[1]) {
                lowerbound = 3;
                upperbound = 4;
            } else if (selectedRating === ratingList[2]) {
                lowerbound = 2;
                upperbound = 3;
            } else if (selectedRating === ratingList[3]) {
                lowerbound = 1;
                upperbound = 2;
            } else if (selectedRating === ratingList[3]) {
                lowerbound = 0;
                upperbound = 1;
            } 

            if (restaurant.restaurantSentimentAnalysis.rating >= lowerbound && restaurant.restaurantSentimentAnalysis.rating <= upperbound) {
                return restaurant;
            } 
        })
        .filter(restaurant => {
            if (restaurantCount < maxRestaurantShown) {
                if (query === '') {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantName.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantDetails.category.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantDetails.restoDescription.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                }
            }
        })

    return (
        <div>
            <NavbarSearch />
            <div className="searchRestaurant">
                <div className="searchBar">
                    <h1 className="searchBarCaptionHeading">Search a Restaurant Right Now!</h1>
                    <h2 className="searchBarCaptionBody">Our Algorithm Will Provide You with the Best Restaurant Analysis</h2>
                    <input 
                        placeholder="Search by name or category..." 
                        className="query"
                        onChange={event => setQuery(event.target.value)}
                    />
                    <button className="filterButton" onClick={() => {setShowFilter(!showFilter); console.log(showFilter);}}><img src={filter} className="filterButtonImg" /></button>
                    {
                        showFilter &&
                        <div>
                            <div className="filter-container">
                                <div>Filter by Category:</div>
                                <div>
                                    <select
                                        name="category-list"
                                        id="category-list"
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">All</option>
                                        {
                                            categoryList.map((category) => (
                                                <option value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="filter-container">
                                <div>Filter by Rating:</div>
                                <div>
                                    <select
                                        name="category-list"
                                        id="category-list"
                                        onChange={handleRatingChange}
                                    >
                                        <option value="">All</option>
                                        {
                                            ratingList.map((category) => (
                                                <option value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="restaurantList">
                {   
                    restaurantList
                    .map((restaurant) => {
                        return (
                            <Card sx={{ maxWidth: 345 }} className="restaurantCard">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={restaurant.restaurantPhotoUrl.photoUrlOne}
                                    alt="Restaurant Photo"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {restaurant.restaurantName}
                                    </Typography>
                                    <Typography variant="button" display="block" gutterBottom>
                                    {restaurant.restaurantSentimentAnalysis.rating} <img className="starImg" src={star} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {restaurant.restaurantDetails.physicalAddress}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" component={Link} to={'/restaurant/' + restaurant.restaurantID} >Read More</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
                </div>
                <div className="numShown">
                    <Button onClick={() => setMaxRestaurantShown(maxRestaurantShown + 30)}>Show More</Button>
                </div>

            </div>
            
        </div>
    );
}

*/

/*
import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarSearch } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import Data from "../mockdata/restaurant.json";
import {categoryList, ratingList} from "../components/datalist.js";
import filter from "../icons/filter.png";
import star from "../icons/star.png";
import star2 from "../icons/star2.png";

export default function Restaurant() {
    const [query, setQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [maxRestaurantShown, setMaxRestaurantShown] = useState(30);

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    function handleRatingChange(event) {
        setSelectedRating(event.target.value);
    }

    var restaurantCount = 0;
    const restaurantList = Data
        .filter(restaurant => {
            if (selectedCategory === '') {
                return restaurant;
            } else if (restaurant.restaurantDetails.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
                return restaurant;
            }
        })
        .filter(restaurant => {
            let lowerbound = 0, upperbound = 5;
            
            if (selectedRating === ratingList[0]) {
                lowerbound = 4;
                upperbound = 5;
            } else if (selectedRating === ratingList[1]) {
                lowerbound = 3;
                upperbound = 4;
            } else if (selectedRating === ratingList[2]) {
                lowerbound = 2;
                upperbound = 3;
            } else if (selectedRating === ratingList[3]) {
                lowerbound = 1;
                upperbound = 2;
            } else if (selectedRating === ratingList[3]) {
                lowerbound = 0;
                upperbound = 1;
            } 

            if (restaurant.restaurantSentimentAnalysis.rating >= lowerbound && restaurant.restaurantSentimentAnalysis.rating <= upperbound) {
                return restaurant;
            } 
        })
        .filter(restaurant => {
            if (restaurantCount < maxRestaurantShown) {
                if (query === '') {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantName.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantDetails.category.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                } else if (restaurant.restaurantDetails.restoDescription.toLowerCase().includes(query.toLowerCase())) {
                    restaurantCount++;
                    return restaurant;
                }
            }
        })

    return (
        <div>
            <NavbarSearch />
            <div className="searchRestaurant">
                <div className="searchBar">
                    <h1 className="searchBarCaption">Search a Restaurant Right Now!</h1>
                    <input 
                        placeholder="Search by name or category..." 
                        className="query"
                        onChange={event => setQuery(event.target.value)}
                    />
                    <button className="filterButton" onClick={() => {setShowFilter(!showFilter); console.log(showFilter);}}><img src={filter} className="filterButtonImg" /></button>
                    {
                        showFilter &&
                        <div>
                            <div className="filter-container">
                                <div>Filter by Category:</div>
                                <div>
                                    <select
                                        name="category-list"
                                        id="category-list"
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">All</option>
                                        {
                                            categoryList.map((category) => (
                                                <option value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="filter-container">
                                <div>Filter by Rating:</div>
                                <div>
                                    <select
                                        name="category-list"
                                        id="category-list"
                                        onChange={handleRatingChange}
                                    >
                                        <option value="">All</option>
                                        {
                                            ratingList.map((category) => (
                                                <option value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="restaurantList">
                {   
                    restaurantList
                    .map((restaurant) => {
                        return (
                            <div className="box" key={restaurant.restaurantID}>
                                <p className="restaurantName"><Link className="restaurantNameLink" to={'/restaurant/' + restaurant.restaurantID}>{restaurant.restaurantName}</Link></p>
                                <img className="restaurantPhoto" src={restaurant.restaurantPhotoUrl.photoUrlOne} />
                                <p className="restaurantRating">{restaurant.restaurantSentimentAnalysis.rating}<img className="starImg" src={star2}/></p>
                                <p className="restaurantAddress">{restaurant.restaurantDetails.physicalAddress}</p>
                            </div>
                        )
                    })
                }
                </div>
                <div className="numShown">
                    <button onClick={() => setMaxRestaurantShown(maxRestaurantShown + 30)}>Show More</button>
                </div>

            </div>
            
        </div>
    );
}

*/


/*
import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarSearch } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import data from "../mockdata/restaurant.json";

export default function Restaurant() {
     


    return (
        <div>
            <NavbarSearch />
            <Link to='/restaurant/2'>KFC Bishan</Link>
        </div>
    );
}
*/