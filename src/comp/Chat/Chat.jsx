import React, { Component, useState, useEffect } from 'react';
import s from './Chat.module.css';
import Footer from '../Footer';
import srcImg from '../img/package.png';
import Preloader from '../Preloader/Preloader';
import PostRemark from '../Posts/Post/PostRemark';
import ProfileDataEdit from './ProfileDataForm';

const Message = (props) => {
  return (
    <div>
      <p>{props.send}</p>
    </div>
  );
};

const Chat = (props) => {
  let [editMode, setEditMode] = useState(0);

  if (!props.user) {
    return <Preloader />;
  }

  const uploadPhoto = (e) => {
    if (e.target.files.length) {
      props.uploadPhoto(e.target.files[0]);
    }
  };
  const goEdit = (e) => {
    setEditMode(e);
  };

  let Messages = props.messages.map((p) => <Message send={p.msg} />);
  //console.log(props.user[0].userId);
  return (
    <div>
      <div className={s.Chat}>
        {
          //console.log(editMode + ' use state')
        }
        {editMode ? (
          <ProfileDataEdit
            thisUser={props.thisUser}
            profileEditAC={props.profileEditAC}
            user={props.user}
            uploadPhoto={uploadPhoto}
            updStatus={props.updStatus}
            status={props.status}
            initialValues={props.user}
            goEdit={goEdit}
          />
        ) : (
          <ProfileData
            // goEdit={() => {
            //  setEditMode(true);
            //}}
            goEdit={goEdit}
            user={props.user}
            uploadPhoto={uploadPhoto}
            updStatus={props.updStatus}
            status={props.status}
          />
        )}

        <div className={s.Massages}>{Messages}</div>
      </div>
      <Footer
        updateMsgActionCreator={props.updateMsgActionCreator}
        heppandActionCreator={props.heppandActionCreator}
      />
    </div>
  );
};

const ProfileData = (props) => {
  console.log(props.user);
  return (
    <div className={s.Contacts}>
      {console.log('not edit')}
      <button onClick={props.goEdit}>Change mode</button>
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
          <div>
            <b>{p.fullName}</b>
          </div>
          <div>{' Id: ' + p.userId}</div>
          <div>
            <b> {'Loking for a job: '}</b>
            {p.lookingForAJob ? 'yes' : 'no'}
          </div>
          <div>
            <b> {'About me: '}</b>
            {p.aboutMe}
          </div>
          <div>
            <b> {'Description: '}</b>
            {p.lookingForAJobDescription}
          </div>
          <br />
          <div>{' Twitter: ' + p.contacts.twitter + ' '}</div>
          <div>{' Follow: ' + p.contacts.followed + ' '}</div>

          {p.userId == `8189` ? (
            <PostRemark
              id={p.userId}
              updStatus={props.updStatus}
              status={props.status}></PostRemark>
          ) : (
            console.log('!8189')
          )}
        </div>
      ))}
    </div>
  );
};

export default Chat;
