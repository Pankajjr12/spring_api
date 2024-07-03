import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Authentication from "./components/authentication/Authentication";
import HomePage from "./components/home/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { useEffect, useState } from "react";
import { getUserProfile } from "./actions/AuthAction";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import darkTheme from './theme/DarkTheme'
import lightTheme from './theme/LightTheme'
import { Box, CssBaseline } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [currentTheme, setCurrentTheme] = useState("");
  const { theme } = useSelector((store) => store);
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [auth.jwt, jwt]);

  useEffect(() => {
    setCurrentTheme(localStorage.getItem("theme"));
  }, [theme.currentTheme]);
 

  return (
    <ThemeProvider
      theme={currentTheme === "dark" ? darkTheme  : lightTheme}
      className=""
    >
      <CssBaseline />
      <Box sx={{}}>
        <Routes>
          <Route
            path="/*"
            element={
              auth.user || isGuest ? (
                <HomePage />
              ) : (
                <Authentication setIsGuest={setIsGuest} />
              )
            }
          />
          <Route path="/signin" element={<Authentication />}></Route>
          <Route path="/signup" element={<Authentication />}></Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
