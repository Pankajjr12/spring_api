// reducers/commentReducer.js
import * as actionTypes from '../constants/commentTypes'

const initialState = {
    loading: false,
    error: null,
    comments: [],
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.COMMENT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: action.payload,
      };
    case actionTypes.COMMENT_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
