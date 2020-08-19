import React, { useState, useEffect } from 'react';
import s from './Users.modules.css';
import srcImg from '../img/package.png';
import { NavLink } from 'react-router-dom';

const Users = (props) => {
  let pageCount = Math.ceil(props.usersTotalCount / props.pageSize); /// 10);
  let [pagePortion, setPagePortion] = useState(1);
  let leftPageNumber = (pagePortion - 1) * props.pageSize + 1;
  let rightPageNumber = pagePortion * props.pageSize;
  console.log(props);
  let pages = [];

  for (var i = 1; i <= pageCount; i++) {
    pages[i] = i;
  }

  return (
    <div>
      {console.log(props.user)}
      <div className="headerDesc">
        <h1>Find a friends</h1>
        <h5>*my profile located around 303 page ( id 8189 )*</h5>
      </div>
      <div className="user">
        {props.user.map((p, index) => (
          <div id={p.id} key={`${p}_${index}`}>
            <div>
              <NavLink to={'/Chat/' + p.id}>
                <img alt="#" src={p.photos.small ? p.photos.small : srcImg}></img>
              </NavLink>
            </div>

            <div>{p.id}</div>
            <div>{p.name}</div>
            <div>{p.title}</div>
            <div className="status">
              {'Status:'}
              {p.status || ' -'}
            </div>

            <div>
              {!p.followed ? (
                <button
                  className="button"
                  disabled={props.button.some((id) => id === p.id)}
                  onClick={() => {
                    props.follow(p.id);
                  }}>
                  {' '}
                  Follow{' '}
                </button>
              ) : (
                <button
                  className="button"
                  disabled={props.button.some((id) => id === p.id)}
                  onClick={() => {
                    props.unFollow(p.id);
                  }}>
                  {' '}
                  UnFollow{' '}
                </button>
              )}
            </div>
          </div>
        ))}{' '}
      </div>

      <div className="pageWrap">
        <button onClick={() => setPagePortion(pagePortion - 1)}>Prev</button>{' '}
        {pages
          .filter((p) => p >= leftPageNumber && p <= rightPageNumber)
          .map((p, index) => {
            return (
              <div key={`${p}_${index}`}>
                <div
                  className={props.pageSelected === p ? 'pageSelected' : 'pages'}
                  onClick={() => {
                    props.selectPage(p);
                  }}>
                  <pre>{'  ' + p + '  '}</pre>
                </div>
              </div>
            );
          })}{' '}
        <button onClick={() => setPagePortion(pagePortion + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Users;
