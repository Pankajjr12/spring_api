import { api } from "../config/api";
import {
  CLEAR_POSTS,
  FIND_POST_BY_ID_FAILURE,
  FIND_POST_BY_ID_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_SUCCESS,
  GET_USER_POST_FAILURE,
  GET_USER_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  POST_CREATE_FAILURE,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_SUCCESS,
  REPLY_POST_FAILURE,
  REPLY_POST_SUCCESS,
  REPOST_FAILURE,
  REPOST_SUCCESS,
  SET_POSTS_LOADED,
  USER_LIKES_POST_FAILURE,
  USER_LIKES_POST_SUCCESS,
} from "../constants/postTypes";

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.post('/api/posts/create', postData);
    console.log("create post", data);
    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.error("catch error", error.response ? error.response.data : error.message);
    dispatch({ type: POST_CREATE_FAILURE, payload: error.response ? error.response.data : error.message });
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.get("/api/posts/");
    console.log("Get All Posts", data);
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error", error);
    dispatch({ type: GET_ALL_POST_FAILURE, payload: error.message });
  }
};

export const setPostsLoaded = () => ({
  type: SET_POSTS_LOADED,
});

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS,
  };
};

export const getUserPosts = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    console.log("Get User Posts", data);
    dispatch({ type: GET_USER_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error", error);
    dispatch({ type: GET_USER_POST_FAILURE, payload: error.message });
  }
};

export const findPostsByLikesContainedUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}/likes`);
    console.log("Get Posts like by user", data);
    dispatch({ type: USER_LIKES_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error", error);
    dispatch({ type: USER_LIKES_POST_FAILURE, payload: error.message });
  }
};

export const findPostsById = (postId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/${postId}`);
    console.log("Get post by id", data);
    dispatch({ type: FIND_POST_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error", error);
    dispatch({ type: FIND_POST_BY_ID_FAILURE, payload: error.message });
  }
};

export const createReplyPost = (postData) => async (dispatch) => {
    try {
      const { data } = await api.post(`/api/posts/reply`, postData);
      console.log("reply post cretated", data);
      dispatch({ type: REPLY_POST_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: REPLY_POST_FAILURE, payload: error.message });
    }
  };

  export const createRePost = (postId) => async (dispatch) => {
    try {
      const { data } = await api.put(`/api/posts/${postId}/repost`);
      console.log("re Post cretated", data);
      dispatch({ type: REPOST_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: REPOST_FAILURE, payload: error.message });
    }
  };

  export const likePost = (postId) => async (dispatch) => {
    try {
      const { data } = await api.post(`/api/${postId}/like`, {});
      console.log("like post", data);
      dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: LIKE_POST_FAILURE, payload: error.message });
    }
  };

  export const deletePost = (postId) => async (dispatch) => {
    try {
      const { data } = await api.delete(`/api/posts/${postId}`);
      console.log("post deleted", data);
      dispatch({ type: POST_DELETE_SUCCESS, payload: postId });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: POST_DELETE_FAILURE, payload: error.message });
    }
  };
