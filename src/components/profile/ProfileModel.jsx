import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Avatar, Backdrop, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, updateUserProfile } from "../../actions/AuthAction";
import { uploadToCloud } from "../../utils/uploadToCloud";
import { store } from "../../store";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right:"50",
  transform: "translate(-50%, -50%)",
  width: 540,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 3,
  p:1,
  outline: "none",
  border: "none",
};

export default function ProfileModal({ open, handleClose }) {
  const [uploading,setUploading]=useState(false);
  const dispatch=useDispatch();
  const auth =useSelector(store=>store.auth);
 
 

  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    console.log("handle submit", values);
    handleClose()
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage:"",
      image:""
    },
    onSubmit: handleSubmit,
  });
 

  useEffect(()=>{

    formik.setValues({
      fullName: auth.user.fullName || "",
      website: auth.user.website || "",
      location: auth.user.location || "",
      bio: auth.user.bio || "",
      backgroundImage: auth.user.backgroundImage || "",
      image: auth.user.image || "",
    });

  },[auth.user])

  const handleImageChangeBg = async (event) => {
    setUploading(true);
    try {
      const { name } = event.target;
      const file = await uploadToCloud(event.target.files[0]);
      formik.setFieldValue(name, file);
      setUploading(false);
    } catch (error) {
      // Handle error
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (event) => {
    setUploading(true);
    try {
      const { name } = event.target;
      const file = await uploadToCloud(event.target.files[0]);
      formik.setFieldValue(name, file);
      setUploading(false);
    } catch (error) {
      // Handle error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: { xs: "90%", md: "50%" },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon />
                </IconButton>
                <p className="text-md">Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <React.Fragment>
                <div className="w-full">
                  <div className="relative">
                    <img
                      className="w-full h-[12rem] object-cover object-center"
                      src={
                        formik.values.backgroundImage ||
                        "https://image.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg"
                      }
                      alt=""
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                      onChange={handleImageChangeBg}
                      name="backgroundImage"
                    />
                  </div>
                </div>
                <div className="w-full transform -translate-y-20 ml-1 h-[6rem] ">
                  <div className="relative">
                    <Avatar
                      sx={{
                        width: "10rem", // Default size for larger screens
                        height: "10rem", // Default size for larger screens
                        "@media (max-width: 768px)": {
                          width: "8rem", // Adjust width for small screens
                          height: "8rem",
                          border: "4px solid white", // Adjust height for small screens
                        },
                      }}
                      src={
                        formik.values.image ||
                        "https://cdn3.iconfinder.com/data/icons/science-collection/383/scientist-512.png"
                      }
                    />
                    <input
                      className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </React.Fragment>
              <div className="space-y-3">
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                />
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
                <div className="my-3">
                  <p className="text-lg">Birth date</p>
                  <p className="text-xl">{auth?.user?.birthDate}</p>
                </div>
              </div>
            </div>
            <Backdrop open={uploading}/>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
