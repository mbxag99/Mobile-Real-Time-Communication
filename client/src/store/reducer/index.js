import { combineReducers } from "redux";
import MediaReducer from "./MediaReducer";
import ListenReducer from "./ListenReducer";
export const reducers = combineReducers({
  MediaReducer: MediaReducer,
  ListenReducer: ListenReducer,
});
