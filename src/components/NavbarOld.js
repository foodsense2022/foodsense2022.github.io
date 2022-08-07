import React, { useState } from 'react'; 
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function setIsLoggedInTrue() {
    setIsLoggedIn(true);
  }

  function setIsLoggedInFalse() {
    setIsLoggedIn(false);
  }

  if (isLoggedIn) {
    return (
      <>
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/' activeStyle>
              FoodSense
            </NavLink>
            <NavLink to='/search' activeStyle>
              Search Restaurant
            </NavLink>
            <NavLink to='/favourite' activeStyle>
              My Favourites
            </NavLink>
            <NavLink to='/nearme' activeStyle>
              Near Me
            </NavLink>
            <NavLink to='/surprise' activeStyle>
              Surprise Me
            </NavLink>
            <NavLink to='/myaccount' activeStyle>
              My Account
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
        </Nav>
      </>
    );

  } else {
    return (
      <>
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/' activeStyle>
              FoodSense
            </NavLink>
            <NavLink to='/search' activeStyle>
              Search Restaurant
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='/login'>Log In</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    );
  }
}


