import API from '../API/api';
import { stopSubmit } from 'redux-form';

const SETME = 'SETME';
const UNSETME = 'UNSETME';

let initReducer = {
  id: null,
  name: null,
  login: null,
  auth: false, //1
};

const AuthReducer = (state = initReducer, action) => {
  switch (action.type) {
    case SETME:
      console.log(action.data);

      return {
        ...state,
        ...action.data,
        auth: 1,
      };
    case UNSETME:
      return {
        ...state,
        ...action.data,
        auth: 0,
      };

    default:
      return state;
  }
};

export default AuthReducer;

export const setMe = (data) => ({ type: SETME, data });
export const UnSetMe = (data) => ({ type: UNSETME, data });

export const getUser = () => {
  return async (dispatch) => {
    let response = await API.Me();

    if (response.resultCode === 0) {
      dispatch(setMe(response.data));
    }
  };
};

export const LoginAC = (email, password, rememberMe) => async (dispatch) => {
  let response = await API.logIn(email, password, rememberMe);

  if (response.resultCode === 0) {
    dispatch(getUser());
  } else {
    dispatch(stopSubmit('login', { _error: response.messages }));
  }
};

export const Logout = () => async (dispatch) => {
  let response = await API.logOut();

  dispatch(UnSetMe(null));
};
