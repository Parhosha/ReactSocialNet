import s from './Login.module.css';
import React from 'react';
import LoginForm from './LoginForm';
import { reduxForm } from 'redux-form';
import { LoginAC, Logout } from '../redux/Login-reducer';
import { connect } from 'react-redux';

let LoginFormRedux = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
  const onSubmit = (FormData) => {
    props.LoginAC(FormData.login, FormData.password, FormData.checkbox);
  };
  const Logout = () => {
    props.Logout();
  };
  console.log(props.Auth);
  return (
    <div>
      <h1 style={{ textAlign: 'center', backgroundColor: 'gray' }}>Login page</h1>
      {!props.Auth ? (
        <div>
          {' '}
          <LoginFormRedux onSubmit={onSubmit} />{' '}
        </div>
      ) : (
        <button onClick={Logout} className={s.formBlock}>
          {' '}
          <h1>Logout</h1>
        </button>
      )}
    </div>
  );
};

let mapStateToProps = (state) => ({
  Auth: state.Login.auth,
});

export default connect(mapStateToProps, { LoginAC, Logout })(Login);
