import React from 'react';
import PostRemark from './PostRemark';

const updStatus = () => {
  console.log('fake for content satus');
};

const Post = React.memo((props) => {
  let a = Math.round(Math.random() * 100 + 100);
  let line = 'https://picsum.photos/' + a;
  console.log(line);
  return (
    <div>
      <h1>{props.title}</h1>
      <PostRemark updStatus={updStatus} />
      <p>{props.text}</p>
      <img alt="img" src={line}></img>
    </div>
  );
});
export default Post;
