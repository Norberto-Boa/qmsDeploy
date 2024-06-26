import { combineReducers } from "redux";
import { AuthReducer } from './AuthReducer';
import LayoutReducer from './LayoutReducer';
import LoaderReducer from './LoaderReducer';
import localeReducer from "./localeReducer";

const rootReducer = combineReducers({
  AuthReducer,
  LayoutReducer,
  LoaderReducer,
  localeReducer
});

export default rootReducer;