import { configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./sampleSlice";

const rootReducer = { sampleSlice };

const store = configureStore({ reducer: rootReducer });

export default store;
