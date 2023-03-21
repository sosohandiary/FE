import { configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./sampleSlice";
import currentUserInfoSlice from "./currentUserInfoSlice";

const rootReducer = { currentUserInfoSlice };

const store = configureStore({ reducer: rootReducer });

export default store;
