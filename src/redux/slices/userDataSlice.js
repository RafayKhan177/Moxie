import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: [],
  reducers: {
    updateUser: (state, action) => {
      state.push(action.payload);
      // return [action.payload];
    },
    removeUserData: (state, action) => {
      return [];
    },
  },
});

export const {
  actions: { updateUser, removeUserData },
} = userDataSlice;

// export const { updateUser } = userDataSlice.actions;
// export const { removeUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
