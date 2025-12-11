import { configureStore } from "@reduxjs/toolkit";
import WeatherReducer from "../features/FetchData/FetchSlice";
export const store = configureStore({
  reducer: {
    Weather: WeatherReducer,
  },
});
