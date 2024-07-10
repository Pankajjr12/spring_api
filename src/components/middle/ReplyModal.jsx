import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import VerifiedIcon from "@mui/icons-material/Verified";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Avatar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReplyPost } from "../../actions/PostAction";
import { findUserById } from "../../actions/AuthAction";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post text is required"),
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 380, // width for small screens
    sm: 440,
    md: 500, // width for screens larger than small
  },
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  outline: "none",
  marginRght: {
    xs: "0 10px", // margin for small screens
    sm: "0 10px", // margin for screens larger than small
  },
};

export default function ReplyModal({ open, handleClose, item,reply }) {
  const [uploading, setUploading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  const  auth  = useSelector(store => store.auth);
  const post  = useSelector(store => store.post);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await dispatch(findUserById(auth?.user?.id)); // Fetch user details by ID
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, auth?.user?.id]);



  const handleSubmit = (values, actions) => {
    console.log('Submitting form:', values);
    // Dispatch action to create reply post
    dispatch(createReplyPost(values));
    actions.resetForm(); // Reset form after submission
    setSelectedImage(""); // Clear any additional state related to the form
    handleClose(); // Close the modal or perform other UI actions
  };
  

  const formik = useFormik({
    initialValues: {
      content: reply?.user?.content,
      image: reply?.user?.image,
      postId: item?.id,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  

 



  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
  
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex lg:space-x-5 space-x-3">
            <Avatar
              onClick={() => navigate(`/profile/${5}`)}
              alt="username"
              src={item?.user?.image}
              className="cursor-pointer"
            />
            <div className="w-full ">
              <div className="flex justify-between items-center">
                <div className="flex flex-col lg:flex-row cursor-pointer items-baseline space-x-2">
                  <div className="flex items-center space-x-1">
                    {" "}
                    {/* Container for name and VerifiedIcon */}
                    <span className="font-semibold  text-sm lg:text-lg">
                      {item?.user?.fullName}
                    </span>
                    <VerifiedIcon className="text-[#1d9bf0]" />
                  </div>
                  <span className="text-gray-400 text-xs font-semibold items-baseline">
                    @
                    {item && item.user && item.user.fullName
                      ? item.user.fullName.split(" ")[0].toLowerCase()
                      : ""}
                    . 2m
                  </span>
                </div>
              </div>

              <div className="my-2 ml-1">
                <div
                  onClick={() => navigate(`/post/${3}`)}
                  className="cursor-pointer"
                >
                  <p className="mb-2 p-0 text-gray-300 text-sm lg:text-lg">
                    {item?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className={`pb-10`}>
            <div className="flex space-x-5">
              <Avatar alt="username" src={auth?.user?.image} />
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                       type="text"
                       name="content"
                       value={formik.values.content}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       placeholder="type something..."
                      className={`border-none  outline-none text-xl bg-transparent`}
                      {...formik.getFieldProps("content")}
                      {...(formik.errors.content && formik.touched.content && (
                        <span className="text-red-500">
                          {formik.errors.content}
                        </span>
                      ))}
                    />
                  </div>
                  {/* <div>
                <img src="" alt=""  />
              </div> */}
                  {!uploadingImage && selectedImage && (
                    <div>
                      <img className="w-[28rem]" src={selectedImage} alt="" />
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center">
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imgfile"
                          className="hidden"
                          onChange={handleSelectImage}
                        />
                      </label>

                      <EmojiEmotionsIcon className="text-[#1d9bf0]" />
                    </div>
                    <div>
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
        </Box>
      </Modal>
    </div>
  );
}
