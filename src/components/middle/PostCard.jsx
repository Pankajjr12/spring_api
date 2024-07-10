import React, { useEffect, useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreVertIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import BarChartIcon  from '@mui/icons-material/Notes';
import Fade from "@mui/material/Fade";
import ReplyModal from "./ReplyModal";
import { useDispatch, useSelector } from "react-redux";
import { createRePost, deletePost, likePost } from "../../actions/PostAction";
import VideoPlayer from "../videoReel/VideoPlayer";
import BottomSheet from "../comment/BottomSheet";

const PostCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const  auth  = useSelector(store => store.auth);
  const theme = useSelector(store => store.theme);



  const [activeVideoRef, setActiveVideoRef] = useState({ current: null });
  const [isLiked, setIsLiked] = useState(item?.liked);
  const [likes, setLikes] = useState(item?.totalLikes);
  const [isRetwit, setIsRetwit] = useState(
    item?.rePostUsersId?.includes(auth.user.id)
  );
  const [rePost, setRepost] = useState(item?.totalRePosts);

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const open = Boolean(anchorEl);



  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  const handleScroll = () => {
    // Detect if the user has scrolled down and close the bottom sheet
    if (bottomSheetOpen) {
      setBottomSheetOpen(false);
    }
  };

  // Attach scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsLiked(item?.liked);
    setLikes(item?.totalLikes);
    setIsRetwit(item?.rePostUsersId?.includes(auth.user.id));
    setRepost(item?.totalRePosts);
  }, [item,auth.user.id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post and its replies?")) {
      // Delete the post
      dispatch(deletePost(item?.id));
      handleClose();

      // Delete the replies
      if (Array.isArray(item?.totalReplies)) {
        item.totalReplies.forEach((replyId) => {
          dispatch(deletePost(replyId));
        });
      } else if (item?.totalReplies) {
        // If totalReplies is not an array, treat it as a single reply
        dispatch(deletePost(item.totalReplies));
      }

      // Delete the reposts
      if (Array.isArray(item?.totalRePosts)) {
        item.totalRePosts.forEach((repostId) => {
          dispatch(deletePost(repostId));
        });
      } else if (item?.totalRePosts) {
        dispatch(deletePost(item.totalRePosts));
      }
    }
  };

  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModel = () => setOpenReplyModal(false);

  
  const handleLikePost = (num) => {
    dispatch(likePost(item?.id));
    setIsLiked(!isLiked);
    setLikes(likes + num);
  };

  const handleCreateRetweet = () => {
    dispatch(createRePost(item?.id));
    setRepost(isRetwit ? rePost - 1 : rePost + 1);
    setIsRetwit(!isRetwit);
  };

  return (
    <React.Fragment>
      {auth?.user?.id && auth?.user?.id !== item?.user?.id && location.pathname === `/profile/${auth?.user?.id}` && (
        <div className="flex items-center font-semibold text-gray-700 py-2">
          <RepeatIcon />
          <p className="ml-3">You Retweet</p>
        </div>
      )}
      <div className="flex space-x-5 sm:space-x-3 mb-2">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          alt="username"
          src={item?.user?.image}
          className="cursor-pointer"
        />
        <div className="w-full ">
          <div className="flex justify-between items-center">
            <div className="flex flex-col lg:flex-row cursor-pointer items-baseline space-x-2">
              <div
                className="flex items-center space-x-1"
                onClick={() => navigate(`/profile/${item?.user?.id}`)}
              >
                <span className="font-semibold text-md lg:text-lg">
                  {item?.user?.fullName}
                </span>
                <VerifiedIcon className="text-[#1d9bf0]" />
              </div>
              <span
                style={{ fontSize: "0.65rem" }}
                className="font-semibold items-baseline"
              >
                @{item?.user?.fullName?.split(" ")[0].toLowerCase()}. 2m
              </span>
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
                {item?.user?.id === auth?.user?.id && (
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                )}
                <MenuItem onClick={() => navigate(`/post/${item?.id}`)}>
                  Details
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div
              onClick={() => navigate(`/post/${item?.id}`)}
              className="cursor-pointer p-2"
            >
              <p className={`mb-2 bg-contain ${theme.currentTheme === "dark" ? "text-white" : "text-black"}`}>
                {item?.content}
              </p>
              {item?.image && (
                <img
                  className="border lg:w-[28rem] w-[21rem] h-auto border-gray-400 p-2 rounded-md"
                  src={item.image}
                  alt="no"
                />
              )}
              {item?.video && (
                <VideoPlayer
                  src={item?.video}
                  activeVideoRef={activeVideoRef}
                  setActiveVideoRef={setActiveVideoRef}
                />
              )}
            </div>

            <div className="py-5 flex flex-wrap justify-between items-center pe-1">
              <div
                className={`space-x-2 lg:space-x-3 flex items-center ${
                  item?.totalReplies && item?.totalReplies.length > 0
                    ? "text-pink-600"
                    : "text-gray-500"
                }`}
              >
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                {item?.totalReplies > 0 && <p>{item?.totalReplies}</p>}
              </div>
              <div
                className={`${
                  isRetwit ? "text-pink-600" : "text-gray-500"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleCreateRetweet}
                  className="cursor-pointer"
                />
                {rePost > 0 && <p>{rePost}</p>}
              </div>
              <div
                className={`${
                  isLiked ? "text-pink-600" : "text-gray-500"
                } space-x-3 flex items-center`}
              >
                {isLiked ? (
                  <ThumbUpAltIcon
                    onClick={() => handleLikePost(-1)}
                    className="cursor-pointer"
                  />
                ) : (
                  <ThumbUpOffAltIcon
                    onClick={() => handleLikePost(1)}
                    className="cursor-pointer"
                  />
                )}
                {likes > 0 && <p>{likes}</p>}
              </div>

              <div className="space-x-3 flex items-center text-gray-500">
                <BarChartIcon className="cursor-pointer"       onClick={openBottomSheet}/>
                {bottomSheetOpen && <BottomSheet isOpen={bottomSheetOpen} onClose={closeBottomSheet} />}
                <p>1</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-500">
                <CloudUploadIcon className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
     
        <ReplyModal
          item={item}
          open={openReplyModal}
          handleClose={handleCloseReplyModel}
        />
      </section>
     
    </React.Fragment>
  );
};

export default PostCard;

