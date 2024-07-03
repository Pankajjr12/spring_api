import React, { useEffect, useRef, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import VerifiedIcon from "@mui/icons-material/Verified";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import RadioIcon from "@mui/icons-material/Radio";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { TabList } from "@mui/lab";
import PostCard from "../middle/PostCard";
import ProfileModal from "./ProfileModel";
import { useDispatch, useSelector } from "react-redux";
import LinkIcon from "@mui/icons-material/Link";
import { findUserById, followUserAction } from "../../actions/AuthAction";
import { findPostsByLikesContainedUser, getUserPosts } from "../../actions/PostAction";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const auth = useSelector((store) => store.auth);
  const theme  = useSelector((store) => store.theme);
  const post = useSelector((store) => store.post);
  const [value, setValue] = useState("1");

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);

  const prevScrollY = useRef(0);
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "3") {
      dispatch(findPostsByLikesContainedUser(id));
    } else if (newValue === "1") {
      dispatch(getUserPosts(id));
    }
  };
  const handleBack = () => navigate(-1);

  useEffect(() => {
    if (auth.user && auth.user.id) {
      dispatch(findUserById(id, auth.user.id));
      dispatch(getUserPosts(id));
    }
  }, [id, dispatch, auth.user.id]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current) {
        setShowProfilePicture(true);
      } else {
        setShowProfilePicture(false);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFollowUser = () => {
    dispatch(followUserAction(id));
  };

  const isProfileOwner = auth.user.id === parseInt(id);


  return (
    <div className="">
      <section className={` ${theme.currentTheme === "dark" ? " bg-[#2c2c2c]" : "bg-[#f8f6f6]"} z-50 flex items-center w-full sticky top-0 bg-opacity-80`}>
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        {showProfilePicture && <Avatar className="mx-3 w-7 h-7" src={auth?.findUser?.image} />}
        <h1 className="lg:py-5 py-3 text-xl font-bold opacity-80 ml-5">
          {auth?.findUser?.fullName}
        </h1>
      </section>

      <section>
        <img
          src={auth?.findUser?.backgroundImage || "https://image.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg"}
          className="w-[100%] lg:h-[15rem] h-[10rem] object-cover rounded-t-xl"
        />
      </section>
      <section>
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform left-2 md:left-0 -translate-y-24 border-2 border-black"
            alt="img"
            src={auth?.findUser?.image}
            sx={{
              width: "10rem",
              height: "10rem",
              "@media (max-width: 768px)": {
                width: "8rem",
                height: "8rem",
              },
            }}
          />
          {isProfileOwner ? (
            <Button
              onClick={handleOpenProfileModel}
              className="rounded-full right-2"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {auth.findUser?.followers?.includes(auth.user.id) ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div className="px-3">
          <div>
            <div className="flex items-center">
              <h1 className="font-bold">{auth?.findUser?.fullName}</h1>
              {true && <VerifiedIcon className="text-[#1d9bf0]" />}
            </div>
            <div className="rounded-2xl px-2 py-1 mt-1 -ml-2 w-min bg-slate-500">
              <h1 className="">
                @{auth?.findUser?.fullName.split(" ").join("_").toLowerCase()}
              </h1>
            </div>
          </div>
          <div className="mt-2 space-y-3">
            <p>{auth?.findUser?.bio}</p>
            <div className="py-1 flex space-x-5">
              <div className="flex items-center text-gray-500">
                <FmdGoodIcon />
                <p className="ml-1">{auth?.findUser?.location}</p>
              </div>
              <div className="flex items-center text-gray-500">
                <CalendarMonthIcon />
                <p className="ml-1">Joined 20 Jan</p>
              </div>
            </div>
            <div className="py-1 flex space-x-5">
              <LinkIcon />
              <Link to="#">{auth?.findUser?.website}</Link>
            </div>
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <span>{auth?.findUser?.followings?.length}</span>
                <span className="ml-1">Followings</span>
              </div>
              <div className="flex items-center">
                <span>{auth?.findUser?.followers?.length}</span>
                <span className="ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 mx-auto items-center flex flex-col justify-center max-w-screen-md">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="icon tabs example">
              <Tab icon={<LocalPostOfficeIcon />} aria-label="posts" value="1" label="POSTS" />
              <Tab icon={<RadioIcon />} aria-label="media" label="MEDIA" value="2" />
              <Tab icon={<ThumbUpAltIcon />} aria-label="likes" value="3" label="LIKES" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {isProfileOwner || auth.findUser?.followers?.includes(auth.user.id) ? (
              post?.postById?.map((item) => <PostCard key={item.id} item={item} />)
            ) : (
              <p>Follow to see other users' posts.</p>
            )}
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel  value="3">  {post.likedPosts?.map((item) => (
                <PostCard item={item} />
              ))}</TabPanel>
        
        </TabContext>
      </section>

      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModal} />
      </section>
    </div>
  );
};

export default Profile;
