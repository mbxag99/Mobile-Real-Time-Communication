import { FETCH_ALL_ROOMS } from "../constants";

export default (state = { Rooms: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_ROOMS:
      return { ...state, Rooms: action.payload };
    default:
      return state;
  }
};
