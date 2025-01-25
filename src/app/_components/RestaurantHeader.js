"use client";
import React, { useEffect, useState } from 'react';
import './../style.css'
import Link from 'next/link'
import { useRouter , usePathname} from 'next/navigation';
const RestaurantHeader = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [details, setDetails] = useState();
    useEffect(() => {
        let data = localStorage.getItem("restaurantUser");
        if (!data &&  pathName == "/restaurant") {
            router.push("/restaurant")
        } else if (data && pathName == "/restaurant"){
            router.push("/restaurant/dashboard")

        }
        else {
            setDetails(JSON.parse(data))
        }
    }, [])
 const logout = ()=>{
localStorage.removeItem("restaurantUser")
router.push("/restaurant")

}  
  return (
        <div className='header-wrapper'>
            <div>
                <img alt="logo" src="/foodlogo.png" style={{ width: 200 }} />
            </div>
            <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                {
                    details && details.name?
                    <> 
                    <Link href="/">Profile</Link>
                    <button onClick={logout}>Logout</button>
                    </>
                    :<Link href="/">Login/SignUp</Link>

                }
            </li>
            </ul>
        </div>
    )
}

export default RestaurantHeader
