import {
  MY_VIDEO_STREAM,
  MY_AUDIO_STREAM,
  JOIN_ROOM,
  ADD_VIDEO_STREAM,
  ADD_AUDIO_STREAM,
  ADD_REMOTE_VIDEO_STREAM,
  ADD_REMOTE_AUDIO_STREAM,
  AUDIO,
  VIDEO,
  START_LOADING,
  END_LOADING,
  REMOVE_VIDEO_STREAM,
  FLUSH,
} from "../constants";

const initalState = {
  myVideoStream: null,
  VideoStreams: [],
  RemoteVideoStreams: [],
  myAudioStream: null,
  AudioStreams: [],
  RemoteAudioStreams: [],
  Loading: true,
};
export default (
  state = {
    myVideoStream: null,
    VideoStreams: [],
    RemoteVideoStreams: [],
    myAudioStream: null,
    AudioStreams: [],
    RemoteAudioStreams: [],
    Loading: true,
  },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, Loading: true };
    case END_LOADING:
      return { ...state, Loading: false };
    case MY_VIDEO_STREAM:
      return { ...state, myVideoStream: action.payload, Loading: false };
    case ADD_VIDEO_STREAM:
      return {
        ...state,
        VideoStreams: [...state.VideoStreams, action.payload],
      };
    case ADD_REMOTE_VIDEO_STREAM:
      return {
        ...state,
        RemoteVideoStreams: [...state.RemoteVideoStreams, action.payload],
      };
    case REMOVE_VIDEO_STREAM:
      return {
        ...state,
        RemoteVideoStreams: state.RemoteVideoStreams.filter(
          (RVS) => RVS.userPeerID != action.payload.userPeerID
        ),
        VideoStreams: state.VideoStreams.filter(
          (VS) => VS.userPeerID != action.payload.userPeerID
        ),
      };
    case FLUSH:
      return { ...initalState };
    case MY_AUDIO_STREAM:
      return { ...state, myAudioStream: action.payload, Loading: false };
    case ADD_AUDIO_STREAM:
      return {
        ...state,
        AudioStreams: [...state.AudioStreams, action.payload],
      };
    case ADD_REMOTE_AUDIO_STREAM:
      return {
        ...state,
        RemoteAudioStreams: [...state.RemoteAudioStreams, action.payload],
      };

    default:
      return state;
  }
};
