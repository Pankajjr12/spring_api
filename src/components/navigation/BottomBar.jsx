import React, { useState } from "react";
import HomeLogo from "../../assets/navlogo/home.png";
import SearchLogo from "../../assets/navlogo/search.png";
import ReelsLogo from "../../assets/navlogo/reel.png";
import CreateLogo from "../../assets/navlogo/create.png";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import ReplyModal from "../middle/ReplyModal";
import CreatePostModal from "../middle/CreatePostModal";

const BottomBar = ({item}) => {
  const  auth  = useSelector(store => store.auth);
  
  

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const history = useNavigate()

  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    history("/create");
  };

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
    history("/");
  };
  const handleOpenSearch = () => {
    history('/search')
  }

  const handleOpenReels = () => {
    history('/reels')
  }


  const bottomBarItems = [
    {
      link: "/",
      icon: HomeLogo,
    },
    {
      link: "/search",
      icon: SearchLogo,
      onclick: handleOpenSearch,
    },
    {
      link: "/create",
      icon: CreateLogo,
      onClick: handleOpenCreatePostModal,
    },
    {
      link: "/reels",
      icon: ReelsLogo,
      onClick: handleOpenReels,
    },
  ];
  return (
    <div className="w-full ">
      <div className="w-full h-auto flex items-center justify-between p-3">
        {bottomBarItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center bg-transparent group"
            onClick={item.onClick}
          >
            <img
              src={item.icon}
              alt="home"
              className="w-6 h-6 object-contain group-hover:scale-95 ease-out duration-300"
            />
            <p className="text-base font-medium text-white lg:block md:hidden sm:hidden hidden">
              {item.name}
            </p>
          </Link>
        ))}
        <Link
          to={`/profile/${auth?.user?.id}`}
          className="flex items-center bg-transparent group"
        >
          <div className="rounded-full overflow-hidden border-teal-50 border-2">
            <img
              src={auth?.user?.image || "https://cdn3.iconfinder.com/data/icons/science-collection/383/scientist-512.png"}
              alt="pro icon"
              className="w-6 h-6 object-cover object-center group-hover:scale-95 ease-out duration-300"
            />
          </div>
        </Link>
      </div>
      <section>
        <CreatePostModal
          item={item}
          open={openCreatePostModal}
          handleClose={handleCloseCreatePostModal}
        />
      </section>
     
    </div>
  );
};

export default BottomBar;
