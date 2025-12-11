import { Box, Button, Container, Divider, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import { useStore, useDispatch } from "react-redux";
import { Get } from "../redux/features/FetchData/FetchSlice";
moment.locale("ar");

export default function TempratureCard() {


  const cityData = useStore((state) => state.Weather.data);
  const setCityData = useDispatch();
  const { t, i18n } = useTranslation();

  function changeLanguageHandler() {
    if (i18n.language === "ar") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
    }
  }

  useEffect(() => {
    // Make a request for a user with a given ID
    if (cityData.isNotExist) {
      setCityData(Get());
    } else {

      setCityData(Get());
    }
  }, [i18n]);

  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);

  setTimeout(() => {
    return (
      <Container
        maxWidth="sm"
        sx={{
          color: "white",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
      >
        {/* Start Card */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Content Start */}
          <div
            style={{
              background: "rgb(28 52 91/36%)",
              borderRadius: "10px",
              padding: "10px",
              minWidth: "50vw",
              boxShadow: "0px 11px 1px rgpa(0,0,0,0.05)",
            }}
          >
            {/* start header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "3px",
              }}
            >
              <Typography variant="p" sx={{ fontSize: "40px" }}>
                {t("city")}
              </Typography>
              <Divider
                orientation="vertical"
                variant="fullWidth"
                sx={{
                  bgcolor: "white",
                  marginInline: "5px",
                  borderRadius: "1px",
                }}
                flexItem
              />
              <Typography variant="p" sx={{ fontSize: "30px" }}>
                {cityData.currentDate}
              </Typography>
            </div>
            {/* end Header  */}
            <Divider
              orientation="horizontal"
              variant="middle"
              sx={{ color: "white", bgcolor: "white", borderRadius: "1px" }}
              flexItem
            />

            {/* Start Content */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* start Details */}
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                {/* start Tempreture and Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Typography variant="p" sx={{ fontSize: "90px" }}>
                    {Math.floor(Number(cityData.temp) - 273.15)}
                  </Typography>
                  {/* <WbSunnyIcon sx={{ fontSize: "40px" }} /> */}

                  <img
                    src={`https://openweathermap.org/img/wn/${cityData.imgLink}@2x.png`}
                    alt="witherState"
                  />
                </div>
                {/* end Tempreture and Icon */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "10vh",
                  }}
                >
                  <Typography
                    variant="p"
                    fontSize={40}
                    sx={{ marginBottom: "20px" }}
                  >
                    {t(cityData.description)}
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="p" fontSize={20}>
                      {t("minTemp")} : {cityData.minmax.min}
                    </Typography>
                    <Divider
                      orientation="vertical"
                      variant="fullWidth"
                      sx={{
                        bgcolor: "white",
                        marginInline: "5px",
                        borderRadius: "15px",
                      }}
                      flexItem
                    />
                    <Typography variant="p" fontSize={20}>
                      {t("maxTemp")} : {cityData.minmax.max}
                    </Typography>
                  </Box>
                </div>
              </div>
              {/* end Details */}
              {/* start show image */}
              <div style={{ width: "50%", height: "100%" }}>
                <CloudIcon sx={{ fontSize: "200px" }} />
              </div>
              {/* end show image */}
            </div>
            {/* End Content */}
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", width: "100%" }}
          >
            <Button
              variant="text"
              sx={{
                color: "white",
                fontSize: "20px",
                padding: "5px",
                // width: "1px !important",
                //   border: "1px solid",
              }}
              onClick={changeLanguageHandler}
            >
              {t("language")}
            </Button>
          </div>
          {/* Content End */}
        </div>
        {/* End Card */}
      </Container>
    );
  }, 3000);
}
