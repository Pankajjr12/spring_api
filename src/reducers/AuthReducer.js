import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROFILE_USER_FAILURE,
  GET_USER_PROFILE_USER_REQUEST,
  GET_USER_PROFILE_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  UPDATE_PROFILE_USER_SUCCESS,
} from "../constants/authTypes";
import { store } from "../store";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
  users: [],
  updateUser: false,
  searchResult: [],
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_PROFILE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case SEARCH_USER_REQUEST:
      return { ...state, searchResult: [], loading: true, error: null };

    case GET_USER_PROFILE_USER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    // case UPDATE_PROFILE_USER_SUCCESS:
    //   return { ...state, loading: false, error: null, user: action.payload,updateUser:true };

    case FIND_USER_BY_ID_SUCCESS:
    case UPDATE_PROFILE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: action.payload,
        error: null,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };

    case LOGOUT:
      return initialState;

    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case SEARCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    case LOGIN_USER_FAILURE:
    case REGISTER_USER_FAILURE:
    case GET_USER_PROFILE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
