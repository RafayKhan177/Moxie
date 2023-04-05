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
  const userData = items.userData[0];
  const navigate = useNavigate();

  const firebase = useFirebase();
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <>
      <nav>
        <div onClick={() => setShowCart(!showCart)}>
          <motion.div whileTap={{ scale: 0.75 }}>
            <NavLink className="nav_link flex items-center">
              <HiOutlineShoppingCart />
              {items.cart.length}
            </NavLink>
          </motion.div>
        </div>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="img_div"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={userData ? userData.photoURL : Avatar} alt="profile" />
        </motion.div>
      </nav>
      {showMenu ? (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="profile_menu"
        >
          <ul>
            <li
              onClick={() => {
                navigate("/Moxie");
                setShowMenu(false);
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/Home/TrackOrders");
                setShowMenu(false);
              }}
            >
              Track Orders
            </li>
            <li
              onClick={() => {
                navigate("/Home/Account");
                setShowMenu(false);
              }}
            >
              Account
            </li>
            {firebase.user && firebase.user.email === "admin@gmail.com" && (
              <li
                onClick={() => {
                  navigate("Home/Dashboard");
                  setShowMenu(false);
                }}
              >
                Dashboard
              </li>
            )}
            {/* {!firebase.user && (
              <li
                onClick={() => {
                  navigate("Home/NotAuthorized");
                  setShowMenu(false);
                }}
              >
                Not Authorized
              </li>
            )} */}
          </ul>
        </motion.div>
      ) : null}
      <Cart showCart={showCart} toggleCart={toggleCart} data={items.cart} />
    </>
  );
};

export default Navbar;
