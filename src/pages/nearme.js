import './nearme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from "../components/Navbar.js";
import React, {useState, useEffect, useRef} from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import marker from "../icons/marker.svg"
import markerUser from "../icons/userlocation.png";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import {categoryList, ratingList} from "../components/datalist.js";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Data from "../mockdata/restaurant.json";
import Restaurant from './restaurant';
import setting from "../icons/setting.png";
import star from "../icons/star.png";
import API from "../API/api.js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function NearMe() {
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
        setData(Data);
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

  const [showFilter, setShowFilter] = useState(false);

  function GetIcon(_iconSize) {
    return L.icon ({
      iconUrl: marker,
      iconSize: _iconSize
    });
  } 

  function GetIconUser(_iconSize) {
    return L.icon ({
      iconUrl: markerUser,
      iconSize: _iconSize
    });
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        console.log(position);
      },
    })
  
    return position === null ? null : (
      <div>
        {
            data
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
              
              if (calcDist(restaurant.restaurantDetails.geoLocation, {lattitude: position.lat, longitude: position.lng}) <= selectedRadius * 1000) {
                console.log(restaurant.restaurantName);
                console.log(calcDist(restaurant.restaurantDetails.geoLocation, {lattitude: position.lat, longitude: position.lng}));
                return Restaurant;

              }
            })
            .map(restaurant => {
              return RestaurantMarker(restaurant);
            })
          }
        <Marker position={position} icon={GetIconUser(50)}>
          <Popup className="restaurantRating">You are here</Popup>
        </Marker>
      </div>

    )
  }

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(3);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleRatingChange(event) {
    setSelectedRating(event.target.value);
  }

  function handleRadiusChange(event) {
    setSelectedRadius(event.target.value);
    console.log(selectedRadius);
  }

  function RestaurantMarker(restaurant) {
    const restaurantPosition = {lat: restaurant.restaurantDetails.geoLocation.lattitude, lng: restaurant.restaurantDetails.geoLocation.longitude}
    
    return (

      <Marker position={restaurantPosition} icon={GetIcon(30)}>
        <Popup>
          <Typography gutterBottom variant="h5" component="div">
          {restaurant.restaurantName}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
          {restaurant.restaurantSentimentAnalysis.rating} <img className="starImg" src={star} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {restaurant.restaurantDetails.physicalAddress}
          </Typography>
          <CardActions>
            <Button size="small" component={Link} to={'/restaurant/' + restaurant.restaurantID} className="readmore" >Read More</Button>
          </CardActions>
        </Popup>
      </Marker>
    )
  }

  function calcDist(coords1, coords2) {
    // var R = 6.371; // km
    var R = 6371000 // m;
    var dLat = toRad(coords2.lattitude-coords1.lattitude);
    var dLon = toRad(coords2.longitude-coords1.longitude);
    var lat1 = toRad(coords1.lattitude);
    var lat2 = toRad(coords2.lattitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return Value * Math.PI / 180;
  }

  // console.log(calcDist(Data[0].restaurantDetails.geoLocation, Data[1].restaurantDetails.geoLocation))

  return (
    <div>
      <NavigationBar />
      <div className="configuration">
        <h1 className="nearmeTitle">Tap to <i>"Sense"</i> the Restaurants Near You!</h1>
        <h2 className="nearmeSubTitle">Or Configure According to Your Preferences...</h2>
        <button className="filterButton" onClick={() => {setShowFilter(!showFilter); console.log(showFilter);}}><img src={setting} className="filterButtonImg" /></button>
        {
          showFilter &&
          <div className="filterDiv">
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
          <div>
            <div className="searchRadiusCaption">Search Radius (in KM): </div>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <div className="min">Min</div>
              <Slider
                id="radiusSlider"
                size="small"
                defaultValue={3}
                aria-label="small"
                valueLabelDisplay="auto"
                marks
                min={1}
                max={10}
                value={selectedRadius} 
                onChange={handleRadiusChange}
              />
              <p className="max">Max</p>
            </Stack>

          </div>
          </div>
        }

      </div>
      <div className="MAP">
        <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={false} id="map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default NearMe;

/*
import './nearme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarHome } from "../components/Navbar.js";
import React, {useState, useEffect, useRef} from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import marker from "../icons/marker.svg"
import markerUser from "../icons/userlocation.png";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import {categoryList, ratingList} from "../components/datalist.js";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Data from "../mockdata/restaurant.json";
import Restaurant from './restaurant';
import setting from "../icons/setting.png";
import star from "../icons/star.png";
import API from "../API/api.js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function NearMe() {
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

  const [showFilter, setShowFilter] = useState(false);

  function GetIcon(_iconSize) {
    return L.icon ({
      iconUrl: marker,
      iconSize: _iconSize
    });
  } 

  function GetIconUser(_iconSize) {
    return L.icon ({
      iconUrl: markerUser,
      iconSize: _iconSize
    });
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        console.log(position);
      },
    })
  
    return position === null ? null : (
      <div>
        {
            data
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
              
              if (calcDist(restaurant.restaurantDetails.geoLocation, {lattitude: position.lat, longitude: position.lng}) <= selectedRadius * 1000) {
                console.log(restaurant.restaurantName);
                console.log(calcDist(restaurant.restaurantDetails.geoLocation, {lattitude: position.lat, longitude: position.lng}));
                return Restaurant;

              }
            })
            .map(restaurant => {
              return RestaurantMarker(restaurant);
            })
          }
        <Marker position={position} icon={GetIconUser(50)}>
          <Popup className="restaurantRating">You are here</Popup>
        </Marker>
      </div>

    )
  }

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(3);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleRatingChange(event) {
    setSelectedRating(event.target.value);
  }

  function handleRadiusChange(event) {
    setSelectedRadius(event.target.value);
    console.log(selectedRadius);
  }

  function RestaurantMarker(restaurant) {
    const restaurantPosition = {lat: restaurant.restaurantDetails.geoLocation.lattitude, lng: restaurant.restaurantDetails.geoLocation.longitude}
    
    return (

      <Marker position={restaurantPosition} icon={GetIcon(30)}>
        <Popup>
          <h1 className="restaurantName"><a href={"./restaurant/" + restaurant.restaurantID}>{restaurant.restaurantName}</a></h1>
          <h2 className="restaurantRating">{restaurant.restaurantSentimentAnalysis.rating} <img className="starImg" src={star} /></h2>
        </Popup>
      </Marker>
    )
  }

  function calcDist(coords1, coords2) {
    // var R = 6.371; // km
    var R = 6371000 // m;
    var dLat = toRad(coords2.lattitude-coords1.lattitude);
    var dLon = toRad(coords2.longitude-coords1.longitude);
    var lat1 = toRad(coords1.lattitude);
    var lat2 = toRad(coords2.lattitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return Value * Math.PI / 180;
  }

  // console.log(calcDist(Data[0].restaurantDetails.geoLocation, Data[1].restaurantDetails.geoLocation))

  return (
    <div>
      <NavbarHome />
      <div className="configuration">
        <h1 className="nearmeTitle">Tap to <i>"Sense"</i> the Restaurants Near You!</h1>
        <h2 className="nearmeSubTitle">Or Configure According to Your Preferences...</h2>
        <button className="filterButton" onClick={() => {setShowFilter(!showFilter); console.log(showFilter);}}><img src={setting} className="filterButtonImg" /></button>
        {
          showFilter &&
          <div className="filterDiv">
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
          <div>
            <div className="searchRadiusCaption">Search Radius (in KM): </div>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <div className="min">Min</div>
              <Slider
                id="radiusSlider"
                size="small"
                defaultValue={3}
                aria-label="small"
                valueLabelDisplay="auto"
                marks
                min={1}
                max={10}
                value={selectedRadius} 
                onChange={handleRadiusChange}
              />
              <p className="max">Max</p>
            </Stack>

          </div>
          </div>
        }

      </div>
      <div className="MAP">
        <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={false} id="map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default NearMe;
*/

/*
import './nearme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarHome } from "../components/Navbar.js";
import React, {useState, useEffect, useRef} from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import marker from "../icons/marker.svg"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

function getGeoLocation() {
  var map = L.map('map');
  map.locate()
}
 
function NearMe() {

  const [userPosition, setUserPosition] = useState([1.3521, 103.8198]);

  return (
    <div>
      <NavbarHome />
      <button className="searchButton" >Search</button>
      <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={false} id="map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </MapContainer>
    </div>

  );
}
*/

/*
import './nearme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarHome } from "../components/Navbar.js";
import React, {useState, useEffect, useRef} from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import marker from "../icons/marker.svg"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

function NearMe() {

  const [userLocationIsShown, setUserLocationIsShown] = useState(false);

  function GetIcon(_iconSize) {
    return L.icon ({
      iconUrl: marker,
      iconSize: _iconSize
    });
  } 

  const handleClick = event => {
    setUserLocationIsShown(true);
    console.log("click")
  };

  function UserLocation() {
    
  //   const map = useMap();

  //   map.locate({setView: true, watch: true}) 
  //   .on('locationfound', function(e){
  //     console.log("Location Found");
  //   })
  //  .on('locationerror', function(e){
  //       console.log(e);
  //       alert("Location access denied.");
  //   });

  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
      console.log(position);
    },
  })

  return position === null ? <div></div> : (
    <Marker position={position} icon={GetIcon(30)}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
      console.log(position);
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={GetIcon(30)}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

return (
  <div>
    <NavbarHome />
    <button className="searchButton" onClick={handleClick}>Search</button>
    {
      userLocationIsShown &&
      <div>TEST</div>
    }
    <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={false} id="map">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    </MapContainer>
  </div>

);
}

export default NearMe;
*/
/* Leaflet Works
import './nearme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarHome } from "../components/Navbar.js";
import React, {useState, useEffect, useRef} from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import marker from "../icons/marker.svg"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

function NearMe() {

  function HandleSubmit() {
    
    const map = useMap();
  }

  function GetIcon(_iconSize) {
    return L.icon ({
      iconUrl: marker,
      iconSize: _iconSize
    });
  } 

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        console.log(position);
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={GetIcon(30)}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <div>
      <NavbarHome />
      <button>Search</button>
      <MapContainer center={[1.3521, 103.8198]} zoom={13} scrollWheelZoom={false} id="map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>

  );
}

export default NearMe;
*/

/* MAPBOX
import './nearme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarHome } from "../components/Navbar.js";
import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = '1234'; // Set your mapbox token here

function NearMe() {

    return (
        <div>
            <NavbarHome />
            <div className="map">
            <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
      }}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
            </div>
        </div>
    );
}

export default NearMe;
*/