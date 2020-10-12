import React from 'react';
import { Route } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Area from './BoxUtil/AreaUtil';
import { ValueMax } from './BoxUtil/Validators';
import style from './Footer.module.css';

let clickRef = React.createRef();

const Form = (props) => {
  return (
    <form action="" onSubmit={props.handleSubmit}>
      <Field component={Area} ref={clickRef} name="msg" placeholder="Hi!" validate={[ValueMax]} />
      <button>Send</button>

    </form>
  );
};

let ChatFormRedux = reduxForm({ form: 'chat' })(Form);

const Footer = (props) => {
  let SendMsg = (values) => {
    let a = '' + window.location;
    if (a.indexOf('/Chat') + 1) {
      props.heppandActionCreator(values.msg);
    } else if (a.indexOf('/Content') + 1) {
      props.hpd(values.msg);
    }
  };

  return (
    <footer>
      <div className={style.footer}>
        <ChatFormRedux heppandActionCreator={props.heppandActionCreator} onSubmit={SendMsg} />
      </div>
    </footer>
  );
};

export default Footer;
