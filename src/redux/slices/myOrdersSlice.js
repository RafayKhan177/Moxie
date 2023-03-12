import { createSlice } from "@reduxjs/toolkit";

const myOrdersSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addMyorderData: (state, action) => {
      state.push(action.payload);
    },
    clearMyorderData: (state, action) => {
      return [];
    },
  },
});

export const { addMyorderData } = myOrdersSlice.actions;
export const { clearMyorderData } = myOrdersSlice.actions;
export default myOrdersSlice.reducer;
