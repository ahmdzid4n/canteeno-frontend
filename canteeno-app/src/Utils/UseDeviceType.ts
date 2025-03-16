import { setDeviceType } from "../Common/Slices/DeviceSlice";
import store from "../Common/Slices/Store";

export const UseDeviceType = () => {
  const isMobile = window.innerWidth <= 768;
  store.dispatch(setDeviceType({ isMobile }));
};
