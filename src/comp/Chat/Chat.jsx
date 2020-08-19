import React, { Component } from 'react';
import s from './Chat.module.css';
import Footer from '../Footer';
import srcImg from '../img/package.png';
import Preloader from '../Preloader/Preloader';
import PostRemark from '../Posts/Post/PostRemark';

const Message = (props) => {
  return (
    <div>
      <p>{props.send}</p>
    </div>
  );
};

const Chat = (props) => {
  if (!props.user) {
    return <Preloader />;
  }

  const uploadPhoto = (e) => {
    if (e.target.files.length) {
      props.uploadPhoto(e.target.files[0]);
    }
  };

  let Messages = props.messages.map((p) => <Message send={p.msg} />);
  console.log(props.user);
  return (
    <div>
      <div className={s.Chat}>
        <div className={s.Contacts}>
          {props.user.map((p, index) => (
            <div id={p.id} key={`${p}_${index}`}>
              <div>
                <img alt="#" src={p.photos.small ? p.photos.small : srcImg}></img>
              </div>
              {p.userId == `8189` ? (
                <input type="file" onChange={uploadPhoto} />
              ) : (
                console.log('!8189')
              )}
              <div>{p.fullName}</div>
              <div>{p.userId}</div>
              <div>{'Loking for a job: ' + p.lookingForAJob ? 'yes' : 'no' + ' '}</div>
              <div>{p.contacts.twitter + ' '}</div>
              <div>{p.contacts.followed + ' '}</div>
              <PostRemark updStatus={props.updStatus} status={props.status}></PostRemark>
            </div>
          ))}
        </div>

        <div className={s.Massages}>{Messages}</div>
      </div>
      <Footer
        updateMsgActionCreator={props.updateMsgActionCreator}
        heppandActionCreator={props.heppandActionCreator}
      />
    </div>
  );
};

export default Chat;
