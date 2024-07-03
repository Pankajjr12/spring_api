import axios from "axios";
import { API_BASE_URL, api } from "../config/api";
import {
  GET_USER_PROFILE_USER_SUCCESS,
  GET_USER_PROFILE_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  FIND_USER_BY_ID_FAILURE,
  FIND_USER_BY_ID_SUCCESS,
  UPDATE_PROFILE_USER_SUCCESS,
  UPDATE_PROFILE_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from "../constants/authTypes";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("login user", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    console.log("register user", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USER_PROFILE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USER_PROFILE_USER_FAILURE, payload: error.message });
  }
};

export const findUserById = (userId, loggedInUserId) => async (dispatch) => {
  try {
    // Ensure loggedInUserId is a string
    loggedInUserId = String(loggedInUserId);
    const { data } = await api.get(`/api/users/${userId}`);

    // Add reqUser property based on the comparison
    data.reqUser = data.id === loggedInUserId;

    dispatch({ type: 'FIND_USER_BY_ID_SUCCESS', payload: data });
  } catch (error) {
    console.error("Error fetching user by ID:", error); // Log detailed error
    dispatch({ type: 'FIND_USER_BY_ID_FAILURE', payload: error.message });
  }
};


export const updateUserProfile = (reqdata) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`,reqdata)
    console.log("updated user",data)
    dispatch({ type: UPDATE_PROFILE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: UPDATE_PROFILE_USER_FAILURE, payload: error.message });
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`)
    console.log("follow user",data)
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};

export const deleteUserById = (userId) => async (dispatch) => {

  try {
      await axios.delete(`/api/users/${userId}`);
      dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/users');
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.response ? error.response.data : error.message });
  }
};

export const searchUser = (query) => async (dispatch) => {
  try {
    const response = await api.get(`/api/users/search?query=${query}`);
    const users = response.data;
    console.log("search result -: ", users);
   
    dispatch({type:SEARCH_USER_SUCCESS,payload:users});
  } catch (error) {
    dispatch(
      {type:SEARCH_USER_FAILURE,error:error.message}
    );
  }
};