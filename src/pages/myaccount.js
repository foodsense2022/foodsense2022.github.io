import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./myaccount.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { NavigationBar } from "../components/Navbar.js";
import logo4 from "../icons/foodsenselogo4.png";

function MyAccount() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);
    
    return (
        <div>
            <NavigationBar />
            <img src={logo4} className="logo_myaccount"/>
            <div className="dashboard">
                <div className="dashboard__container">
                    <h1 className="dashboard__text">Logged in as</h1>
                    <h1 className="dashboard__text">{name}</h1>
                    <h1 className="dashboard__text">{user?.email}</h1>
                    <button className="dashboard__btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;