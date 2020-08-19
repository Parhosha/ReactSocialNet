import React from 'react';
import {
  unFollow,
  follow,
  getUsers,
  setState,
  toggleButton,
  setFollow,
  setUnFollow,
  setPage,
  setUsersCount,
  setIsLoad,
} from '../redux/Users-reducer';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../Preloader/Preloader';
import AuthHoc from '../HOC/AuthHoc';
import { compose } from 'redux';
import {
  getFollow,
  getUser,
  getUsersTotalCount,
  getPageSize,
  getPageSelected,
  getIsLoad,
  getPutton,
  getAuth,
} from './../redux/selectors';

class UsersWrapper extends React.Component {
  componentDidMount(props) {
    this.props.getUsers();
    //alert('Get Users');
  }

  selectPage = (pageNumber) => {
    this.props.getUsers(pageNumber);
  };

  render() {
    console.log(this.props.user);
    return (
      <>
        <div>{this.props.isLoad ? <Preloader /> : null} </div>

        <Users
          usersTotalCount={this.props.usersTotalCount}
          pageSize={this.props.pageSize}
          pageSelected={this.props.pageSelected}
          user={this.props.user} // если нет - редирект на логин
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          selectPage={this.selectPage}
          isFollow={this.props.isFollow}
          toggleButton={this.props.toggleButton}
          button={this.props.button}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  isFollow: getFollow(state),
  user: getUser(state),
  usersTotalCount: getUsersTotalCount(state),
  pageSize: getPageSize(state),
  pageSelected: getPageSelected(state),
  isLoad: getIsLoad(state),
  button: getPutton(state),
  Auth: getAuth(state),
});

export default compose(
  AuthHoc,
  connect(mapStateToProps, {
    unFollow,
    follow,
    getUsers,
    toggleButton,
    setUnFollow,
    setFollow,
    setState,
    setPage,
    setUsersCount,
    setIsLoad,
  }),
)(UsersWrapper);
