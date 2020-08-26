import API from '../API/api';
import { helper } from '../BoxUtil/reducer-helper';
import { autComplite } from './app-reducer';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETSTATE = 'SETSTATE';
const SETPAGE = 'SETPAGE';

const SETUSERS = 'SETUSERS';
const LOADING = 'LOADING';
const BUTTON = 'BUTTON';

let Users = {
  user: null,
  usersTotalCount: 0,
  pageSize: 10,
  pageSelected: 1,
  isLoad: false,
  follow: true,
  button: [],
};

const UsersReducers = (state = Users, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        user: helper(state.user, 'id', action.userId, { followed: true }),
      };

    case UNFOLLOW:
      return {
        ...state,
        user: helper(state.user, 'id', action.userId, { followed: false }),
      };

    case SETPAGE:
      return { ...state, pageSelected: action.page };

    case SETUSERS:
      return { ...state, usersTotalCount: action.users };

    case LOADING:
      return { ...state, isLoad: action.isLoad };

    case SETSTATE:
      return { ...state, user: action.user };

    case BUTTON: {
      return {
        ...state,
        button: action.isLoad
          ? [...state.button, action.userId]
          : state.button.filter((id) => id != action.userId),
      };
    }
    default:
      return state;
  }
};

export default UsersReducers;

export const setState = (user) => ({ type: SETSTATE, user });
export const setFollow = (userId) => ({ userId, type: FOLLOW });
export const setUnFollow = (userId) => ({ userId, type: UNFOLLOW });
export const setPage = (page) => ({ type: SETPAGE, page });
export const setUsersCount = (users) => ({ type: SETUSERS, users });
export const setIsLoad = (isLoad) => ({ type: LOADING, isLoad });
export const toggleButton = (isLoad, userId) => ({ type: BUTTON, isLoad, userId });

export const Me = () => {
  return async (dispatch) => {
    let Code = await API.Me();
    dispatch(autComplite(Code.resultCode));

    //Promise.all([me]).then(() => dispatch(autComplite(me)));
  };
};

export const getUsers = (pageNumber = 1) => {
  return async (dispatch) => {
    dispatch(setPage(pageNumber));

    dispatch(setIsLoad(true));
    let data = await API.getUsers(6, pageNumber);

    dispatch(setIsLoad(false));

    dispatch(setState(data.items));
    dispatch(setUsersCount(data.totalCount));
  };
};

export const follow = (id) => {
  return async (dispatch) => {
    dispatch(toggleButton(true, id));

    let response = await API.setFollow(id);

    if (response.data.resultCode == 0) {
      dispatch(setFollow(id));
    }
    dispatch(toggleButton(false, id));
  };
};

export const unFollow = (id) => {
  return async (dispatch) => {
    dispatch(toggleButton(true, id));
    let response = await API.unFollow(id);

    if (response.data.resultCode == 0) {
      dispatch(setUnFollow(id));
    }
    dispatch(toggleButton(false, id));
  };
};
