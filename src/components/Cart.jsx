import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import ShoePic from "../assets/shoe_pic.png";
import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../redux/slices/cartSlice";

const Cart = ({ showCart, toggleCart, data }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  const cartItems = items.cart;

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + parseInt(item.price);
  }, 0);

  const handleClearCart = () => {
    dispatch(clearItems());
  };

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
            <p className="icon" onClick={handleClearCart}>
              Clear <RiRefreshFill />
            </p>
          </div>
          <div className="cart_items scrollbar-hide">
            {cartItems &&
              cartItems.map((item) => (
                <div className="cart_item">
                  <img
                    className={item.image}
                    src={ShoePic}
                    alt="cart item pic"
                  />
                  <div className="details">
                    <p>{item.name}</p>
                    <p>$ {item.price}</p>
                  </div>
                  <div className="qty">
                    <p>-</p>
                    <p className="qtyind">1</p>
                    <p>+</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="checkout">
            <div>
              <div className="price">
                <p>sub total: </p>
                <p>$ {subTotal}</p>
              </div>
              <div className="price">
                <p>delivery: </p>
                <p>$ 2.5</p>
              </div>
            </div>
            <h4>Total: {subTotal + 2.5}$</h4>
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
