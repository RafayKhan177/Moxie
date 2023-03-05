import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    clearItems: (state, action) => {
      return [];
    },
  },
});

export const { addItem } = cartSlice.actions;
export const { clearItems } = cartSlice.actions;
export default cartSlice.reducer;
