import { CHANGE_THEME } from "../constants/themeTypes";

const initialState = {
  currentTheme: localStorage.getItem("theme") || "light",
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        currentTheme: action.payload,
      };
    default:
      return state;
  }
};
