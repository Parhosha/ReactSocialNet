import s from './Login.module.css';
import React from 'react';
import LoginForm from './LoginForm';
import { reduxForm } from 'redux-form';
import { LoginAC, Logout } from '../redux/Login-reducer';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store';

let LoginFormRedux = reduxForm<loginFormDataType, OwnTypes>({ form: 'login' })(LoginForm);

type OwnTypes = {
  captchaURL: string | null;
};

type mapDispatchToPropsType = {
  LoginAC: (email: string, password: string, rememberMe: any, captcha: string) => void;
  Logout: () => void;
};

type mapStateToPropsType = {
  Auth: number | null | boolean;
  captchaURL: string | null;
};
type loginFormDataType = {
  login: string;
  password: string;
  checkbox: any;
  captcha: string;
};
type LoginType = mapStateToPropsType & mapDispatchToPropsType;

const Login: React.FC<LoginType> = (props) => {
  const onSubmit = (FormData: loginFormDataType) => {
    props.LoginAC(FormData.login, FormData.password, FormData.checkbox, FormData.captcha);
  };
  const Logout = () => {
    props.Logout();
  };
  console.log(props.captchaURL);
  return (
    <div>
      <h1 style={{ textAlign: 'center', backgroundColor: 'gray' }}>Login page</h1>
      {!props.Auth ? (
        <div>
          {' '}
          <LoginFormRedux onSubmit={onSubmit} captchaURL={props.captchaURL} />{' '}
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

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  Auth: state.Login.auth,
  captchaURL: state.Login.captchaUrl,
});

export default connect<mapStateToPropsType, mapDispatchToPropsType, OwnTypes, AppStateType>(
  mapStateToProps,
  { LoginAC, Logout },
)(Login);
