import { InferActionsType, BaseThunkType } from './redux-store';
import { stopSubmit } from 'redux-form';
import API from '../API/api';
import { FormAction } from 'redux-form/lib/actions';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../redux/redux-store';

const SETME = 'SETME';
const UNSETME = 'UNSETME';
const CAPTCHA = 'CAPTCHA';

let initReducer = {
  id: null as number | null,
  name: null as string | null,
  login: null as string | null,
  captchaUrl: null as any,
  auth: 0 as number | null, //0-1 edit for log
};
export type initLoginReducerType = typeof initReducer;

const AuthReducer = (state = initReducer, action: any): initLoginReducerType => {
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

    case CAPTCHA:
      console.log(action.data);
      return {
        ...state,
        captchaUrl: action.url.url,
      };

    default:
      return state;
  }
};

export default AuthReducer;

const actions = {
  setMe: (data: any) => ({ type: SETME, data }),
  UnSetMe: (data: any) => ({ type: UNSETME, data }),
  getCaptchaUrlAC: (url: any) => ({ type: CAPTCHA, url }),
};
type actionsType = InferActionsType<typeof actions>;

type ThunkType = BaseThunkType<actionsType | FormAction>;

export const getUser = (): ThunkType => {
  return async (dispatch) => {
    let response = await API.Me();

    if (response.resultCode === 0) {
      dispatch(actions.setMe(response.data));
    }
  };
};

export const LoginAC = (
  email: string,
  password: string,
  rememberMe: any,
  captcha: any,
): ThunkType => async (dispatch) => {
  let response = await API.logIn(email, password, rememberMe, captcha);

  if (response.resultCode === 0) {
    dispatch(getUser());
  } else {
    if (response.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }

    dispatch(stopSubmit('login', { _error: response.messages }));
  }
};
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await API.getCaptcha();

  const captchaUrl = response;

  dispatch(actions.getCaptchaUrlAC(captchaUrl));
};

export const Logout = (): ThunkType => async (dispatch) => {
  let response = await API.logOut();

  dispatch(actions.UnSetMe(null));
};
