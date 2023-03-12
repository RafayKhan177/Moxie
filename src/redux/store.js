import { configureStore, createReducer } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import displayItemsReducer from "./slices/displayItemsSlice";
import userData from "./slices/userDataSlice";
import allOrders from "./slices/allOrdersSlice";
import myOrders from "./slices/myOrdersSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    displayItems: displayItemsReducer,
    userData: userData,
    allOrders: allOrders,
    myOrders: myOrders,
  },
});
