import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Cart from "./Cart";
import { useState } from "react";
import Avatar from "../assets/Avatar.png";

import { useFirebase } from "../context/firebase";
import { useSelector } from "react-redux";

const Navbar = () => {
    const items = useSelector((state) => state);
  
  const firebase = useFirebase();
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <div onClick={() => setShowCart(!showCart)}>
          <motion.div whileTap={{ scale: 0.75 }}>
            <NavLink className="nav_link flex items-center">
              <HiOutlineShoppingCart />{items.cart.length}
            </NavLink>
          </motion.div>
        </div>
        <NavLink className="nav_link" to="Moxie">
          Home
        </NavLink>
        <NavLink className="nav_link" to="/Home/Profile">
          Profile
        </NavLink>
        <NavLink className="nav_link" to="">
          Blog
        </NavLink>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="img_div"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={Avatar} alt="profile" />
        </motion.div>
      </nav>
      {showMenu ? (
        <div className="profile_menu">
          <ul>
            <li>Profile</li>
            <li
              onClick={() => {
                navigate("Home/SignUp");
                setShowMenu(false);
              }}
            >
              Sign Up
            </li>
            <li
              onClick={() => {
                navigate("Home/SignIn");
                setShowMenu(false);
              }}
            >
              Sign In
            </li>
            <li
              onClick={() => {
                navigate("Home/Add-Items");
                setShowMenu(false);
              }}
            >
              Add items
            </li>
          </ul>
        </div>
      ) : null}
      <Cart showCart={showCart} toggleCart={toggleCart} data={items.cart}/>
    </>
  );
};

export default Navbar;
