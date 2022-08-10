import { FETCH_ROOM_LISTENERS } from "../constants";

export default (state = { RoomListeners: [] }, action) => {
  switch (action.type) {
    case FETCH_ROOM_LISTENERS:
      return { ...state, RoomListeners: action.payload };
    default:
      return state;
  }
};
