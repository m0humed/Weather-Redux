import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

moment.locale("ar");
// insider functions
function getTodayMinMaxTemperature(hourlyData) {
  if (!Array.isArray(hourlyData) || hourlyData.length === 0) {
    return { min: null, max: null };
  }

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Filter only hours that belong to today
  const todayTemps = hourlyData
    .filter((h) => h.temp !== undefined)
    .filter((h) => {
      const date = new Date(h.dt * 1000);
      return (
        date.getDate() === todayDate &&
        date.getMonth() === todayMonth &&
        date.getFullYear() === todayYear
      );
    })
    .map((h) => h.temp);

  if (todayTemps.length === 0) {
    return { min: null, max: null };
  }

  return {
    min: Math.floor(Math.min(...todayTemps) - 272.15),
    max: Math.floor(Math.max(...todayTemps) - 272.15),
  };
}

const initialState = {
  data: {
    temp: null,
    imgLink: "",
    description: "",
    currentDate: "",
    minmax: { min: "", max: "" },
    currentdt: "",
    offset: "",
    isNotExist: true,
  },
};

export const weatherData = createSlice({
  name: "weather",
  initialState,
  reducers: {
    Get: (currentState) => {
      axios
        .get(
          "https://api.openweathermap.org/data/3.0/onecall?lat=29.0729812&lon=31.0982562&exclude=alerts,daily,minutely&appid=5dc5b2ca4a231daa21b6e58368987ffd"
        )
        .then((response) => {
          currentState = {
            temp: response.data.current.temp,
            imgLink: response.data.current.weather[0].icon,
            description: response.data.current.weather[0].description,
            currentDate: moment(response.data.current.dt).format("YYYY-MM-DD"),
            minmax: getTodayMinMaxTemperature(response.data.hourly),
            currentdt: response.data.current.dt,
            offset: response.data.timezone_offset,
            isNotExist: false,
          };
          console.log(currentState)
        }).catch(
            console.log("Feld to fetch data")
        );
    },
  },
});

export const {Get} = weatherData.actions;

export default weatherData.reducer;