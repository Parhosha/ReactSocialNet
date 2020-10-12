import API from '../API/api';
import { InferActionsType, BaseThunkType } from './redux-store';
import { FormAction } from 'redux-form/lib/actions';

const SETSTATUS = 'SETSTATUS';
const MSG_UPD = 'UPD-MSG';
const MSG_ADD = 'ADD-MSG';
const SETUSER = 'SETUSER';
const UPD_STATUS = 'UPD_STATUS';
const SEND_PHOTO = 'SEND_PHOTO';
const EDIT_PROFILE = 'EDIT_PROFILE';

export type messagesInit = {
  key: number;
  msg: string;
};
export type contactsType = {
  facebook: string | null;
  github: string | null;
  instagram: string | null;
  mainLink: string | null;
  twitter: string | null;
  vk: string | null;
  website: string | null;
  youtube: string | null;
};
export type photosType = {
  large: string;
  small: string;
};
export type userType = {
  aboutMe: string;
  contacts: contactsType;
  fullName: string | null;
  lookingForAJob: boolean | null;
  lookingForAJobDescription: string | null;
  photos: photosType;
  userId: number | null;
};

let initState = {
  user: null as any,
  status: '' as string,
  messages: [
    { key: 1, msg: 'Hey ho!' },
    { key: 2, msg: 'Whats up?' },
    { key: 3, msg: 'Heyyyy bitch!' },
    { key: 4, msg: 'Dont be  dick head!' },
    { key: 5, msg: 'You DICK HEAD!!!' },
  ] as Array<messagesInit>,
  UpdateMessageState: ' WTF???' as string | null,
};

export type initStateType = typeof initState;

const ChatReducer = (state = initState, action: any): initStateType => {
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
      console.log(action.photo);
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

    case EDIT_PROFILE: {
      return { ...state, user: action.user };
    }

    default:
      return state;
  }
};
export const actions = {
  setUserProfileAC: (user: any) => ({ type: SETUSER, user: [user] }),
  updLocalStatus: (status: string) => ({ type: UPD_STATUS, status }),
  setStatus: (status: string) => ({ type: SETSTATUS, status }),
  setUploadPhoto: (photo: photosType) => ({ type: SEND_PHOTO, photo }),
  setEditProfile: (profileEdit: userType) => ({ type: EDIT_PROFILE, profileEdit }),
};
type actionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<actionsType | FormAction>;

export default ChatReducer;

export const heppandActionCreator = (msg: string) => ({ type: MSG_ADD, msg });
//?????????//

export const setUser = (user: any): ThunkType => {
  return async (dispatch, getState) => {
    let response = await API.getStatusUserId(user);
    dispatch(actions.setUserProfileAC(response.data));
  };
};
export const getStatus = (user: number): ThunkType => {
  return async (dispatch, getState) => {
    let response = await API.getStatus(user);

    dispatch(actions.setStatus(response.data));
  };
};

export const updStatus = (status: string): ThunkType => {
  return async (dispatch, getState) => {
    await API.updStatus(status);
    dispatch(actions.updLocalStatus(status));
  };
};

export const uploadPhoto = (photo: photosType): ThunkType => {
  return async (dispatch, getState) => {
    let response = await API.uploadPhoto(photo);
    dispatch(actions.setUploadPhoto(response.data.data.photos));
  };
};

export const profileEditAC = (profileEdit: userType, id: number): ThunkType => {
  return async (dispatch, getState) => {
    console.log(profileEdit);
    console.log('Up');
    let tmp = profileEdit;
    let response = await API.editProfile(profileEdit);
    let resp = await API.getStatusUserId(id);
    console.log(resp);
    dispatch(actions.setUserProfileAC(resp.data));
  };
};
