import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import TempratureCard from "./Components/TempratureCard";
import { Suspense } from "react";
import { store } from "./redux/Stores/Store";
import { Provider } from "react-redux";
const themes = createTheme({
  typography: {
    fontFamily: "Tajawal",
  },
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense
          fallback={
            <img src={process.env.PUBLIC_URL + "/start.png"} alt="loading" />
          }
        >
          <ThemeProvider theme={themes}>
            <TempratureCard />
          </ThemeProvider>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
