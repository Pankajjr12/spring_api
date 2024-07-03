import { api } from "../config/api";
import * as actionTypes from '../constants/commentTypes'


export const fetchComments = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_COMMENTS_REQUEST });

    const { data } = await api.get('/api/posts/comments'); // Adjust endpoint as per your API
    console.log("fetch comments", data);

    dispatch({ type: actionTypes.FETCH_COMMENTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("catch error", error.response ? error.response.data : error.message);
    dispatch({ type: actionTypes.FETCH_COMMENTS_FAILURE, payload: error.response ? error.response.data : error.message });
  }
};

export const createComment = (postData) => async (dispatch) => {
  try {
    const { data } = await api.post('/api/posts/create', postData);
    console.log("create post", data);
    dispatch({ type: actionTypes.COMMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.error("catch error", error.response ? error.response.data : error.message);
    dispatch({ type: actionTypes.COMMENT_CREATE_FAILURE, payload: error.response ? error.response.data : error.message });
  }
};
  