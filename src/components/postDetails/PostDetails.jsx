import React, { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../middle/PostCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findPostsById } from "../../actions/PostAction";
import { store } from "../../store";

const PostDetails = () => {
  const {id}= useParams();
  const dispatch = useDispatch();
  const { post, theme } = useSelector((store) => store);
  
  const navigate = useNavigate();
  const  auth  = useSelector(store => store.auth);

  useEffect(() => {
    dispatch(findPostsById(id));
  }, [dispatch, id]);
  const handleBack = () => navigate(-1);
  return (
    <>
      <section
        className={`${
          theme.currentTheme === "dark" ? " bg-[#2c2c2c]" : "bg-[#f8f6f6]"
        }  z-50 flex items-center sticky top-0 bg-opacity-80`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-80 ml-6">Post</h1>
      </section>

      <section>
       {post?.post && <PostCard item={post?.post} />}
        <Divider sx={{ margin: "2rem 0rem", color: "gray" }} />
      </section>

      <section>
        {auth.findUser && post?.post?.replyPosts
          .slice()
          .reverse()
          .map((item) => (
            <PostCard item={item} />
          ))}
      </section>
    </>
  );
};

export default PostDetails;
