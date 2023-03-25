import { createSlice } from "@reduxjs/toolkit";

const initialState = { curpage: 1 };

const curDiaryPageSlice = createSlice({
  name: "curDiaryPageSlice",
  initialState,
  reducers: {
    syncCurPage(state, action) {
      state.curpage = action.payload;
    },
  },
});

export const { syncCurPage } = curDiaryPageSlice.actions;
export default curDiaryPageSlice.reducer;
