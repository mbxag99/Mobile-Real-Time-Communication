import { combineReducers } from "redux";
import MediaReducer from "./MediaReducer";
import RoomReducer from "./RoomReducer";
export const reducers = combineReducers({
  MediaReducer: MediaReducer,
  RoomReducer: RoomReducer,
});
