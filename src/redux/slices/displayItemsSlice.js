import { createSlice } from "@reduxjs/toolkit";

const displayItemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});


export const { addItem } = displayItemsSlice.actions;
export default displayItemsSlice.reducer;
