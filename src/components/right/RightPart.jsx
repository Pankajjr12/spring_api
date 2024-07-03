import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Avatar, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeTheme } from "../../actions/ThemeAction.js";
import { searchUser } from "../../actions/AuthAction.js";

const RightPart = () => {
  const { theme, auth } = useSelector((store) => store);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeTheme = () => {
    dispatch(changeTheme(theme.currentTheme === "dark" ? "light" : "dark"));
  };

  const handleSearchUser = (event) => {
    setSearch(event.target.value);
    dispatch(searchUser(event.target.value));
  };
  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };
  return (
    <div className="py-5 sticky top">
      <div className="relative flex items-center ">
        <input
          value={search}
          onChange={handleSearchUser}
          className={`py-3 rounded-full outline-none text-gray-500 w-full pl-12 ${
            theme.currentTheme === "dark" ? " bg-[#151515]" : "bg-slate-300"
          }`}
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>
        {search && (
          <div
            className={` overflow-y-scroll hideScrollbar absolute z-50 top-10  border-gray-700 h-[40vh] w-full rounded-md ${
              theme.currentTheme === "dark"
                ? " bg-[#151515] p-5 "
                : "bg-[#f8f6f6] p-5"
            }`}
          >
            {auth?.searchResult?.map((item) => (
              <div
                onClick={() => navigateToProfile(item.id)}
                className="flex items-center hover:bg-slate-200 p-3 cursor-pointer"
              >
                <Avatar alt={item?.fullName} src={item?.image} />
                <div className="ml-2">
                  <p>{item.fullName}</p>
                  <p className="text-sm text-gray-400">
                    @{item?.fullName.split(" ").join("_").toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Brightness4Icon
          className="ml-3 cursor-pointer"
          onClick={handleChangeTheme}
        />
      </div>
      <section className="my-5">
        <h1 className="text-xl font-bold">Get Verified</h1>
        <h1 className="font-bold my-2">Subscribe to unloack new features</h1>
        <Button
          variant="contained"
          sx={{ paddingX: "10px", paddingY: "10px", borderRadius: "20px" }}
        >
          Get Verified
        </Button>
      </section>
      <section className="mt-6 space-y-5 ">
        <h1 className="font-bold text-xl py-1">What's happening</h1>
        <div>
          <p className="text-sm">Cricket World Cup t20 2024 - Live</p>
          <p className="font-bold">India Vs Pakistan</p>
        </div>
        {[1, 2, 3].map((item) => (
          <div className="flex justify-between w-full">
            <div>
              <p className="text-sm">Movies - Trending</p>
              <p className="font-bold">#Marvels</p>
              <p>33.1k posts</p>
            </div>
            <MoreVertIcon />
          </div>
        ))}
      </section>
    </div>
  );
};

export default RightPart;
