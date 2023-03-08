import { useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import ShoePic from "../assets/shoe_pic.png";
import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../redux/slices/cartSlice";
import { useFirebase } from "../context/firebase";

const Cart = ({ showCart, toggleCart, data }) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + parseInt(item.price);
  }, 0);

  const total = subTotal + 2.5;
  const placeOrder = async () => {
    const items = cartItems.map((item) => {
      const { name, price, category, description, image } = item;
      return { name, price, category, description, image };
    });
    console.log(items);
    // Check that all required fields are defined
    if (items.length && subTotal && total) {
      await firebase.placeOrder(items, subTotal, total);
      dispatch(clearItems());
      console.log(items, subTotal, total);
    } else {
      console.error("Invalid data passed to placeOrder");
    }
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
          <div key={cartItems.name + Date.now()} className="cart_header">
            <MdKeyboardBackspace
              className="icon"
              onClick={() => toggleCart()}
            />{" "}
            <p>Cart</p>
            <p className="icon" onClick={() => dispatch(clearItems())}>
              Clear <RiRefreshFill />
            </p>
          </div>
          <div className="cart_items scrollbar-hide">
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.name} className="cart_item">
                  <img
                    className="cart_item_image"
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
            <h4>Total: {total}$</h4>
            <motion.div whileTap={{ scale: 0.75 }}>
              <span onClick={placeOrder}>Check Out</span>
            </motion.div>
          </div>
        </motion.section>
      ) : null}
    </>
  );
};

export default Cart;
