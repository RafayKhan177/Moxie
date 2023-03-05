import { configureStore, createReducer } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import displayItemsReducer from "./slices/displayItemsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    displayItems: displayItemsReducer,
  },
});
