import React from "react";
import Avatar from "@mui/material/Avatar";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/PostAction";

const ReplyCard = ({ reply }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const handleDelete = () => {
    // Example of deleting a reply
    if (window.confirm("Are you sure you want to delete this reply?")) {
      dispatch(deletePost(reply.id)); // Adjust action according to your logic
    }
  };

  return (
    <div className="flex space-x-5 sm:space-x-3 mb-2">
      <Avatar
        alt="username"
        src={auth.user.image}
        className="cursor-pointer"
      />
      <div className="w-full ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col lg:flex-row cursor-pointer items-baseline space-x-2">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-md lg:text-lg">
                {auth?.user.fullName}
              </span>
              <VerifiedIcon className="text-[#1d9bf0]" />
            </div>
            <span style={{ fontSize: "0.65rem" }} className="font-semibold">
              @{auth.user.fullName.split(" ")[0].toLowerCase()}. 2m
            </span>
          </div>
          {auth.user.id === reply.user.id && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="error"
              size="small"
              startIcon={<CloseIcon />}
            >
              Delete
            </Button>
          )}
        </div>

        <div className="mt-2">
          <p className="mb-2">{auth.user.content}</p>
          {reply.image && (
            <img
              className="border lg:w-[28rem] w-[21rem] h-auto border-gray-400 p-2 rounded-md"
              src={reply.image}
              alt="reply image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
