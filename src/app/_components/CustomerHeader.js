'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
    const [user, setUser] = useState(undefined);
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const router = useRouter();

    // Initialize localStorage data on the client side
    useEffect(() => {
        const userStorage = localStorage.getItem('user') 
            ? JSON.parse(localStorage.getItem('user')) 
            : undefined;
        const cartStorage = localStorage.getItem('cart') 
            ? JSON.parse(localStorage.getItem('cart')) 
            : [];

        setUser(userStorage);
        setCartItem(cartStorage);
        setCartNumber(cartStorage.length);
    }, []);

    // Handle adding cart data
    useEffect(() => {
        if (props.cartData) {
            const { resto_id } = props.cartData;

            if (cartItem.length && cartItem[0].resto_id !== resto_id) {
                // Clear cart if restaurant ID differs
                localStorage.removeItem('cart');
                setCartItem([props.cartData]);
                setCartNumber(1);
                localStorage.setItem('cart', JSON.stringify([props.cartData]));
            } else {
                // Add item to cart
                const updatedCart = [...cartItem, props.cartData];
                setCartItem(updatedCart);
                setCartNumber(updatedCart.length);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        }
    }, [props.cartData, cartItem]);

    // Handle removing cart data
    useEffect(() => {
        if (props.removeCartData) {
            const updatedCart = cartItem.filter(item => item._id !== props.removeCartData);
            setCartItem(updatedCart);
            setCartNumber(updatedCart.length);

            if (updatedCart.length === 0) {
                localStorage.removeItem('cart');
            } else {
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        }
    }, [props.removeCartData, cartItem]);

    // Logout user
    const logout = () => {
        localStorage.removeItem('user');
        router.push('/user-auth');
    };

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img
                    style={{ width: 100 }}
                    src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
                    alt="Logo"
                />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <Link href="/myprofile">{user.name}</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/">Login</Link>
                        </li>
                        <li>
                            <Link href="/user-auth">SignUp</Link>
                        </li>
                    </>
                )}
                <li>
                    <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber || 0})</Link>
                </li>
                <li>
                    <Link href="/">Add Restaurant</Link>
                </li>
                <li>
                    <Link href="/deliverypartner">Delivery Partner</Link>
                </li>
            </ul>
        </div>
    );
};

export default CustomerHeader;
