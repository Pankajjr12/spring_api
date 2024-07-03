import React, { useEffect } from "react";
import logo from "../../assets/logo/logo.png";
import { Link, useParams } from "react-router-dom";
import ChatIcon from "../../assets/navlogo/message.png";
import MoreVertIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserById, logout } from "../../actions/AuthAction";
import Fade from "@mui/material/Fade";
import { changeTheme } from "../../actions/ThemeAction.js";
import { Button, Menu, MenuItem } from "@mui/material";

const TopNav = ({item}) => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const { post,auth,theme  } = useSelector((store) => store);
  const [postCount, setPostCount] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(() => {
    if (post?.postById) {
      setPostCount(post.postById.length);
    }
  }, [post?.postById]);
  const handleLogout = () => {
    
    dispatch(logout());
    handleClose();
  };
  const handleTheme = () => {
   
    dispatch(deleteUserById(auth?.users?.id));
    handleClose();
  };
  const handleChangeTheme = () => {
    dispatch(changeTheme(theme.currentTheme === "dark" ? "light" : "dark"));
    handleClose();
  };
  return (
    <div className="w-full h-auto px-2 py-3  lg:hidden md:hidden bg-black sm:block block">
      <div className="w-full h-auto flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 h-auto object-contain" />
        </Link>

        <div className="flex items-center">
          <img src={ChatIcon} alt="logo" className="w-7 h-7" />
          <div className="absolute right-13 top-1 bg-red-600 text-sm text-white rounded-full w-5 h-5 flex items-center justify-center">
          {postCount}
          </div>
          <div>
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
              <MenuItem onClick={handleChangeTheme}>Theme</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
