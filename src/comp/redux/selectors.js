export const  getFollow = (state) => {
    return state.UserPage.follow ;
}
export const  getUser = (state) => {
    return state.UserPage.user ;
}
export const  getUsersTotalCount = (state) => {
    return state.UserPage.usersTotalCount ;
}
export const  getPageSize = (state) => {
    return state.UserPage.pageSize ;
}
export const  getPageSelected = (state) => {
    return state.UserPage.pageSelected ;
}
export const  getIsLoad = (state) => {
    return state.UserPage.isLoad ;
}
export const  getPutton = (state) => {
    return state.UserPage.button ;
}
export const  getAuth = (state) => {
    return state.Login.auth;
}


