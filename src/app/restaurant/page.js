'use client'
import { useState } from "react";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";
import './style.css'
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSignUp";

const Restaurant = () => {
    const [login, setLogin] = useState(true)
    return (
        <>
        <div className="container">
            <RestaurantHeader />
            <h1>Restaurant Login/Signup Page</h1>
            {
                login ? <RestaurantLoginn/> : <RestaurantSignUp />
            }

            <div>
                <button className="button-link" onClick={() => setLogin(!login)}>
                    {login ? "Do not have account? SignUp" : "Already have Account? Login"}
                </button>
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Restaurant;