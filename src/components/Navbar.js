import React, { useState, useEffect, useRef } from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled, { createGlobalStyle } from "styled-components";
import logo4 from "../icons/foodsenselogo4.png";

const renderFormLoggedIn = (
    <div>
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to='/' activeStyle>
                    FoodSense
                </NavLink>
                <NavLink to='/restaurant' activeStyle>
                    Search Restaurant
                </NavLink>
                <NavLink to='/nearme' activeStyle>
                    Near Me
                </NavLink>
                <NavLink to='/recommend' activeStyle>
                    My Recommendations
                </NavLink>
                <NavLink to='/myaccount' activeStyle>
                    My Account
                </NavLink>
            </NavMenu>
        </Nav>
    </div>
);

const renderFormNotLoggedIn = (
    <div>
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to='/' activeStyle>
                    FoodSense
                </NavLink>
                <NavLink to='/restaurant' activeStyle>
                    Search Restaurant
                </NavLink>
                <NavLink to='/nearme' activeStyle>
                    Near Me
                </NavLink>
                <NavLink to='/recommend' activeStyle>
                    My Recommendations
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to='/login'>Log In</NavBtnLink>
            </NavBtn>
        </Nav>
    </div>
);

export function NavbarHome() {
    const [renderForm, setRenderForm] = useState(renderFormNotLoggedIn);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            setRenderForm(renderFormLoggedIn);
        } 
    }, [user, loading, renderForm]);

    return renderForm;
}

export function NavbarLogin() {
    return (
        <div>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to='/' activeStyle>
                        FoodSense
                    </NavLink>
                    <NavLink to='/restaurant' activeStyle>
                        Search Restaurant
                    </NavLink>
                    <NavLink to='/nearme' activeStyle>
                        Near Me
                    </NavLink>
                    <NavLink to='/recommend' activeStyle>
                        My Recommendations
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
                </NavBtn>
            </Nav>
        </div>
    );
}

export function NavbarSignup() {
    return (
        renderFormNotLoggedIn
    );
}

export function NavbarReset() {
    return (
        renderFormNotLoggedIn
    );
}

export function NavbarMyAccount() {
    return (
        renderFormLoggedIn
    );
}

export function NavbarRestaurant() {
    const [renderForm, setRenderForm] = useState(renderFormNotLoggedIn);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            setRenderForm(renderFormLoggedIn);
        } 
    }, [user, loading, renderForm]);

    return renderForm;
}

export function NavbarSearch() {
    const [renderForm, setRenderForm] = useState(renderFormNotLoggedIn);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            setRenderForm(renderFormLoggedIn);
        } 
    }, [user, loading, renderForm]);

    return renderForm;
}

export function NavbarRecommend() {
    const [renderForm, setRenderForm] = useState(renderFormNotLoggedIn);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            setRenderForm(renderFormLoggedIn);
        } 
    }, [user, loading, renderForm]);

    return renderForm;
}

export function NavigationBar() {
    const [openDrawer, toggleDrawer] = useState(false);
    const drawerRef = useRef(null);
    const [user, loading, error] = useAuthState(auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
        /* Close the drawer when the user clicks outside of it */
        if (loading) {
            // maybe trigger a loading screen
            return;
        }

        if (user && !isLoggedIn) {
            setIsLoggedIn(true);
        } 

        const closeDrawer = event => {
            if (drawerRef.current && drawerRef.current.contains(event.target)) {
                return;
            }
            toggleDrawer(false);
        };
    
        document.addEventListener("mousedown", closeDrawer);
        return () => document.removeEventListener("mousedown", closeDrawer);
    }, [user, loading, isLoggedIn]);
  
    return (
        <Styles.Wrapper>
            <Navbar.Wrapper>
                <Navbar.Logo>
                    <NavLink to='/' activeStyle>
                        <img width="75" src={logo4} />
                    </NavLink>
                </Navbar.Logo>
        
                <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
                    <HamburgerButton.Lines />
                </HamburgerButton.Wrapper>
        
                <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
                    <Navbar.Item>
                        <NavLink to='/' activeStyle>
                            FoodSense
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item>                
                        <NavLink to='/restaurant' activeStyle>
                        Search Restaurant
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item>
                        <NavLink to='/nearme' activeStyle>
                            Near Me
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item>
                        <NavLink to='/recommend' activeStyle>
                            My Recommendations
                        </NavLink>
                    </Navbar.Item>
                    {isLoggedIn &&
                        <Navbar.Item>
                            <NavLink to='/myaccount' activeStyle>
                                My Account
                            </NavLink>
                        </Navbar.Item>
                    }
                    {!isLoggedIn &&
                        <Navbar.Item>
                            <NavLink to='/login' activeStyle>
                                Log In
                            </NavLink>
                        </Navbar.Item>
                    }
                </Navbar.Items>
            </Navbar.Wrapper>
        </Styles.Wrapper>
    );
}

const Styles = {
    Wrapper: styled.main`
        display: flex;
        background-color: #eeeeee;
        height: 0vh;
    `
};

const Navbar = {
    Wrapper: styled.nav`
        flex: 1;

        align-self: flex-start;

        padding: 1rem 3rem;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: black;

        // 40em == 640px
        @media only screen and (max-width: 40em) {
            /* position: fixed; */
            width: 100vw;
            top: 0;
        }
    `,
    Logo: styled.h1`
        border: 0px solid gray;
        padding: 0rem 0rem;
    `,
    Items: styled.ul`
        display: flex;
        list-style: none;

        @media only screen and (max-width: 40em) {
            position: fixed;
            right: 0;
            top: 0;

            height: 100%;

            flex-direction: column;

            background-color: black;
            padding: 1rem 2rem;

            transition: 0.2s ease-out;

            transform: ${({ openDrawer }) =>
                openDrawer ? `translateX(0)` : `translateX(100%)`};
        }
    `,
    Item: styled.li`
        padding: 0 1rem;
        cursor: pointer;

        @media only screen and (max-width: 40em) {
        padding: 1rem 0;
        }
    `
    };

    const HamburgerButton = {
    Wrapper: styled.button`
        height: 3rem;
        width: 3rem;
        position: relative;
        font-size: 12px;

        display: none;

        @media only screen and (max-width: 40em) {
            display: block;
        }

        /* Remove default button styles */
        border: none;
        background: transparent;
        outline: none;

        cursor: pointer;

        &:after {
        content: "";
        display: block;
        position: absolute;
        height: 150%;
        width: 150%;
        top: -25%;
        left: -25%;
        }
    `,
    Lines: styled.div`
        top: 50%;
        margin-top: -0.125em;

        &,
        &:after,
        &:before {
        /* Create lines */
        height: 2px;
        pointer-events: none;
        display: block;
        content: "";
        width: 100%;
        background-color: white;
        position: absolute;
        }

        &:after {
        /* Move bottom line below center line */
        top: -0.8rem;
        }

        &:before {
        /* Move top line on top of center line */
        top: 0.8rem;
        }
    `
};

const CSSReset = createGlobalStyle`
    *,
    *::before, 
    *::after {
        margin: 0; 
        padding: 0;
        box-sizing: inherit;
    }

    html {
        font-size: 62.5%; /*1rem = 10px*/
        box-sizing: border-box;      
    }  

    body {
        font-size: 1.4rem;
        font-family: sans-serif;
    }
`;

/*
export function NavigationBar() {
    const [openDrawer, toggleDrawer] = useState(false);
    const drawerRef = useRef(null);
  
    useEffect(() => {
        
        const closeDrawer = event => {
            if (drawerRef.current && drawerRef.current.contains(event.target)) {
                return;
            }
    
            toggleDrawer(false);
        };
    
        document.addEventListener("mousedown", closeDrawer);
        return () => document.removeEventListener("mousedown", closeDrawer);
    }, []);
  
    return (
        <Styles.Wrapper>
            <Navbar.Wrapper>
                <Navbar.Logo>
                    <NavLink to='/' activeStyle>
                        <img width="75" src={logo4} />
                    </NavLink>
                </Navbar.Logo>
        
                <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
                    <HamburgerButton.Lines />
                </HamburgerButton.Wrapper>
        
                <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
                    <Navbar.Item>
                        <NavLink to='/' activeStyle>
                            FoodSense
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item>                
                        <NavLink to='/restaurant' activeStyle>
                        Search Restaurant
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item>
                        <NavLink to='/nearme' activeStyle>
                            Near Me
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item>
                        <NavLink to='/recommend' activeStyle>
                            My Recommendations
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item>
                        <NavLink to='/login' activeStyle>
                            Log In
                        </NavLink>
                    </Navbar.Item>
                    
                </Navbar.Items>
                
            </Navbar.Wrapper>
        </Styles.Wrapper>
    );
}

const Styles = {
    Wrapper: styled.main`
        display: flex;
        background-color: #eeeeee;
        height: 0vh;
    `
};

const Navbar = {
    Wrapper: styled.nav`
        flex: 1;

        align-self: flex-start;

        padding: 1rem 3rem;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: black;

        // 40em == 640px
        @media only screen and (max-width: 40em) {
            position: fixed;
            width: 100vw;
            bottom: 0;
        }
    `,
    Logo: styled.h1`
        border: 0px solid gray;
        padding: 0rem 0rem;
    `,
    Items: styled.ul`
        display: flex;
        list-style: none;

        @media only screen and (max-width: 40em) {
            position: fixed;
            right: 0;
            top: 0;

            height: 100%;

            flex-direction: column;

            background-color: black;
            padding: 1rem 2rem;

            transition: 0.2s ease-out;

            transform: ${({ openDrawer }) =>
                openDrawer ? `translateX(0)` : `translateX(100%)`};
        }
    `,
    Item: styled.li`
        padding: 0 1rem;
        cursor: pointer;

        @media only screen and (max-width: 40em) {
        padding: 1rem 0;
        }
    `
    };

    const HamburgerButton = {
    Wrapper: styled.button`
        height: 3rem;
        width: 3rem;
        position: relative;
        font-size: 12px;

        display: none;

        @media only screen and (max-width: 40em) {
            display: block;
        }

        
        border: none;
        background: transparent;
        outline: none;

        cursor: pointer;

        &:after {
        content: "";
        display: block;
        position: absolute;
        height: 150%;
        width: 150%;
        top: -25%;
        left: -25%;
        }
    `,
    Lines: styled.div`
        top: 50%;
        margin-top: -0.125em;

        &,
        &:after,
        &:before {
        
        height: 2px;
        pointer-events: none;
        display: block;
        content: "";
        width: 100%;
        background-color: white;
        position: absolute;
        }

        &:after {
        
        top: -0.8rem;
        }

        &:before {
        
        top: 0.8rem;
        }
    `
};

const CSSReset = createGlobalStyle`
    *,
    *::before, 
    *::after {
        margin: 0; 
        padding: 0;
        box-sizing: inherit;
    }

    html {
        font-size: 62.5%; 
        box-sizing: border-box;      
    }  

    body {
        font-size: 1.4rem;
        font-family: sans-serif;
    }
`;

*/