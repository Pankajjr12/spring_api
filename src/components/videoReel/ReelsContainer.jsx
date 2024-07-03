import React, { useEffect } from "react";
import SimpleReel from "./SimpleReel";
import { useDispatch, useSelector } from "react-redux";
import { findUserById } from "../../actions/AuthAction";
import { getAllPosts } from "../../actions/PostAction";
import LazyLoad from "react-lazyload";
import { Divider } from "@mui/material";
import "./video.css";

const ReelsContainer = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const post = useSelector((store) => store.post);

  useEffect(() => {
    // Fetch all posts only if they are not already in the store
    dispatch(getAllPosts());
    dispatch(findUserById(auth?.user?.id)); // Fetch user details by ID
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [auth?.user?.id]);

  return (
    <div className="reels-container">
      {post.postsLoaded &&
        post.posts
          .filter((item) => item.video) // Filter out posts with no video
          .map((item, index) => (
            <React.Fragment key={item._id}>
              {index !== 0 && (
                <Divider
                  style={{
                    background:
                      "linear-gradient(90deg, #0000ff, #4b0082, #9400d3, #0000ff, #4b0082, #9400d3)",
                    height: "4px",
                    animation: "rainbow 8s infinite",
                  }}
                />
              )}
              <LazyLoad key={item._id} height={200} once>
                <SimpleReel item={item} />
              </LazyLoad>
            </React.Fragment>
          ))}
    </div>
  );
};

export default ReelsContainer;
