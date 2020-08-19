
import {heppandTextActionCreator} from '../redux/Content-reducer';
import { connect } from 'react-redux';
import Posts from './Posts';
import AuthHoc from '../HOC/AuthHoc';
import { compose } from 'redux';


let mapStateToProps =  (state) => {

   return { 
        ContentPage: state.ContentPage ,
        Auth: state.Login.auth  ,
        
}
}

/*let mapDispatchToProps = (dispatch) => {

    return {
        updateTextActionCreator: (text) => {  dispatch(updateTextActionCreator(text)) },
        heppandTextActionCreator: () => {dispatch(heppandTextActionCreator())}
            }

}
*/

export default compose (
    AuthHoc,
    connect(mapStateToProps,{heppandTextActionCreator} ))(Posts) 
