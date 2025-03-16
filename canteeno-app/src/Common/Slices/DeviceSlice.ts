import { createSlice } from "@reduxjs/toolkit";

export type deviceType = {
  isMobile: boolean;
};

const deviceStateInitial = {
  isMobile: false,
};

export const deviceSlice = createSlice({
  name: "device",
  initialState: {
    deviceStateInitial,
  },
  reducers: {
    setDeviceType: (state, action) => {
      state.deviceStateInitial = action.payload;
    },
  },
});

export const { setDeviceType } = deviceSlice.actions;

export default deviceSlice.reducer;
