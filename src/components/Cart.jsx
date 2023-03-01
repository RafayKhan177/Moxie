import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import ShoePic from "../assets/shoe_pic.png";

const Cart = ({ showCart, toggleCart }) => {
  return (
    <>
      {showCart ? (
        <motion.section
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="cart_main"
        >
          <div className="cart_header">
            <MdOutlineKeyboardBackspace
              className="icon"
              onClick={() => toggleCart()}
            />{" "}
            <p>Cart</p>
            <p className="icon">
              Clear
              <RiRefreshFill />
            </p>
          </div>
          <div className="cart_items scrollbar-hide">
            <div className="cart_item">
              <img className="item_pic" src={ShoePic} alt="cart item pic" />
              <div className="details">
                <p>New Balance 990</p>
                <p>$ 174.99</p>
              </div>
              <div className="qty">
                <p>-</p>
                <p className="qtyind">1</p>
                <p>+</p>
              </div>
            </div>
          </div>
          <div className="checkout">
            <div>
              <div className="price">
                <p>sub total: </p>
                <p>$ 1149.6</p>
              </div>
              <div className="price">
                <p>delivery: </p>
                <p>$ 2.5</p>
              </div>
            </div>
            <h4>Total: 500$</h4>
            <motion.div whileTap={{ scale: 0.75 }}>
              <span>Check Out</span>
            </motion.div>
          </div>
        </motion.section>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Cart;
