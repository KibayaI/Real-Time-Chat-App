import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiverData: undefined,
};

const receiverSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    setReceiver: (state, action) => {
      state.receiverData = action.payload;
    },
  },
});

export const { setReceiver } = receiverSlice.actions;
export default receiverSlice.reducer;
