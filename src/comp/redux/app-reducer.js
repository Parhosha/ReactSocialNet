import { getUsers, Me } from './../redux/Users-reducer';

const COMPLITEAPP = 'COMPLITEAPP';

let app = {
  autoRith: 0, //false
};

const AppReducer = (state = app, action) => {
  console.log(action.data);
  switch (action.type) {
    case COMPLITEAPP: {
      return {
        ...state,
        //  autoRith: 1,
        autoRith: !action.data,
      };
    }
    default:
      return state;
  }
};

export default AppReducer;

export const autComplite = (data) => ({ type: COMPLITEAPP, data });

export const turnProcess = () => async (dispatch) => {
  let promise = dispatch(getUsers());
  let MePromise = dispatch(Me());

  //MePromise.then(dispatch(autComplite(MePromise)));

  //MePromise.then(dispatch(autComplite(MePromise)));
  //[promise]

  //Promise.all([MePromise, promise]).then(() => dispatch(autComplite(MePromise)));
};
