import { createStore, combineReducers, applyMiddleware } from "redux";
import ContentReducer from "./Content-reducer";
import ChatReducer from "./Chat-reducer";
import UsersReducers from "./Users-reducer";
import AuthReducer from './Login-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import AppReducer from "./app-reducer";

let reducers = combineReducers({
    ContentPage: ContentReducer,
    ChatPage: ChatReducer,
    UserPage: UsersReducers,
    Login: AuthReducer,
    form: formReducer,
    App: AppReducer
})

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;

export default store;