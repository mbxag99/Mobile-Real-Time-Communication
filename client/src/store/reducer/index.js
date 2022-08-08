import { combineReducers } from "redux";
import VideoReducer from "./VideoReducer";
import RoomReducer from "./RoomReducer";
export const reducers = combineReducers({
  VideoReducer: VideoReducer,
  RoomReducer: RoomReducer,
});
