import './recommend.css';
import React, { useState, useEffect } from 'react';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavigationBar } from "../components/Navbar.js";
import logo4 from "../icons/foodsenselogo4.png";
import API from "../API/api.js";
import { Link } from 'react-router-dom';
import star from "../icons/star.png";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Recommend() {
    const [user, loading, error] = useAuthState(auth);
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
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!isLoaded) {
            fetchRestaurantData();
        }
    }, [user, loading, isLoaded]);

    function compareRestaurant( a, b ){
        if ( a.restaurantSentimentAnalysis.rating < b.restaurantSentimentAnalysis.rating){
            return 1;
        }
        if ( a.restaurantSentimentAnalysis.rating > b.restaurantSentimentAnalysis.rating){
            return - 1;
        }
        return 0;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      

    function getRestaurantList() {
        let restaurantCount = 0;
        let restaurantList = data
            .filter(restaurant => {
                if (user !== null) {
                    return restaurant;
                }
            })
            .filter(restaurant => {
                if (restaurant !== null) {
                    return restaurant;
                }
            })
            .filter(restaurant => {
                if (restaurant.restaurantSentimentAnalysis.rating <= 5 && restaurant.restaurantSentimentAnalysis.rating >= 0) {
                    return restaurant;
                }
            })
            .sort(compareRestaurant)
        
        restaurantList = restaurantList.filter(restaurant => {
            restaurantCount++;
            if (restaurantCount < 50) {
                return restaurant;
            }
        })

        console.log(restaurantList);
        
        let length = restaurantList.length;
        if (length <= 5) {
            return restaurantList;
        }
        let indexList = [];
        while (indexList.length < 5) {
            var num = getRandomInt(length);
            while (indexList.includes(num)) {
                num = getRandomInt(length);
            }
            indexList.push(num);
        }
        var result = [];
        for (let i = 0; i < indexList.length; ++i) {
            result.push(restaurantList[indexList[i]])
        }
        return result;
    }


    return (
        <div>
            <NavigationBar />
            {
                user &&
                <div className="recommendation">            
                    {console.log(getRestaurantList())} 
                    <h1 className="recommendationCaption">Here's Your Recommendations!</h1>
                    <div className="recommendationList">
                    {
                        getRestaurantList().map((restaurant) => {
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
                </div>
            }
            {
                !user &&
                <div>
                   <img src={logo4} className="logo_recommend"/>
                   <h1 className="notLoggedInCaption">Log In to Use This Function</h1>
                </div>
            }
        </div>
    );
}