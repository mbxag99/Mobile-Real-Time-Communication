import { FETCH_ROOM_USERS } from "../constants";

export default (state = { roomParticipants: [] }, action) => {
  switch (action.type) {
    case FETCH_ROOM_USERS:
      return { ...state, roomParticipants: action.payload };
    default:
      return state;
  }
};
