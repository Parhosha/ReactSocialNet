import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';

let mapStateToProps = (state) => ({
  auth: state.Login.auth,
  // autoRith
});

const WithAuth = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      console.log(this.props.auth);
      if (!this.props.auth) return <Redirect to="/Login" />;
      return <Component {...this.props} />;
    }
  }

  let AuthRedirectHoc = connect(mapStateToProps)(RedirectComponent);

  return AuthRedirectHoc;
};
export default WithAuth;
