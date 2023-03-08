import { createSlice } from "@reduxjs/toolkit";

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: { orders: [] },
  reducers: {
    setAllOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { setAllOrders, addOrder } = allOrdersSlice.actions;
export default allOrdersSlice.reducer;
