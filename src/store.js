import {
  combineReducers,
  legacy_createStore,
  applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk'
import { authReducer } from './reducers/AuthReducer';
import { postReducer } from './reducers/PostReducer';
import { themeReducer}  from './reducers/ThemeReducer'
import {commentReducer} from './reducers/CommentReducer';

const rootReducers = combineReducers({
  auth:authReducer,
  post:postReducer,
  theme:themeReducer,
  comments: commentReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
