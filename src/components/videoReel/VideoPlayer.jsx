import React, { useState, useRef, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Slider from "@mui/material/Slider";

const VideoPlayer = ({ src, activeVideoRef, setActiveVideoRef }) => {
  const videoRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState("auto");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent parent div onClick from triggering
    const videoElement = videoRef.current;
  
    if (videoElement.paused) {
      // Ensure only one video is playing at a time
      if (activeVideoRef.current && activeVideoRef.current !== videoElement) {
        activeVideoRef.current.pause();
      }
  
      // Play the video
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setActiveVideoRef(videoElement);
          })
          .catch((error) => {
            console.error('Failed to play the video:', error);
            setIsPlaying(false); // Ensure isPlaying state reflects the actual state
          });
      }
    } else {
      // Pause the video
      videoElement.pause();
      setIsPlaying(false);
    }
  };
  

  const updateProgress = () => {
    if (!isNaN(videoRef.current.currentTime) && isFinite(videoRef.current.duration)) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    }
  };
  const handleSliderChange = (event, newValue) => {
    if (videoRef.current && isFinite(videoRef.current.duration)) {
      const newTime = (newValue / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(newValue);
    }
  };
  
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current && videoRef.current.duration && videoRef.current.videoHeight) {
        const aspectRatio = videoRef.current.videoWidth / videoRef.current.videoHeight;
        const height = videoRef.current.offsetWidth / aspectRatio;
        setVideoHeight(`${height}px`);
        setDuration(videoRef.current.duration);
      }
    };
  
    const videoElement = videoRef.current;
  
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }
  
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
        videoElement.pause(); // Ensure video is paused and cleaned up
      }
    };
  }, [src]);
  

  useEffect(() => {
    const handleScrollPause = () => {
      const video = videoRef.current;
      if (video) {
        const videoTop = video.getBoundingClientRect().top;
        const videoBottom = video.getBoundingClientRect().bottom;
  
        // Pause the video if it's not fully visible in the viewport
        if (videoTop > window.innerHeight || videoBottom < 0) {
          video.pause();
          setIsPlaying(false);
        }
      }
    };
  
    const handleVideoEnd = () => {
      setIsPlaying(false);
    };
  
    const handleVideoScroll = () => {
      setIsPlaying(false);
    };
  
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnd);
      window.addEventListener("scroll", handleScrollPause);
      // videoRef.current.addEventListener("scroll", handleVideoScroll); // Remove this line
    }
  
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnd);
        window.removeEventListener("scroll", handleScrollPause);
        videoRef.current.pause(); // Ensure video is paused and cleaned up
      }
    };
  }, []);
  

  return (
    <div className="instagram-video-reel" onClick={(e) => { if (!isPlaying) togglePlay(e); }}>
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        onTimeUpdate={updateProgress}
        onClick={(e) => e.stopPropagation()} // Prevents video click from toggling play
        controls={false} // Hide default controls
        style={{ width: "100%", height: videoHeight, background: "black" }} // Ensures video takes up container space
      />
      {!isPlaying && (
        <div className="play-button">
          <PlayArrowIcon onClick={togglePlay} />
          <span style={{ marginLeft: '8px'}}>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
        </div>
      )}
      <div className="controls" style={{  bottom: 0, left: 0, right: 0, height: "3px",display: isPlaying ? "block" : "none" }}>
        {isPlaying ? (
          <PauseIcon onClick={togglePlay} />
        ) : (
          <PlayArrowIcon onClick={togglePlay} />
        )}
        <Slider
          value={progress}
          onChange={handleSliderChange}
          aria-labelledby="continuous-slider"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
