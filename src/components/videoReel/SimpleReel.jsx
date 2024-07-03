import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likePost } from "../../actions/PostAction";
import "./video.css"; // Assuming you have a CSS file for styling

const SimpleReel = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(item?.liked);
  const [likes, setLikes] = useState(item?.totalLikes);
  const [videoHasWhiteBackground, setVideoHasWhiteBackground] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    setIsLiked(item?.liked);
    setLikes(item?.totalLikes);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play().catch((error) => {
            console.error("Failed to start playback:", error);
          });
          checkVideoBackground();
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.5 });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        observer.unobserve(videoRef.current);
      }
    };
  }, [item?.thumbnail]); // Adjust dependencies based on what triggers video changes

  const checkVideoBackground = () => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Ensure cross-origin is handled correctly
  
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);
      
      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
      // Check if image has predominantly white background
      const threshold = 100; // Adjust threshold as necessary
      let isWhiteBackground = true;
  
      for (let i = 0; i < imageData.length; i += 4) {
        const avg = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
        if (avg < threshold) {
          isWhiteBackground = false;
          break;
        }
      }
  
      setVideoHasWhiteBackground(isWhiteBackground);
    };
  
    img.onerror = function (error) {
      console.error("Error loading image:", error);
      // Handle error state if necessary
    };
  
    img.src = item?.thumbnail; // Replace with your video thumbnail URL
  };
  

  const handleLikePost = () => {
    const num = isLiked ? -1 : 1; // Toggle like
    dispatch(likePost(item?.id));
    setIsLiked(!isLiked);
    setLikes(likes + num);
  };

  return (
    <div className="reel-container">
      <div className="reel-wrapper">
        {/* Video player */}
        <div className="reel-video-container">
          {item.video && (
            <video
              ref={videoRef}
              className="reel-video"
              src={item?.video}
              type="video/mp4"
              autoPlay
            ></video>
          )}
        </div>

        {/* Right action navigation */}
        <div
          className={`reel-actions ${
            videoHasWhiteBackground ? "white-background" : ""
          }`}
        >
          <div className={`${isLiked ? "text-pink-600" : "text-gray-500"} space-x-3 flex items-center`}>
            <IconButton onClick={handleLikePost}>
              {isLiked ? (
                <ThumbUpAltIcon className="cursor-pointer" />
              ) : (
                <ThumbUpOffAltIcon className="cursor-pointer" />
              )}
            </IconButton>
          </div>
          <span className="action-text">{likes > 0 && <p>{likes}</p>}</span>
          <Avatar
            src={item?.user?.image}
            alt=""
            className="avatar mt-2 border-4 border-blue-950"
            onClick={() => navigate(`/profile/${item?.user?.id}`)}
          />
        </div>

        {/* User information */}
        <div className="reel-user">
          <div className="user-details">
            <div
              className="username"
              onClick={() => navigate(`/profile/${item?.user?.id}`)}
            >
              {item?.user?.fullName}
            </div>
            <button className="follow-button" onClick={() => navigate(`/profile/${item?.user?.id}`)}>
              Follow
            </button>

            <div className="music-details">
              <span className="music-title">codefrog_insta</span>
            </div>
            <p
              className={`desc-text line-clamp-2 reel-description ${
                videoHasWhiteBackground ? "white-background" : ""
              }`}
            >
              {item?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleReel;
