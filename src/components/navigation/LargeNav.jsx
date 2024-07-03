import React from "react";
import logo from "../../assets/logo/logo.png";
import { navigation } from "./navigationMenu";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreHoriz";
import Fade from "@mui/material/Fade";
import { store } from "../../store";
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/AuthAction";

const LargeNav = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };
  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-5">
          <img src={logo} className="w-28 h-auto" alt="logo" />
        </div>
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group"
            >
              {typeof item.icon === "string" ? (
                <img
                  src={item.icon}
                  alt="home"
                  className="w-5 h-5 object-contain group-hover:scale-95 ease-out duration-300"
                />
              ) : (
                item.icon
              )}
              <p className="text-base font-medium  lg:block md:hidden sm:hidden hidden">
                {item.title}
              </p>
            </Link>
          ))}
          {/* {profile section} */}
       
          <Link
            to={`/profile/${auth?.user?.id}`}
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group"
          >
            <div className="rounded-full overflow-hidden">
              <img
                src={auth?.user?.image || "https://cdn3.iconfinder.com/data/icons/science-collection/383/scientist-512.png"}
                alt="pro icon"
                className="w-6 h-6 object-cover object-center group-hover:scale-95 ease-out duration-300"
              />
            </div>
            <p className="text-base font-semibold  lg:block md:hidden sm:hidden hidden">
              Profile
            </p>
          </Link>
        </div>

        <div className="py-8">
          <Button
            sx={{
              width: "100%",
              borderRadius: "28px",
              py: "15px",
              bgcolor: "#1e88e5",
              color: "white",
            }}
            variant="contained"
          >
            POST
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar src={auth?.user?.image} alt="profile-pic" />
            <div className="flex flex-col">
              <p className="text-gray-600">{auth.user?.fullName}</p>
              {auth.user && (
                <p className="text-sm opacity-50">
                  @{auth.user.fullName.split(" ").join("_").toLowerCase()}
                </p>
              )}
            </div>
          </div>

          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon sx={{ color: "white" }} />
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default LargeNav;
