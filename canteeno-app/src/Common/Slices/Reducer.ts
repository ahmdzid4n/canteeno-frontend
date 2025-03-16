import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import deviceReducer from "./DeviceSlice";
// Import your individual reducers here
// import someReducer from './someSlice';

const rootReducer = combineReducers({
  user: userReducer,
  device: deviceReducer,
  // Add your reducers here
});

export default rootReducer;
