import React from 'react';
import s from './Header.module.css';
import { connect } from 'react-redux';
import actions from '../redux/Login-reducer';
import Header from './Header';

class HeaderContainer extends React.Component {
  componentDidMount() {}
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  auth: state.Login.auth,
  login: state.Login.login,
  name: state.Login.name,
});

export default connect(mapStateToProps, {
  /* setMe, getUser */
})(HeaderContainer);
