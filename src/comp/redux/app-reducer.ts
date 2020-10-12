import { InferActionsType, BaseThunkType } from './redux-store';
import { getUsers } from './Users-reducer';
import API from '../API/api';
import { Dispatch } from 'redux';
import { AppStateType } from '../redux/redux-store';
import { ThunkAction } from 'redux-thunk';

const COMPLITEAPP = 'COMPLITEAPP';

type appType = {
  autoRith: number;
};
let app: appType = {
  autoRith: 0, //false
};

const AppReducer = (state = app, action: any): appType => {
  console.log(action.data);
  switch (action.type) {
    case COMPLITEAPP: {
      return {
        ...state,
        //  autoRith: 1,
        autoRith: action.data,
      };
    }
    default:
      return state;
  }
};

export default AppReducer;

export const actions = {
  autComplite: (data: number) => ({ type: COMPLITEAPP, data } as const),
};
type actionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<actionsType>;

export const turnProcess = (): ThunkType => async (dispatch) => {
  let promise = dispatch(getUsers());
  let MePromise = await API.Me();
  console.log(MePromise);
  // глянь на ауткомплит паврвметр
  dispatch(actions.autComplite(MePromise.resultCode));

  //MePromise.then(dispatch(autComplite(MePromise)));

  //MePromise.then(dispatch(autComplite(MePromise)));
  //[promise]

  //Promise.all([MePromise, promise]).then(() => dispatch(autComplite(MePromise)));
};
export const Me = (): ThunkType => {
  return async (dispatch) => {
    let Code = await API.Me();
    dispatch(actions.autComplite(Code.resultCode));

    //Promise.all([me]).then(() => dispatch(autComplite(me)));
  };
};
