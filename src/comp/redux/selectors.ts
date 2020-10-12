import { AppStateType } from './redux-store';

export const getFollow = (state: AppStateType) => {
    return state.UserPage.follow;
}
export const getUser = (state: AppStateType) => {
    return state.UserPage.user;
}
export const getUsersTotalCount = (state: AppStateType) => {
    return state.UserPage.usersTotalCount;
}
export const getPageSize = (state: AppStateType) => {
    return state.UserPage.pageSize;
}
export const getPageSelected = (state: AppStateType) => {
    return state.UserPage.pageSelected;
}
export const getIsLoad = (state: AppStateType) => {
    return state.UserPage.isLoad;
}
export const getPutton = (state: AppStateType) => {
    return state.UserPage.button;
}
export const getAuth = (state: AppStateType) => {
    return state.Login.auth;
}


