import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90vw',
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  outline: "none",
  p: 4,
};

export default function AuthModel({ open, handleClose }) {
  const location=useLocation()
  const navigate=useNavigate();
  const  auth  = useSelector(store => store.auth);
 

  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
  };

  useEffect(()=>{
    if(auth.user?.fullName){
      handleClose()
    }
  },[auth.user])
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col items-center pb-10">
            {" "}
            <h1 className="font-bold text-3xl">{location.pathname === "/signup" ? "Create your account":"Login"}</h1>
            <p className="italic text-xs text-gray-500">
              Your Story, Our Platform
            </p>
          </div>
         
            {location.pathname === "/signup" ? <RegisterForm /> : <LoginForm />}
            <div className="mt-6 align-bottom">
            

            <Button
              className="hover:text-black hover:font-bold mt-5 align-bottom"
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
                py: "10px",
                size: "large",
              }}
              fullWidth
              variant="outlined"
              onClick={handleNavigate}
            >
              {location.pathname === "/signup" ? "Login" : "Register"}
            </Button>
            <h1 className="font-semibold md:text-lg text-md text-gray-400 text-center">
              {location.pathname === "/signup"
                ? "Already have an account"
                : "If you don't have an account"}
            </h1>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
