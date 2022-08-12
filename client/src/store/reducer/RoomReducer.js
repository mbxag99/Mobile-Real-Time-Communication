import { FETCH_ALL_ROOMS } from "../constants";

export default (state = { Rooms: [], LoadingRooms: true }, action) => {
  switch (action.type) {
    case "START_ROOM_LOADING":
      return { ...state, LoadingRooms: true };
    case "END_ROOM_LOADING":
      return { ...state, LoadingRooms: false };
    case FETCH_ALL_ROOMS:
      return { ...state, Rooms: action.payload, LoadingRooms: false };
    default:
      return state;
  }
};
