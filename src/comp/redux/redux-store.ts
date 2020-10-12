import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import ContentReducer from './Content-reducer';
import ChatReducer from './Chat-reducer';
import UsersReducers from './Users-reducer';
import AuthReducer from './Login-reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import AppReducer from './app-reducer';

let reducers = combineReducers({
  ContentPage: ContentReducer,
  ChatPage: ChatReducer,
  UserPage: UsersReducers,
  Login: AuthReducer,
  form: formReducer,
  App: AppReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

export interface ThunkDispatch<S, E, A extends Action> {
  <T extends A>(action: T): T;
  <R>(asyncAction: ThunkAction<R, S, E, A>): R;
}
export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArguments: E,
) => R;
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<
  PropertiesTypes<T>
>;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

//@ts-ignore
window.store = store;
export default store;
