import { CHAT_NEW_MESSAGE, FLUSH_ROOM_CHAT } from "../constants";

const initialState = {
  RoomChat: [],
  ChatLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHAT_NEW_MESSAGE:
      return {
        ...state,
        RoomChat: [
          ...state.RoomChat,
          { user: action.payload.user, message: action.payload.message },
        ],
        ChatLoading: false,
      };
    case FLUSH_ROOM_CHAT:
      return { ...state, RoomChat: [], ChatLoading: false };

    default:
      return state;
  }
};
