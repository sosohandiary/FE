import { configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./sampleSlice";
import currentUserInfoSlice from "./currentUserInfoSlice";
import curDiaryPageSlice from "./curDiaryPageSlice";

const rootReducer = { currentUserInfoSlice, curDiaryPageSlice };

const store = configureStore({ reducer: rootReducer });

export default store;
