import API from '../API/api';

const SETSTATUS = 'SETSTATUS';
const MSG_UPD = 'UPD-MSG';
const MSG_ADD = 'ADD-MSG';
const SETUSER = 'SETUSER';
const UPD_STATUS = 'UPD_STATUS';
const SEND_PHOTO = 'SEND_PHOTO';

let initState = {
  user: null,
  status: '',
  messages: [
    { key: 1, msg: 'Hey ho!' },
    { key: 2, msg: 'Whats up?' },
    { key: 3, msg: 'Heyyyy bitch!' },
    { key: 4, msg: 'Dont be  dick head!' },
    { key: 5, msg: 'You DICK HEAD!!!' },
  ],
  UpdateMessageState: ' WTF???',
};

const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case SETUSER: {
      return { ...state, user: action.user };
    }

    case UPD_STATUS: {
      return { ...state, status: action.status };
    }

    case SETSTATUS:
      return { ...state, status: action.status };

    case SEND_PHOTO:
      return { ...state, user: [{ ...state.user[0], photos: action.photo }] };

    case MSG_ADD: {
      let newState = {
        key: state.messages.length + 1,
        msg: action.msg,
      };
      return {
        ...state,
        messages: [...state.messages, newState],
      };
    }

    default:
      return state;
  }
};

export const heppandActionCreator = (msg) => ({ type: MSG_ADD, msg });
export const setUserProfileAC = (user) => ({ type: SETUSER, user: [user] });
export const updLocalStatus = (status) => ({ type: UPD_STATUS, status });
export const setStatus = (status, userId) => ({ type: SETSTATUS, status });
export const setUploadPhoto = (photo) => ({ type: SEND_PHOTO, photo });

export default ChatReducer;

export const setUser = (user) => {
  return async (dispatch) => {
    let response = await API.getStatusUserId(user);
    console.log(response);
    dispatch(setUserProfileAC(response.data));
  };
};
export const getStatus = (user) => {
  return async (dispatch) => {
    let response = await API.getStatus(user);

    dispatch(setStatus(response.data, user));
  };
};

export const updStatus = (status) => {
  return async (dispatch) => {
    await API.updStatus(status);
    dispatch(updLocalStatus(status));
  };
};

export const uploadPhoto = (photo) => {
  return async (dispatch) => {
    let response = await API.uploadPhoto(photo);
    dispatch(setUploadPhoto(response.data.data.photos));
  };
};
