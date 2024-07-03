import * as React from "react";
import Box from "@mui/material/Box";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/SmartDisplay";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Backdrop, Button, IconButton } from "@mui/material";
import { createPost } from "../../actions/PostAction";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideoToCloud } from "../../utils/uploadVideoToCloud";
import { store } from "../../store";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: ".6rem",
};

export default function CreatePostModal({ open, handleClose, item }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    dispatch(createPost(values));
    handleClose();
    formik.resetForm(); 
    console.log("handle submit", values);
  };
  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: handleSubmit,
  });

  const [selectedImage, setSelectedImage] = React.useState();
  const [selectedVideo, setSelectedVideo] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imgUrl = await uploadVideoToCloud(event.target.files[0], "image");

    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setIsLoading(false);
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadVideoToCloud(event.target.files[0], "video");

    formik.setFieldValue("video", videoUrl);
    setSelectedVideo(videoUrl);
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    formik.resetForm(); // Reset formik values
    setSelectedImage(null); // Clear selected image
    setSelectedVideo(null); // Clear selected video
    handleClose(); 
    formik.resetForm();// Close the modal
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-3">
              <div className="flex space-x-3 items-center">
                <Avatar 
                onClick={() => navigate(`/profile/${5}`)}
                alt="username"
                src={auth?.user?.image}
                className="cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-black text-sm lg:text-lg">
                    {auth?.user?.fullName}
                  </span>
                  <p className="text-gray-400 text-xs lg:text-sm items-center">
                    @
                    {auth && auth?.user && auth?.user?.fullName
                      ? auth?.user?.fullName.split(" ")[0].toLowerCase()
                      : ""}
                    . 2m
                  </p>
                </div>
              </div>
              <textarea
                className="outline-none mt-4 p-2 w-full bg-transparent border border-stone-500"
                placeholder="Write anything..."
                name="caption"
                id=""
                onChange={formik.handleChange}
                value={formik.values.caption}
                {...formik.getFieldProps("content")}
                {...(formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                ))}
              ></textarea>
              <div className="flex space-x-3 items-center justify-start mt-4">
                <div>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    name="image"
                    className="hidden"
                    onChange={handleSelectImage}
                  />
                  <label htmlFor="image">
                    <IconButton color="primary" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>
                  <span>image</span>
                </div>
                <div>
                  <input
                    id="video"
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    name="video"
                    className="hidden"
                    onChange={handleSelectVideo}
                  />
                  <label htmlFor="video">
                    <IconButton component="span">
                      <FmdGoodIcon />
                    </IconButton>
                  </label>
                  <span>video</span>
                </div>
              </div>

              {selectedImage && (
                <div>
                  <img className="h-[10rem]" src={selectedImage} alt="" />
                </div>
              )}
               {selectedVideo && (
                <div>
                  <video className="h-[10rem]" src={selectedVideo} alt="" />
                </div>
              )}
              
              <div className="flex w-full justify-end">
                <Button
                  sx={{
                    width: "20%",
                    borderRadius: "16px",
                    paddingX: "12px",
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

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}
