import React from 'react';
import Post from './Post/Post';
import s from './Post/Post.module.css';
import Footer from '../Footer';
import { Redirect } from 'react-router-dom';

const Posts = (props: any) => {
  console.log('Post');
  //@ts-ignore
  let PostString = props.ContentPage.text.map((p: any) => <Post title={p.title} text={p.text} />);

  return (
    <div>
      <div className={s.content}>{PostString}</div>


      {' '}
      <Footer hpd={props.heppandTextActionCreator} className={s.MsgBox} />

    </div>
  );
};

export default Posts;
