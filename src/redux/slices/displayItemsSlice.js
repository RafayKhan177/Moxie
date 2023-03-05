import { createSlice } from "@reduxjs/toolkit";

const displayItemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addDisplayItem: (state, action) => {
      state.push(action.payload); // push individual item object
    },
  },
});

export const { addDisplayItem } = displayItemsSlice.actions;
export default displayItemsSlice.reducer;
