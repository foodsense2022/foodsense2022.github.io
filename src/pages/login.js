import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";
import { NavigationBar } from "../components/Navbar";
import logo1 from "../icons/foodsenselogo1.png";
import logo4 from "../icons/foodsenselogo4.png";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            navigate("/myaccount");
        }
    }, [user, loading]);
    return (
        <div>
            <NavigationBar />
            <img src={logo4} className="logo_login"/>
            <div className="login">
                <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/signup">Sign Up</Link> now.
                </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

/* Version 1
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import loginService from '../services/login-service';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
    }, []);

    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (hasError()) {
            setIsAuthorized(false);
        } else {
            loginService({email, password}).then(result => {
                const success = result.data.success;
                if (success) {
                    setIsAuthorized(true);
                    setUser(result.data);
                    localStorage.setItem("user", JSON.stringify(result.data));
                } else {
                    const isEmailError = result.data.emailError;
                    if (isEmailError) {
                        setIsAuthorized(false);
                        setErrorMessages({name: "email", message: result.data.errorMessage})
                    } else {
                        setIsAuthorized(false);
                        setErrorMessages({name: "password", message: result.data.errorMessage})
                    }
                }
                console.log(result.data);
            });
        }
    }
    
    const verifyEmail = (email) => {
        return true;
    }

    const verifyAndSetEmail = (email) => {
        if(verifyEmail(email)) {
            setEmail(email);
            setErrorMessages({})
        } else {
            setErrorMessages({name: "email", message: "Invalid email"})
        }
        console.log(email);
    }

    const verifyPassword = (password) => {
        return true;
    }

    const verifyAndSetPassword = (password) => {
        if (verifyPassword(password)) {
            setPassword(password)
            setErrorMessages({})
        } else {
            setErrorMessages({name: "password", message: "Invalid password"})
        }
        console.log(password);
    }

    const hasError = () => {
        return false 
    }

    const renderErrorMessages = (errorName) => {
        if (errorMessages.name === errorName) {
            return <div className="error">{errorMessages.message}</div>;
        } else {
            return <></>
        }
    }

    if (!isAuthorized && !user) {
        return (
            <div>
                <Navbar />
                <div className="login">
                    <div className="login-form">
                        <div className="title">Log In</div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-container">
                                <label>Email </label>
                                <input type="email" name="email" onChange={e => verifyAndSetEmail(e.target.value)} required />
                                {console.log(errorMessages.name)}
                                {renderErrorMessages("email")}
                            </div>
                            <div className="input-container">
                                <label>Password </label>
                                <input type="password" name="pass" onChange={e => verifyAndSetPassword(e.target.value)} required />
                                {console.log(errorMessages.name)}
                                {renderErrorMessages("password")}
                            </div>
                            <div className="button-container">
                                <input type="submit" />
                            </div>
                    </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Navbar />
                <div className="login">
                    <div className="login-form">
                        <div className="title">Log In</div>
                        <div>User is successfully logged in</div>
                        <button onClick={handleLogout}>logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
*/