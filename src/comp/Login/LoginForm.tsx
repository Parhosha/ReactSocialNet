import React from 'react';
import s from './Login.module.css';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

type loginFormDataType = {
  login: string;
  password: string;
  checkbox: any;
  captcha: string;
};

export type ownPropsLoginType = {
  captchaURL: string | null;
};
const LoginForm: React.FC<
  InjectedFormProps<loginFormDataType, ownPropsLoginType> & ownPropsLoginType
> = (props) => {
  {
    console.log(props);
  }
  return (
    <div className={s.formBlock}>
      <form action="" onSubmit={props.handleSubmit}>
        <div>
          {' '}
          <Field component="input" name="login" type="text" placeholder="" />{' '}
        </div>
        <div>
          {' '}
          <Field component="input" name="password" type="text" placeholder="" />{' '}
        </div>

        {props.captchaURL ? (
          <>
            <img src={props.captchaURL} />
            <div>
              {' '}
              <p>Write captcha</p>
              <Field component="input" name="captcha" type="text" placeholder="" />{' '}
            </div>
          </>
        ) : (
          console.log('ok')
        )}

        <div className={s.bottomForm}>
          <button>Login</button>

          <div className={s.err}> {props.error} </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
