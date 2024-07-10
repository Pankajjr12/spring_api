import { Avatar, Backdrop, Button, CircularProgress } from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/SmartDisplay";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../../actions/PostAction";
import { uploadToCloud } from "../../utils/uploadToCloud";
import { findUserById, getUserProfile } from "../../actions/AuthAction";
import { useParams } from "react-router-dom";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { uploadVideoToCloud } from "../../utils/uploadVideoToCloud";
import EmojiPicker from "emoji-picker-react";
import VideoPlayer from "../videoReel/VideoPlayer";
import LazyLoad from "react-lazyload";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post is required ..."),
  image: Yup.mixed(),
  video: Yup.mixed(),
});

const HomeSection = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");

  const [openEmoji, setOpenEmoji] = useState(false);
  const handleOpenEmoji = () => setOpenEmoji(!openEmoji);
  const handleCloseEmoji = () => setOpenEmoji(false);

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const post = useSelector((store) => store.post);
  const theme = useSelector((store) => store.theme);
  const { id } = useParams();

  useEffect(() => {
    // Fetch all posts only if they are not already in the store

    dispatch(getAllPosts());

    dispatch(findUserById(auth?.user?.id)); // Fetch user details by ID
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [auth?.user?.id]);

  const handleSubmit = (value, actions) => {
    dispatch(createPost(value));
    actions.resetForm();
    setSelectedImage("");
    setSelectedVideo("");
    handleCloseEmoji();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      video: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    try {
      const imgUrl = await uploadToCloud(event.target.files[0]);
      formik.setFieldValue("image", imgUrl);
      setSelectedImage(imgUrl);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    try {
      const videoUrl = await uploadVideoToCloud(event.target.files[0], "video");
      formik.setFieldValue("video", videoUrl);
      setSelectedVideo(videoUrl);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiClick = (value) => {
    const { emoji } = value;
    formik.setFieldValue("content", formik.values.content + emoji);
  };

  return (
    <div>
      <div className="space-y-5">
        <section
          className={`${
            theme.currentTheme === "dark" ? " bg-[#2c2c2c]" : "bg-[#f8f6f6]"
          }  z-50 flex items-center sticky top-0 bg-opacity-80`}
        >
          <h1
            className={`py-5 px-2 text-xl font-bold opacity-80 ${
              theme.currentTheme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Home
          </h1>
        </section>
        {auth.user && (
          <section
            className={`pb-10 rounded-md mb-10 ${
              theme.currentTheme === "dark"
                ? " bg-[#151515] p-10 "
                : "bg-[#f8f6f6] p-10"
            }`}
          >
            <div className="flex space-x-3 lg:space-x-5" id="s">
              <Avatar alt="username" src={auth?.user?.image} />
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="content"
                      placeholder="type something..."
                      className={`border-none  outline-none text-xl bg-transparent  ${
                        theme.currentTheme === "dark"
                          ? "text-white"
                          : "text-black"
                      }`}
                      {...formik.getFieldProps("content")}
                    />
                    {formik.errors.content && formik.touched.content && (
                      <span className="text-red-500">
                        {formik.errors.content}
                      </span>
                    )}
                  </div>
                  {!isLoading && (
                    <div>
                      {selectedImage && (
                        <img
                          className="w-[28rem]"
                          src={selectedImage}
                          alt="Selected"
                        />
                      )}
                    </div>
                  )}

                  {!isLoading && (
                    <div>
                      {selectedVideo && (
                        <LazyLoad height={200} once>
                          <video autoPlay src={selectedVideo} muted/>
                        </LazyLoad>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center">
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imgfile"
                          accept="image/*"
                          className="hidden"
                          onChange={handleSelectImage}
                        />
                      </label>
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <VideocamIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="videofile"
                          accept="video/*"
                          className="hidden"
                          onChange={handleSelectVideo}
                        />
                      </label>
                      {/* <FmdGoodIcon className="text-[#1d9bf0]" /> */}

                      <div className="relative">
                        <EmojiEmotionsIcon
                          onClick={handleOpenEmoji}
                          className="text-[#1d9bf0] cursor-pointer"
                        />
                        {openEmoji && (
                          <div
                            className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50"
                            style={{ width: "max-content" }}
                          >
                            <div className="sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                              <EmojiPicker
                                theme={theme.currentTheme}
                                onEmojiClick={handleEmojiClick}
                                lazyLoadEmojis={true}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="pe-2">
                      <Button
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          paddingX: "15px",
                          paddingY: "8px",
                          bgcolor: "#1e88e5",
                          color: "white",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        POST
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}

        <section className="max-w-screen-sm">
          {post.postsLoaded &&
            post.posts?.map((item) => (
              <LazyLoad key={item._id} height={200} once>
                <PostCard item={item} />
              </LazyLoad>
            ))}
        </section>
        <section>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </section>
      </div>
    </div>
  );
};

export default HomeSection;
