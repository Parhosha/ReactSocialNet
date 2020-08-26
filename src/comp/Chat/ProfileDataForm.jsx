import s from './Chat.module.css';
import React, { Component, useState, useEffect } from 'react';
import srcImg from '../img/package.png';
import { Field, reduxForm } from 'redux-form';
import ProfileDataFormFields from './ProfileDataFormFields';

let ProfileFormRedux = reduxForm({ form: 'profile' })(ProfileDataFormFields);

const ProfileDataEdit = (props) => {
  const onSubmit = (FormData) => {
    // console.log(FormData);
    props.goEdit(false);
    props.profileEditAC(FormData, props.user[0].userId);
  };

  return (
    <div className={s.Contacts}>
      {
        //console.log('edit ' + props.editMode)
      }

      {props.user.map((p, index) => (
        <div id={p.id} key={`${p}_${index}`}>
          <div>
            <img alt="#" src={p.photos.small ? p.photos.small : srcImg}></img>
          </div>
          {p.userId == `8189` ? (
            <input type="file" onChange={props.uploadPhoto} />
          ) : (
            console.log('!8189')
          )}
        </div>
      ))}

      <ProfileFormRedux onSubmit={onSubmit} user={props.user} />
    </div>
  );
};

export default ProfileDataEdit;
