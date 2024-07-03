import { Grid } from "@mui/material";
import React from "react";
import LargeNav from "../navigation/LargeNav";
import HomeSection from "../middle/HomeSection";
import RightPart from "../right/RightPart";
import Profile from "../profile/Profile";
import { Route, Routes } from "react-router-dom";
import PostDetails from "../postDetails/PostDetails";
import BottomBar from "../navigation/BottomBar";
import TopNav from "../navigation/TopNav";
import { useSelector } from "react-redux";
import { store } from "../../store";
import SearchMobile from "../navigation/SearchMobile";
import SimpleReel from "../videoReel/SimpleReel";
import ReelsContainer from "../videoReel/ReelsContainer";


const HomePage = () => {
  const {auth,theme}=useSelector(store=>store);
  return (
    <>
      <div className="w-full h-auto border-t border-t-[#1d1d1d]">
        <TopNav />
      </div>
      <Grid container xs={12} className="px-1 lg:px-36 justify-between">
        <Grid item xs={0} lg={2.5} className=" hidden lg:block relative w-full">
          <LargeNav />
        </Grid>
        <div className="w-full h-auto p-2 border-t border-t-[#1d1d1d] fixed bottom-0 left-0 lg:hidden md:hidden sm:block block bg-black z-50">
          <BottomBar />
        </div>
        <Grid
          item
          xs={12}
          lg={6}
          className={`lg:px-9 lg:block relative w-full
          ${theme.currentTheme==="dark"?"border-gray-800":""} `}
        >
          <Routes>
            <Route path="/" element={<HomeSection />} />
            <Route path="/home" element={<HomeSection />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/search" element={<SearchMobile />} />
            <Route path="/reels" element={<ReelsContainer />} />
          </Routes>
        </Grid>
        <Grid item xs={0} lg={3} className=" hidden lg:block relative w-full">
          <RightPart />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
