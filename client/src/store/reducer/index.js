import { combineReducers } from "redux";
import MediaReducer from "./MediaReducer";
import ListenReducer from "./ListenReducer";
import RoomReducer from "./RoomReducer";
export const reducers = combineReducers({
  MediaReducer: MediaReducer,
  ListenReducer: ListenReducer,
  RoomReducer: RoomReducer,
});
