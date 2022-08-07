import './restaurantPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from 'react-router-dom'
import Slideshow from "../components/Slideshow.js";
import API from "../API/api.js";
import star from "../icons/star.png";
import Data from "../mockdata/restaurant.json";

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhotoUrl, setRestaurantPhotoUrl] = useState({
    photoUrlOne: "#",
    photoUrlTwo: "#",
    photoUrlThree: "#",
    photoUrlFour: "#",
    photoUrlFive: "#"
  });
  const [restaurantSentimentAnalysis, setRestaurantSentimentAnalysis] = useState({
    sentiment: "sth",
    rating: ""
  });
  const [restaurantDetails, setRestaurantDetails] = useState({
    physicalAddress: "",
    postalCode: "",
    geoLocation: {lattitude: "", longitude: ""},
    webAddress: "",
    phoneNumber: "",
    averageStar: "",
    restoDescription: "",
    price: "",
    category: "",
    reviewLink: "",
    originalUrl: ""
  });
  const [slideImages, setSlideImages] = useState([
    {
      img: "",
      title: ""
    },
  ]);
  
  const fetchRestaurantData = () => {
    /*
    const restaurant = Data.find(e => e.restaurantID === restaurantId);
    setRestaurantName(restaurant.restaurantName);
    setRestaurantSentimentAnalysis(restaurant.restaurantSentimentAnalysis);
    setRestaurantDetails(restaurant.restaurantDetails);
    setRestaurantPhotoUrl(restaurant.restaurantPhotoUrl);
    setIsLoaded(true); 
    */
    
    try {
        const data = Data.find(e => e.restaurantID === restaurantId);
        console.log(data);

        setRestaurantName(data.restaurantName);
        setRestaurantSentimentAnalysis(data.restaurantSentimentAnalysis);
        setRestaurantDetails(data.restaurantDetails);
        setRestaurantPhotoUrl(data.restaurantPhotoUrl);
        setSlideImages([
          {
            url: data.restaurantPhotoUrl.photoUrlOne,
            caption: "",
          },
          {
            url: data.restaurantPhotoUrl.photoUrlTwo,
            caption: "",
          },
          {
            url: data.restaurantPhotoUrl.photoUrlThree,
            caption: "",
          },
          {
            url: data.restaurantPhotoUrl.photoUrlFour,
            caption: "",
          },
          {
            url: data.restaurantPhotoUrl.photoUrlFive,
            caption: "",
          }          
        ])
        console.log(slideImages)
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
      isLoaded
  ]);

  return (
    <div>
        <NavigationBar />
        { isLoaded &&
        <div className="restaurant">
          <h1 className="restaurantTitle">{restaurantName}</h1>
          <div className="slideShow">
            {Slideshow(slideImages)}
          </div>
          <div className="restaurantSentimentAnalysis">
            <h1 className="restaurantSentimentAnalysisTitle">Sentiment Analysis Result</h1>
            <h2 className="overallRating">{restaurantSentimentAnalysis.rating} <img className="ratingImg" src={star} /></h2>
            <h2 className="sentiment">"{restaurantSentimentAnalysis.sentiment}"</h2>
          </div>
          <div className="restaurantDetails">
            <h1 className="restaurantDetailsTitle">Details</h1>
            <h2 className="restoDescription restaurantDetailsText">Description: {restaurantDetails.restoDescription}</h2>
            <h2 className="price restaurantDetailsText">Price: {restaurantDetails.price}</h2>
            <h2 className="category restaurantDetailsText">Category: {restaurantDetails.category}</h2>
            <h2 className="physicalAddress restaurantDetailsText">Address: {restaurantDetails.physicalAddress}</h2>
            <h2 className="postalCode restaurantDetailsText">Postal Code: {restaurantDetails.postalCode}</h2>
            <h2 className="geoLocation restaurantDetailsText">Geo Location: {restaurantDetails.geoLocation.lattitude}, {restaurantDetails.geoLocation.longitude}</h2>
            <h2 className="webAddress restaurantDetailsText">Web Address: {restaurantDetails.webAddress}</h2>
            <h2 className="phoneNumber restaurantDetailsText">Phone Number: {restaurantDetails.phoneNumber}</h2>
          </div>
        </div>
        }
    </div>
  );
}

/*
import './restaurantPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarRestaurant } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from 'react-router-dom'
import Slideshow from "../components/Slideshow.js";
import API from "../API/api.js";
import Data from "../mockdata/restaurant.json";

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhotoUrl, setRestaurantPhotoUrl] = useState({
    photoUrlOne: "#",
    photoUrlTwo: "#",
    photoUrlThree: "#",
    photoUrlFour: "#",
    photoUrlFive: "#"
  });
  const [restaurantSentimentAnalysis, setRestaurantSentimentAnalysis] = useState({
    sentiment: "sth",
    rating: ""
  });
  const [restaurantDetails, setRestaurantDetails] = useState({
    physicalAddress: "",
    postalCode: "",
    geoLocation: {lattitude: "", longitude: ""},
    webAddress: "",
    phoneNumber: "",
    averageStar: "",
    restoDescription: "",
    price: "",
    category: "",
    reviewLink: "",
    originalUrl: ""
  });
  
  const fetchRestaurantData = () => {
    
    try {
      API.get(`http://localhost:3333/restaurant/${restaurantId}`).then((res) => {
        const data = res.data.data;
        console.log(data);

        setRestaurantName(data.restaurantName);
        setRestaurantSentimentAnalysis(data.restaurantSentimentAnalysis);
        setRestaurantDetails(data.restaurantDetails);
        setRestaurantPhotoUrl(data.restaurantPhotoUrl);
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

  return (
    <div>
        <NavbarRestaurant />
        <div className="restaurant">
          <h1 className="restaurantName">{restaurantName}</h1>
          <div className="restaurantPhotoUrl">
            <img src={restaurantPhotoUrl.photoUrlOne} />
            <img src={restaurantPhotoUrl.photoUrlTwo} />
            <img src={restaurantPhotoUrl.photoUrlThree} />
            <img src={restaurantPhotoUrl.photoUrlFour} />
            <img src={restaurantPhotoUrl.photoUrlFive} />
          </div>
          <div className="restaurantSentimentAnalysis">
            <h1 className="restaurantSentimentAnalysisTitle">Restaurant Sentiment Analysis Result</h1>
            <h2 className="overallRating">Overall Rating: {restaurantSentimentAnalysis.rating}</h2>
            <h2 className="sentiment">Sentiment: {restaurantSentimentAnalysis.sentiment}</h2>
          </div>
          <div className="restaurantDetails">
            <h1 className="restaurantDetailsTitle">Restaurant Details</h1>
            <h2 className="restoDescription">Description: {restaurantDetails.restoDescription}</h2>
            <h2 className="price">Price: {restaurantDetails.price}</h2>
            <h2 className="category">Category: {restaurantDetails.category}</h2>
            <h2 className="physicalAddress">Address: {restaurantDetails.physicalAddress}</h2>
            <h2 className="postalCode">Postal Code: {restaurantDetails.postalCode}</h2>
            <h2 className="geoLocation">Geo Location: {restaurantDetails.geoLocation.lattitude}, {restaurantDetails.geoLocation.longitude}</h2>
            <h2 className="webAddress">Web Address: {restaurantDetails.webAddress}</h2>
            <h2 className="phoneNumber">Phone Number: {restaurantDetails.phoneNumber}</h2>
          </div>
      </div>
    </div>
  );
}
*/

/*
import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarRestaurant } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from 'react-router-dom'
import Slideshow from "../components/Slideshow.js";
import API from "../API/api.js";

const slideImages = [
  {
    url: 'https://lh5.googleusercontent.com/p/AF1QipNr-B_RSJFswwcl8YAl5PvLalpPG4PGa1jpHU52=w203-h270-k-no',
    caption: 'Slide 1'
  },
  {
    url: 'https://lh5.googleusercontent.com/p/AF1QipMHSrPx34UAMV9P59f8NZEkhqiluW8e3_E88EpO=w203-h270-k-no',
    caption: 'Slide 2'
  },
  {
    url: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/37/59/86/in-food-court.jpg',
    caption: 'Slide 3'
  },
];

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhotoUrl, setRestaurantPhotoUrl] = useState({
    photoUrlOne: "#",
    photoUrlTwo: "#",
    photoUrlThree: "#",
    photoUrlFour: "#",
    photoUrlFive: "#"
  });
  const [restaurantSentimentAnalysis, setRestaurantSentimentAnalysis] = useState({
    sentiment: "sth",
    rating: ""
  });
  const [restaurantDetails, setRestaurantDetails] = useState({
    physicalAddress: "",
    postalCode: "",
    geoLocation: {lattitude: "", longitude: ""},
    webAddress: "",
    phoneNumber: "",
    averageStar: "",
    restoDescription: "",
    price: "",
    category: "",
    reviewLink: "",
    originalUrl: ""
  });
  
  const renderRestaurantImages = Slideshow(slideImages);

  const fetchRestaurantData = () => {
    
    try {
      API.get(`http://localhost:3333/restaurant/${restaurantId}`).then((res) => {
        const data = res.data.data;
        console.log(data);

        setRestaurantName(data.restaurantName);
        setRestaurantSentimentAnalysis(data.restaurantSentimentAnalysis);
        setRestaurantDetails(data.restaurantDetails);
        setRestaurantPhotoUrl(data.restaurantPhotoUrl);
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

  return (
    <div>
        <NavbarRestaurant />
        <div className="restaurant">
          <h1 className="restaurant__name">{restaurantName}</h1>
          <div className="restaurantPhotoUrl">
            <img src={restaurantPhotoUrl.photoUrlOne} />
            <img src={restaurantPhotoUrl.photoUrlTwo} />
            <img src={restaurantPhotoUrl.photoUrlThree} />
            <img src={restaurantPhotoUrl.photoUrlFour} />
            <img src={restaurantPhotoUrl.photoUrlFive} />
          </div>
          <hr className="line" />
          <div className="restaurantSentimentAnalysis">
            <h1 className="title">Restaurant Sentiment Analysis Result</h1>
            <h2 className="overallRating">Overall Rating: {restaurantSentimentAnalysis.rating}</h2>
            {restaurantSentimentAnalysis.fiveStar.percentage !== "0" && 
            <h2 className="fiveStar">
              {restaurantSentimentAnalysis.fiveStar.percentage}% {restaurantSentimentAnalysis.fiveStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.fourStar.percentage !== "0" && 
            <h2 className="fourStar">
              {restaurantSentimentAnalysis.fourStar.percentage}% {restaurantSentimentAnalysis.fourStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.threeStar.percentage !== "0" && 
            <h2 className="threeStar">
              {restaurantSentimentAnalysis.threeStar.percentage}% {restaurantSentimentAnalysis.threeStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.twoStar.percentage !== "0" && 
            <h2 className="twoStar">
              {restaurantSentimentAnalysis.twoStar.percentage}% {restaurantSentimentAnalysis.twoStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.oneStar.percentage !== "0" && 
            <h2 className="oneStar">
              {restaurantSentimentAnalysis.oneStar.percentage}% {restaurantSentimentAnalysis.oneStar.sentiment}
            </h2>}
          </div>
          <div className="restaurantDetails">
            <h1 className="title">Restaurant Details</h1>
            <h2 className="physicalAddress">Address: {restaurantDetails.physicalAddress}</h2>
            <h2 className="postalCode">Postal Code: {restaurantDetails.postalCode}</h2>
            <h2 className="geoLocation">Geo Location: {restaurantDetails.geoLocation.lattitude}, {restaurantDetails.geoLocation.longitude}</h2>
            <h2 className="webAddress">Web Address: {restaurantDetails.webAddress}</h2>
            <h2 className="phoneNumber">Phone Number: {restaurantDetails.phoneNumber}</h2>
          </div>
          <div className="restaurantCategories">
            <h1 className="title">Restaurant Categories</h1>
            <h2 className="list">
              {restaurantCategories.categoryOne !== "" && <p>{restaurantCategories.categoryOne}, </p>}
              {restaurantCategories.categoryTwo !== "" && <p>{restaurantCategories.categoryTwo}, </p>}
              {restaurantCategories.categoryThree !== "" && <p>{restaurantCategories.categoryThree}, </p>}
              {restaurantCategories.categoryFour !== "" && <p>{restaurantCategories.categoryFour}, </p>}
              {restaurantCategories.categoryFive !== "" && <p>{restaurantCategories.categoryFive}, </p>}
              {restaurantCategories.categorySix !== "" && <p>{restaurantCategories.categorySix}, </p>}
              {restaurantCategories.categorySeven !== "" && <p>{restaurantCategories.categorySeven}, </p>}
              {restaurantCategories.categoryEight !== "" &&<p>{restaurantCategories.categoryEight}, </p>}
              {restaurantCategories.categoryNine !== "" && <p>{restaurantCategories.categoryNine}, </p>}
              {restaurantCategories.categoryTen !== "" && <p>{restaurantCategories.categoryTen}</p>}                
            </h2>
          </div>
      </div>
    </div>
  );
}

*/
/*
import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarRestaurant } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Slideshow from "../components/Slideshow.js";
import API from "../API/api.js";

const slideImages = [
  {
    url: 'https://lh5.googleusercontent.com/p/AF1QipNr-B_RSJFswwcl8YAl5PvLalpPG4PGa1jpHU52=w203-h270-k-no',
    caption: 'Slide 1'
  },
  {
    url: 'https://lh5.googleusercontent.com/p/AF1QipMHSrPx34UAMV9P59f8NZEkhqiluW8e3_E88EpO=w203-h270-k-no',
    caption: 'Slide 2'
  },
  {
    url: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/37/59/86/in-food-court.jpg',
    caption: 'Slide 3'
  },
];

export default function RestaurantPage() {
  const restaurantId = 2;
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhotoUrl, setRestaurantPhotoUrl] = useState([]);
  const [renderRestaurantPhotoUrl, setRenderRestaurantPhotoUrl] = useState(<div></div>);
  const [restaurantSentimentAnalysis, setRestaurantSentimentAnalysis] = useState({});
  const [renderRestaurantSentimentAnalysis, setRenderRestaurantSentimentAnalysis] = useState(<div></div>);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [renderRestaurantDetails, setRenderRestaurantDetails] = useState(<div></div>);
  const [restaurantCategories, setRestaurantCategories] = useState([]);
  const [renderRestaurantCategories, setRenderRestaurantCategories] = useState(<div></div>);
  
  const renderRestaurantImages = Slideshow(slideImages);

  const fetchRestaurantData = () => {
    try {
      API.get(`http://localhost:3333/restaurant/${restaurantId}`).then((res) => {
        const data = res.data.data;

        setRestaurantName(data.restaurantName);
        let restaurantPhotoUrlList = [];
        for (const i in data.restaurantPhotoUrl) {
          const photoUrl = data.restaurantPhotoUrl[i];
          if (photoUrl !== "Blank" && photoUrl !== "") {
            restaurantPhotoUrlList.push(photoUrl);
          }
        }
        // console.log(restaurantPhotoUrlList);
        
        const numberOfRestaurantPhotoUrl = restaurantPhotoUrlList.length;
        let restaurantPhotoUrlListFormatted = [];
        let count = 1;
        for (const i in restaurantPhotoUrlList) {
          restaurantPhotoUrlListFormatted.push({url: restaurantPhotoUrlList[i], caption: `${count} / ${numberOfRestaurantPhotoUrl}`});
          count++;
        }
        
        setRestaurantPhotoUrl(restaurantPhotoUrlListFormatted);
        setRenderRestaurantPhotoUrl(Slideshow(restaurantPhotoUrl));
        //console.log(restaurantPhotoUrlListFormatted);
        
        setRestaurantSentimentAnalysis(data.restaurantSentimentAnalysis);
        setRenderRestaurantSentimentAnalysis(
          <div className="restaurantSentimentAnalysis">
            <h1 className="title">Restaurant Sentiment Analysis Result</h1>
            <h2 className="overallRating">Overall Rating: {restaurantSentimentAnalysis.rating}</h2>
            {restaurantSentimentAnalysis.fiveStar.percentage !== "0" && 
            <h2 className="fiveStar">
              {restaurantSentimentAnalysis.fiveStar.percentage}% {restaurantSentimentAnalysis.fiveStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.fourStar.percentage !== "0" && 
            <h2 className="fourStar">
              {restaurantSentimentAnalysis.fourStar.percentage}% {restaurantSentimentAnalysis.fourStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.threeStar.percentage !== "0" && 
            <h2 className="threeStar">
              {restaurantSentimentAnalysis.threeStar.percentage}% {restaurantSentimentAnalysis.threeStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.twoStar.percentage !== "0" && 
            <h2 className="twoStar">
              {restaurantSentimentAnalysis.twoStar.percentage}% {restaurantSentimentAnalysis.twoStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.oneStar.percentage !== "0" && 
            <h2 className="oneStar">
              {restaurantSentimentAnalysis.oneStar.percentage}% {restaurantSentimentAnalysis.oneStar.sentiment}
            </h2>}
          </div>
        );
        setRestaurantDetails(data.restaurantDetails);
        setRenderRestaurantDetails(
          <div className="restaurantDetails">
            <h1 className="title">Restaurant Details</h1>
            <h2 className="physicalAddress">Address: {restaurantDetails.physicalAddress}</h2>
            <h2 className="postalCode">Postal Code: {restaurantDetails.postalCode}</h2>
            <h2 className="geoLocation">Geo Location: {restaurantDetails.geoLocation.lattitude}, {restaurantDetails.geoLocation.longitude}</h2>
            <h2 className="webAddress">Web Address: {restaurantDetails.webAddress}</h2>
            <h2 className="phoneNumber">Phone Number: {restaurantDetails.phoneNumber}</h2>
          </div>
        );
        
        let restaurantCategoriesList = [];
        for (const i in data.restaurantCategories) {
          const restaurantCategory = data.restaurantCategories[i];
          
          if (restaurantCategory !== "Blank" && restaurantCategory !== "") {
            restaurantCategoriesList.push(restaurantCategory);
          }
        }
        setRestaurantCategories(restaurantCategoriesList);
        
        setRenderRestaurantCategories(
          <div className="restaurantCategories">
            <h1 className="title">Restaurant Categories</h1>
            <h2 className="list">
              {restaurantCategories}
            </h2>
          </div>
        );   
        
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
      
      restaurantName, 
      restaurantPhotoUrl,
      renderRestaurantPhotoUrl,
      restaurantSentimentAnalysis, 
      renderRestaurantSentimentAnalysis,
      restaurantCategories,
      renderRestaurantCategories,
      
    ]);

  return (
    <div>
        <NavbarRestaurant />
        <div className="restaurant">
            <h1 className="restaurant__name">{restaurantName}</h1>
            <hr className="line" />
            {renderRestaurantSentimentAnalysis}
            {renderRestaurantDetails}
            {renderRestaurantCategories}
        </div>
    </div>
  );
}
*/

/*
import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarRestaurant } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Slideshow from "../components/Slideshow.js";
import API from "../API/api.js";

const slideImages = [
  {
    url: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/05/kfc-restaurant-exterior.jpg?quality=82&strip=1&w=640',
    caption: 'Slide 1'
  },
  {
    url: 'https://www.wattagnet.com/ext/resources/2022/03/11/KFC-restaurant-in-food-court.jpg',
    caption: 'Slide 2'
  },
  {
    url: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/37/59/86/in-food-court.jpg',
    caption: 'Slide 3'
  },
];

export default function RestaurantPage() {
  const restaurantId = 2;
  
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantSentimentAnalysis, setRestaurantSentimentAnalysis] = useState({});
  const [renderRestaurantSentimentAnalysis, setRenderRestaurantSentimentAnalysis] = useState(<div></div>);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [renderRestaurantDetails, setRenderRestaurantDetails] = useState(<div></div>);
  const [restaurantCategories, setRestaurantCategories] = useState([]);
  const [renderRestaurantCategories, setRenderRestaurantCategories] = useState(<div></div>);

  const renderRestaurantImages = Slideshow(slideImages);

  const fetchRestaurantData = () => {
    try {
      API.get(`http://localhost:3333/restaurant/${restaurantId}`).then((res) => {
        const data = res.data.data;
        console.log(data);

        setRestaurantName(data.restaurantName);

        setRestaurantSentimentAnalysis(data.restaurantSentimentAnalysis);
        setRenderRestaurantSentimentAnalysis(
          <div className="restaurantSentimentAnalysis">
            <h1 className="title">Restaurant Sentiment Analysis Result</h1>
            <h2 className="overallRating">Overall Rating: {restaurantSentimentAnalysis.rating}</h2>
            {restaurantSentimentAnalysis.fiveStar.percentage !== "0" && 
            <h2 className="fiveStar">
              {restaurantSentimentAnalysis.fiveStar.percentage}% {restaurantSentimentAnalysis.fiveStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.fourStar.percentage !== "0" && 
            <h2 className="fourStar">
              {restaurantSentimentAnalysis.fourStar.percentage}% {restaurantSentimentAnalysis.fourStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.threeStar.percentage !== "0" && 
            <h2 className="threeStar">
              {restaurantSentimentAnalysis.threeStar.percentage}% {restaurantSentimentAnalysis.threeStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.twoStar.percentage !== "0" && 
            <h2 className="twoStar">
              {restaurantSentimentAnalysis.twoStar.percentage}% {restaurantSentimentAnalysis.twoStar.sentiment}
            </h2>}
            {restaurantSentimentAnalysis.oneStar.percentage !== "0" && 
            <h2 className="oneStar">
              {restaurantSentimentAnalysis.oneStar.percentage}% {restaurantSentimentAnalysis.oneStar.sentiment}
            </h2>}
          </div>
        );

        setRestaurantDetails(data.restaurantDetails);
        setRenderRestaurantDetails(
          <div className="restaurantDetails">
            <h1 className="title">Restaurant Details</h1>
            <h2 className="physicalAddress">Address: {restaurantDetails.physicalAddress}</h2>
            <h2 className="postalCode">Postal Code: {restaurantDetails.postalCode}</h2>
            <h2 className="geoLocation">Geo Location: {restaurantDetails.geoLocation.lattitude}, {restaurantDetails.geoLocation.longitude}</h2>
            <h2 className="webAddress">Web Address: {restaurantDetails.webAddress}</h2>
            <h2 className="phoneNumber">Phone Number: {restaurantDetails.phoneNumber}</h2>
          </div>
        );
        
        
        let restaurantCategoriesList = [];
        for (const i in data.restaurantCategories) {
          const restaurantCategory = data.restaurantCategories[i];
          
          if (restaurantCategory !== "Blank" && restaurantCategory !== "") {
            restaurantCategoriesList.push(restaurantCategory);
          }
        }
        setRestaurantCategories(restaurantCategoriesList);
        
        setRenderRestaurantCategories(
          <div className="restaurantCategories">
            <h1 className="title">Restaurant Categories</h1>
            <h2 className="list">
              {restaurantCategories}
            </h2>
          </div>
        );
        
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching restaurant data");
    }
  }

  useEffect(() => {
    fetchRestaurantData();
  }, [restaurantName]);

  return (
    <div>
        <NavbarRestaurant />
        <div className="restaurant">
            <h1 className="restaurant__name">{restaurantName}</h1>
            <hr className="line" />
            {renderRestaurantImages}
            {renderRestaurantSentimentAnalysis}
            {renderRestaurantDetails}
        </div>
    </div>
  );
}
*/

/*
import './restaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarRestaurant } from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Slideshow from "../components/Slideshow.js";
import API from "../API/api.js";

const slideImages = [
    {
      url: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/05/kfc-restaurant-exterior.jpg?quality=82&strip=1&w=640',
      caption: 'Slide 1'
    },
    {
      url: 'https://www.wattagnet.com/ext/resources/2022/03/11/KFC-restaurant-in-food-court.jpg',
      caption: 'Slide 2'
    },
    {
      url: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/37/59/86/in-food-court.jpg',
      caption: 'Slide 3'
    },
];

export default function RestaurantPage() {
  const restaurantId = 2;
  
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  let restaurantReview = "Restaurant Review";
  let restaurantDetails = "Restaurant Details";
  const renderRestaurantImages = Slideshow(slideImages);

  const fetchRestaurantData = async () => {
    try {
      API.get(`http://localhost:3333/restaurant/${restaurantId}`).then((res) => {
        const data = res.data;
        // console.log(data);
        return data;
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching restaurant data");
    }
  }

  useEffect(() => {
    fetchRestaurantData().then((data) => {
      console.log("Data Received");
      setRestaurantName(data.restaurantName);
      console.log(data);
    })
  }, [restaurantName]);

    return (
        <div>
            <NavbarRestaurant />
            <div className="restaurant">
                <h1 className="restaurant__name">{restaurantName}</h1>
                <hr className="line" />
                {renderRestaurantImages}
                <h2 className="restaurant__review">Review: {restaurantReview}</h2>
                <h3 className="restaurant__details">Details: {restaurantDetails}</h3>
            </div>
        </div>
    );
}
*/