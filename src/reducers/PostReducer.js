import {
  CLEAR_POSTS,
  FIND_POST_BY_ID_FAILURE,
  FIND_POST_BY_ID_REQUEST,
  FIND_POST_BY_ID_SUCCESS,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USER_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  POST_CREATE_FAILURE,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  REPLY_POST_FAILURE,
  REPLY_POST_REQUEST,
  REPLY_POST_SUCCESS,
  REPOST_FAILURE,
  REPOST_REQUEST,
  REPOST_SUCCESS,
  SET_POSTS_LOADED,
  USER_LIKES_POST_FAILURE,
  USER_LIKES_POST_REQUEST,
  USER_LIKES_POST_SUCCESS,
} from "../constants/postTypes";

const initialState = {
  loading: false,
  data: null,
  error: null,
  posts: [],
  post: null,
  postsLoaded: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
    case POST_DELETE_REQUEST:
    case USER_LIKES_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case REPLY_POST_REQUEST:
    case REPOST_REQUEST:
    case FIND_POST_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: [action.payload, ...state.posts],
      };
    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
        postsLoaded: true,
      };
    case SET_POSTS_LOADED:
      return {
        ...state,
        postsLoaded: true,
      };
    case GET_USER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        postById: action.payload,
      };

    case CLEAR_POSTS:
      return {
        ...state,
        postById: [],
      };
    case USER_LIKES_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        likedPosts: action.payload,
      };

    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.filter((post) => post.id != action.payload),
      };

    case FIND_POST_BY_ID_SUCCESS:
    case REPLY_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        post: action.payload,
      };

    case REPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        rePost: action.payload,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                liked: !post.liked,
                totalLikes: action.payload.liked
                  ? post.totalLikes + 1
                  : post.totalLikes - 1,
              }
            : post
        ),
      };
    case LIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case POST_CREATE_FAILURE:
    case POST_DELETE_FAILURE:
    case USER_LIKES_POST_FAILURE:
    case REPLY_POST_FAILURE:
    case REPOST_FAILURE:
    case FIND_POST_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
