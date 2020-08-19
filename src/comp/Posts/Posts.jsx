import React from 'react';
import Post from './Post/Post';
import s from './Post/Post.module.css';
import Footer from '../Footer';
import { Redirect } from 'react-router-dom';

const Posts = (props) => {
  console.log('Post');

  let PostString = props.ContentPage.text.map((p) => <Post title={p.title} text={p.text} />);

  return (
    <div>
      <div className={s.content}>{PostString}</div>

      <center>
        {' '}
        <Footer hpd={props.heppandTextActionCreator} className={s.MsgBox} />
      </center>
    </div>
  );
};

export default Posts;
