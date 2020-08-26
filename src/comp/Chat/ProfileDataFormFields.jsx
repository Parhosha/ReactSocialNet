import React from 'react';
import { Field } from 'redux-form';

const ProfileDataFormFields = (props) => {
  console.log(props.user);
  return (
    <form action="" onSubmit={props.handleSubmit}>
      <div>
        {' '}
        <Field
          component="input"
          name="aboutMe"
          type="text"
          placeholder={props.user[0].aboutMe}
        />{' '}
      </div>
      <div>
        {' '}
        <Field
          component="input"
          name="fullName"
          type="text"
          placeholder={props.user[0].fullName}
        />{' '}
      </div>

      <div>
        {' '}
        <label>
          Looking for a job:{' '}
          <Field
            component="input"
            name="lookingForAJob"
            type="checkbox"
            placeholder="lookingForAJob"
          />
        </label>{' '}
      </div>
      <div>
        {' '}
        <Field
          component="input"
          name="lookingForAJobDescription"
          type="textarea"
          placeholder={props.user[0].lookingForAJobDescription}
        />{' '}
      </div>
      {
        //console.log(props.user[0].contacts)}
        <div>
          <b>Contacts: </b>{' '}
          {Object.keys(props.user[0].contacts).map((key) => {
            return (
              <div>
                <b>
                  {key}:
                  {
                    <Field
                      component="input"
                      name={'contacts.' + key}
                      type="textarea"
                      placeholder={key}
                    />
                  }
                </b>
              </div>
            );
          })}
        </div>
      }
      <button onClick={props.goEdit}>Save Change</button>
    </form>
  );
};
export default ProfileDataFormFields;
