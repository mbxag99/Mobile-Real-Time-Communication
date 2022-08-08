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
} from "../constants";
export default (
  state = {
    myVideoStream: null,
    VideoStreams: [],
    RemoteVideoStreams: [],
    myAudioStream: null,
    AudioStreams: [],
    RemoteAudioStreams: [],
  },
  action
) => {
  switch (action.type) {
    case MY_VIDEO_STREAM:
      return { ...state, myVideoStream: action.payload };
    case ADD_VIDEO_STREAM:
      return { ...state, VideoStreams: [...VideoStreams, action.payload] };
    case ADD_REMOTE_VIDEO_STREAM:
      return {
        ...state,
        RemoteVideoStreams: [...RemoteVideoStreams, action.payload],
      };
    case MY_AUDIO_STREAM:
      return { ...state, myAudioStream: action.payload };
    case ADD_AUDIO_STREAM:
      return { ...state, AudioStreams: [...AudioStreams, action.payload] };
    case ADD_REMOTE_AUDIO_STREAM:
      return {
        ...state,
        RemoteAudioStreams: [...RemoteAudioStreams, action.payload],
      };

    default:
      return state;
  }
};
