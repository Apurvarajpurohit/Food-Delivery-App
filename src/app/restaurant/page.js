'use client'
import { useState } from "react"
import '../style.css';
import RestaurantFooter from "../_components/RestaurantFooter"
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
const Restaurant = () => {
    const [login, setLogin] = useState(true)
    const { NEXT_PUBLIC_USERNAME, NEXT_PUBLIC_PASSWORD } = process.env;
    console.log(NEXT_PUBLIC_USERNAME, NEXT_PUBLIC_PASSWORD, 'hello');
    return (
        <div className="container">
            <RestaurantHeader/>
            {login ?
                <RestaurantLogin/>

                : <RestaurantSignUp/>
            }
            <div>
                <button className="button-link" onClick={() => setLogin(!login)}>
                    {login ?
                        "Do not have Account? Signup" :
                        "Already have Account?login"
                    }
                </button>
            </div>
            <RestaurantFooter/>
        </div>
    )
}
export default Restaurant