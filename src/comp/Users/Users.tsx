import React, { useState } from 'react';
import srcImg from '../img/package.png';
import { NavLink } from 'react-router-dom';
import { userType } from '../redux/Users-reducer';

const s = require('./Users.modules.css');

type usersPropsType = {
  usersTotalCount: number | null;
  pageSize: any;
  pageSelected: number;
  isFollow: any;
  user: Array<userType>;
  button: Array<number>;
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  toggleButton: (isLoad: boolean, userId: number) => void;
  selectPage: (page: number) => void;
};

const Users: React.FC<usersPropsType> = (props) => {
  //@ts-ignore
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
      <div className={s.headerDesc}>
        <h1>Find a friends</h1>

        <h3>
          {' '}
          <NavLink to={'/Chat/8189'}> * my profile *</NavLink>
        </h3>
      </div>
      <div className="user">
        {props.user.map((p: any, index) => (
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
