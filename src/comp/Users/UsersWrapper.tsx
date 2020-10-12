import React from 'react';
import { unFollow, follow, getUsers, toggleButton } from '../redux/Users-reducer';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../Preloader/Preloader';
import AuthHoc from '../HOC/AuthHoc';
import { compose } from 'redux';
import { userType } from '../redux/Users-reducer';
import {
  getFollow,
  getUser,
  getUsersTotalCount,
  getPageSize,
  getPageSelected,
  getIsLoad,
  getPutton,
  getAuth,
} from '../redux/selectors';
import { AppStateType } from '../redux/redux-store';

type ownProps = {};

type MapstatePropsType = {
  isFollow: any;
  usersTotalCount: number | null;
  pageSize: any;
  pageSelected: number;
  isLoad: any;
  button: Array<number>;
  Auth: number | null;
  user: Array<userType>;
};
type MapDispatchPropsType = {
  follow: (userId: number) => any;
  unFollow: (userId: number) => any;
  toggleButton: (isLoad: boolean, userId: number) => any;
  getUsers: (pageNumber?: number) => any;
};

type PropsType = MapstatePropsType & MapDispatchPropsType & ownProps;

class UsersWrapper extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers();
    //alert('Get Users');
  }

  selectPage = (pageNumber: number) => {
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

let mapStateToProps = (state: AppStateType): MapstatePropsType => ({
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
  connect<MapstatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    unFollow,
    follow,
    getUsers,
    toggleButton,
  }),
)(UsersWrapper);
