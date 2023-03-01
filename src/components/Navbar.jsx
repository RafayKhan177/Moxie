import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Cart from "./Cart";
import { useState } from "react";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const toggleCart=()=>{
    setShowCart(!showCart
      )
  }

  return (
    <>
      <nav>
        <div onClick={() => setShowCart(!showCart)}>
          <motion.NavLink
            whileTap={{ scale: 0.75 }}
            className="nav_link flex items-center"
          >
            <HiOutlineShoppingCart />1
          </motion.NavLink>
        </div>
        <NavLink className="nav_link" to="Moxie">
          HOME
        </NavLink>
        <NavLink className="nav_link" to="">
          LINK
        </NavLink>
        <NavLink className="nav_link" to="">
          Blog
        </NavLink>
      </nav>
      <Cart showCart={showCart} toggleCart={toggleCart}/>
    </>
  );
};

export default Navbar;
