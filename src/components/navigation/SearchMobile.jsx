import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, searchUser } from "../../actions/AuthAction.js";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAllPosts } from "../../actions/PostAction.js";
import { Avatar, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

const SearchMobile = () => {
  const auth = useSelector((store) => store.auth);
  const post = useSelector((store) => store.post);
  const theme = useSelector((store) => store.theme);
  const [search, setSearch] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchUser = (event) => {
    setSearch(event.target.value);
    dispatch(searchUser(event.target.value));
  };

  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingPost(true);
        await dispatch(getAllPosts());
        await dispatch(findUserById(auth?.user?.id));
        if (post.posts && post.posts.length > 0) {
          setShuffledPosts(shuffleArray([...post.posts]));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchData();
  }, [dispatch, auth?.user?.id]);

  return (
    <React.Fragment>
      <div className="px-2 sticky top">
        <div className="relative flex items-center mt-2">
          <div className="absolute top-0 left-0 pl-3 pt-3">
            {isInputFocused && (
              <ArrowBackIcon
                className="text-gray-500 cursor-pointer"
                onClick={() => setInputFocused(false)}
              />
            )}
            {!isInputFocused && <SearchIcon className="text-gray-500" />}
          </div>
          <input
            value={search}
            onChange={handleSearchUser}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            className={`py-3 rounded-full outline-none text-gray-500 w-full pl-12 transition-all ${
              theme.currentTheme === "dark"
                ? "bg-[#444444] text-white shadow-lg hover:shadow-xl dark:bg-[#2b2b2b]"
                : "bg-slate-300 text-black shadow-md hover:shadow-xl dark:bg-slate-300"
            }`}
            placeholder="Search..."
          />
          {search && (
            <div
              className={`overflow-y-scroll hideScrollbar absolute z-50 top-10 border-gray-700 max-h-max w-full rounded-md ${
                theme.currentTheme === "dark"
                  ? "bg-[#151515] p-5"
                  : "bg-[#f8f6f6] p-5"
              }`}
            >
              {auth?.searchResult?.map((item) => (
                <React.Fragment key={item.id}>
                  <div
                    onClick={() => navigateToProfile(item.id)}
                    className="flex items-center hover:bg-slate-200 p-3 cursor-pointer"
                  >
                    <Avatar alt={item?.fullName} src={item?.image} />
                    <div className="ml-2">
                      <p>{item.fullName}</p>
                      <p className="text-sm text-gray-400">
                        @{item?.fullName.split(" ").join("_").toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <Divider className="my-1 border-t border-gray-300" />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        {loadingPost ? (
          <div className="flex justify-center items-center h-screen">
            <svg
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              className="animate-spin"
            >
              <rect fill="none" height="256" width="256" />
              <line
                fill="none"
                stroke="#87CEEB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="128"
                x2="128"
                y1="32"
                y2="64"
              />
              <line
                fill="none"
                stroke="#87CEEB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="195.9"
                x2="173.3"
                y1="60.1"
                y2="82.7"
              />
              <line
                fill="none"
                stroke="#87CEEB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="224"
                x2="192"
                y1="128"
                y2="128"
              />
              <line
                fill="none"
                stroke="#87CEEB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="195.9"
                x2="173.3"
                y1="195.9"
                y2="173.3"
              />
              <line
                fill="none"
                stroke="#87CEEB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="128"
                x2="128"
                y1="224"
                y2="192"
              />
              <line
                fill="none"
                stroke="#87CEEB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="60.1"
                x2="82.7"
                y1="195.9"
                y2="173.3"
              />
              <line
                fill="none"
                stroke="#87CEEB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="32"
                x2="64"
                y1="128"
                y2="128"
              />
              <line
                fill="none"
                stroke="#87CEEB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="60.1"
                x2="82.7"
                y1="60.1"
                y2="82.7"
              />
            </svg>
          </div>
        ) : (
          shuffledPosts &&
          shuffledPosts.length > 0 &&
          !isInputFocused && (
            <div className="grid grid-cols-3 gap-1 mt-3 mb-2">
              {shuffledPosts.map((post, index) => (
                <div
                  key={index}
                  className="col-span-1 sm:col-span-2 md:col-span-1"
                >
                  {post.video && (
                    <LazyLoad height={200} once>
                      <video
                        autoPlay
                        loop
                        muted
                        className="w-full"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          backgroundColor: "transparent",
                          transition: "opacity 0.5s",
                        }}
                      >
                        <source src={post.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </LazyLoad>
                  )}
                  {post.image && (
                    <LazyLoad height={200} once>
                      <img
                        src={post.image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-40 object-cover"
                        style={{
                          backgroundColor: "transparent",
                          transition: "opacity 0.5s",
                        }}
                      />
                    </LazyLoad>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchMobile;
