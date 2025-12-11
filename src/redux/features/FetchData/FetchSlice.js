import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

function toArabicDateTime(unixTime, offsetInSeconds, t) {
  const date = new Date((unixTime + offsetInSeconds) * 1000);

  return date.toLocaleString(t("languagecode"), {
    weekday: "long", // day name
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
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

// First, create the thunk
export const FetchWeather = createAsyncThunk(
  "weather/GetWeatherData",
  async (t) => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/3.0/onecall?lat=29.0729812&lon=31.0982562&exclude=alerts,daily,minutely&appid=5dc5b2ca4a231daa21b6e58368987ffd"
    );
    return {
      temp: response.data.current.temp,
      imgLink: response.data.current.weather[0].icon,
      description: response.data.current.weather[0].description,
      currentDate: toArabicDateTime(
        response.data.current.dt,
        response.data.timezone_offset,
        t
      ),
      minmax: getTodayMinMaxTemperature(response.data.hourly),
      isNotExist: false,
    };
  }
);

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
  status: "idle",
  error: null,
  isLoading:true
};

export const weatherData = createSlice({
  name: "weather",
  initialState,
  reducers: {
    Get: (currentState, actions) => {
      currentState = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchWeather.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(FetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        // Add any fetched posts to the array
        console.log("hgghgkgjgjkkkkkkkkkkkkkkkkk", action.payload);
        state.data = action.payload;
      })
      .addCase(FetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export const { Get } = weatherData.actions;

export default weatherData.reducer;
