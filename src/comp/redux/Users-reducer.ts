import { InferActionsType, BaseThunkType } from './redux-store';
import { photosType } from './Chat-reducer';
import API from '../API/api';
import { helper } from '../BoxUtil/reducer-helper';
import { Dispatch } from 'redux';
import { AppStateType } from '../redux/redux-store';
import { ThunkAction } from 'redux-thunk';

export type userType = {
  id: number;
  name: string;
  status: string;
  photos: photosType;
  followed: boolean;
};
let Users = {
  title: '' as string,
  user: [] as Array<userType>,
  usersTotalCount: 0 as number | null,
  pageSize: 10 as number | null,
  pageSelected: 1 as number,
  isLoad: false as boolean | null,
  follow: true as boolean | null,
  button: [] as Array<number>,
};
export type initUserType = typeof Users;
const UsersReducers = (state = Users, action: actionsType): initUserType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        user: helper(state.user, 'id', action.userId, { followed: true }),
      };

    case 'UNFOLLOW':
      return {
        ...state,
        user: helper(state.user, 'id', action.userId, { followed: false }),
      };

    case 'SETPAGE':
      return { ...state, pageSelected: action.page };

    case 'SETUSERS':
      return { ...state, usersTotalCount: action.users };

    case 'LOADING':
      return { ...state, isLoad: action.isLoad };

    case 'SETSTATE':
      return { ...state, user: action.user };

    case 'BUTTON': {
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

export const actions = {
  setState: (user: Array<userType>) => ({ type: 'SETSTATE', user } as const),
  setFollow: (userId: number) => ({ userId, type: 'FOLLOW' } as const),
  setUnFollow: (userId: number) => ({ userId, type: 'UNFOLLOW' } as const),
  setPage: (page: number) => ({ type: 'SETPAGE', page } as const),
  setUsersCount: (users: number) => ({ type: 'SETUSERS', users } as const),
  setIsLoad: (isLoad: boolean) => ({ type: 'LOADING', isLoad } as const),
  toggleButtonAC: (isLoad: boolean, userId: number) =>
    ({ type: 'BUTTON', isLoad, userId } as const),
};

type actionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<actionsType>;

export const getUsers = (pageNumber = 1): ThunkType => {
  return async (dispatch, getSate) => {
    dispatch(actions.setPage(pageNumber));

    dispatch(actions.setIsLoad(true));
    let data = await API.getUsers(6, pageNumber);

    dispatch(actions.setIsLoad(false));

    dispatch(actions.setState(data.items));
    dispatch(actions.setUsersCount(data.totalCount));
  };
};

/*export const Me = (): ThunkType => {
  return async (dispatch, getSate) => {
    let Code = await API.Me();
    dispatch(autComplite(Code.resultCode));

    //Promise.all([me]).then(() => dispatch(autComplite(me)));
  };
};
*/
export const toggleButton = (isLoad: boolean, userId: number): ThunkType => {
  return async (dispatch, getSate) => {
    dispatch(actions.toggleButtonAC(true, userId));
  };
};

export const follow = (id: number): ThunkType => {
  return async (dispatch, getSate) => {
    dispatch(actions.toggleButtonAC(true, id));

    let response = await API.setFollow(id);

    if (response.data.resultCode == 0) {
      dispatch(actions.setFollow(id));
    }
    dispatch(actions.toggleButtonAC(false, id));
  };
};

export const unFollow = (id: number): ThunkType => {
  return async (dispatch, getSate) => {
    dispatch(actions.toggleButtonAC(true, id));
    let response = await API.unFollow(id);

    if (response.data.resultCode == 0) {
      dispatch(actions.setUnFollow(id));
    }
    dispatch(actions.toggleButtonAC(false, id));
  };
};
