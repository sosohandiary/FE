import { createSlice } from "@reduxjs/toolkit";

const initialState = { userName: "", userNickname: "" };

const currentUserInfoSlice = createSlice({
  name: "setCurrentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      const newState = Object.assign({}, state, action.payload);
      return newState;
    },
  },
});

export const { setCurrentUser } = currentUserInfoSlice.actions;
export default currentUserInfoSlice.reducer;
