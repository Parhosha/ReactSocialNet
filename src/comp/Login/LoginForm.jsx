import React from 'react';
import s from './Login.module.css';
import {Field, reduxForm} from 'redux-form';

const LoginForm = (props) =>{

    return  <div className={s.formBlock}>
                <form action="" onSubmit = {props.handleSubmit}>
                    <div>   <Field component = 'input' name ='login' type="text" placeholder = '' /> </div>
                    <div> <Field component = 'input' name='password' type="text" placeholder = '' /> </div> 
                   <div className = {s.bottomForm}>
                    <button component = 'button'>Login</button>
                <div className = {s.err}> {props.error} </div> 
                </div>
                </form>
            </div>
    
}

export default LoginForm;