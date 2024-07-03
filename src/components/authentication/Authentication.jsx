import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import AuthModel from "./AuthModel";
import {  useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Authentication = ({ setIsGuest }) => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  
  const theme = useSelector(store => store.theme);

  const location = useLocation();
  const navigate = useNavigate();
  const handleOpenAuthModel = (path) => {
    setOpenAuthModel(true);
    navigate(path);
  };
  const handleCloseAuthModel = () => {
    setOpenAuthModel(false);
    navigate("/");
  };

  const [isHovered, setIsHovered] = useState(false);

  // const boxShadowColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const borderColor = theme === 'light' ? 'black' : 'white';
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setOpenAuthModel(true);
    }
  }, [location.pathname]);
  const handleGuestLogin = () => {
    setIsGuest(true);
  };
  return (
    <div className="">
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7.5}>
          <img
            className="w-full h-screen rounded-md contain-size"
            alt="poster"
            src="https://wallup.net/wp-content/uploads/2019/09/611751-social-media-computer-internet-typography-text-poster.jpg"
          />
          <div className=""></div>
        </Grid>
        <Grid className="px-4 sm:px-10" lg={4.5} sm={12}>
          <div className="flex flex-col items-start">
            <h1 className="font-bold text-5xl mt-10">Unlock Your World</h1>
            <h1 className="font-bold text-gray-500 text-2xl py-4 md:py-16">
              Join our{" "}
              <span
                className={`italic ${
                  theme.currentTheme === "dark"
                    ? "text-white "
                    : "text-black"
                }`}
              >
                social{" "}
              </span>
              verse!
            </h1>
          </div>

          <div
            className={`md:w-[60%] mt-16 md:mt-5 p-4 rounded-2xl ${
              theme.currentTheme === "dark" ? "bg-gray-900" : "bg-gray-200"
            }  md:bg-transparent align-middle`}
          >
            <div className="w-full space-y-8 flex flex-col items-center justify-center">
              <div
                style={{
                  width: "280px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: isHovered ? `0 4px 12px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.3) border-black'}` : 'none',
                  transition: 'box-shadow 0.3s ease',
                  border: `1px solid ${borderColor}`,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <GoogleLogin
                  style={{ width: "40%" }}
                  // Add any other props here
                />
              </div>

              <p className="text-center">OR</p>
              <Button
                onClick={() => handleOpenAuthModel("/signup")}
                style={{}}
                sx={{
                  width: "280px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  py: "10px",
                  bgcolor: "#1e88e5",
                  color: "white",
                }}
                fullWidth
                variant="contained"
              >
                Create Account
              </Button>
              <p
                className="hover:text-blue-600 cursor-pointer font-semibold"
                onClick={handleGuestLogin}
              >
                Continue as a guest user
              </p>
              <p className="text-center">
                "By logging in, you agree to our Privacy Policy and Terms of
                Service."
              </p>

              <Button
                onClick={() => handleOpenAuthModel("/signin")}
                className="font-bold text-xl mb-5"
                sx={{
                  width: "280px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  py: "10px",
                }}
                fullWidth
                variant="outlined"
              >
                Login
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModel open={openAuthModel} handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Authentication;
