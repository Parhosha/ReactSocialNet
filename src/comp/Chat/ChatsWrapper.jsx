import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getStatus,
  setUser,
  heppandActionCreator,
  setUserProfileAC,
  updStatus,
  uploadPhoto,
  profileEditAC,
} from '../redux/Chat-reducer';
import Chat from './Chat';
import { withRouter } from 'react-router-dom';
import AuthHoc from '../HOC/AuthHoc';

class ChatsContainer extends React.Component {
  componentDidMount(props) {
    this.props.setUser(this.props.match.params.user);
    this.props.getStatus(this.props.match.params.user);
  }

  render() {
    return (
      <div>
        <Chat
          //getStatus={this.props.getStatus(this.props.match.params.user)}
          thisUser={this.props.match.params.user}
          user={this.props.user}
          messages={this.props.messages}
          heppandActionCreator={this.props.heppandActionCreator}
          updateMsgActionCreator={this.props.updateMsgActionCreator}
          updStatus={this.props.updStatus}
          status={this.props.status}
          test={this.props.test}
          uploadPhoto={this.props.uploadPhoto}
          profileEditAC={this.props.profileEditAC}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.ChatPage.user,
    messages: state.ChatPage.messages,
    status: state.ChatPage.status,
  };
};

let urlData = withRouter(ChatsContainer);

const ChatsWrapper = AuthHoc(
  connect(mapStateToProps, {
    getStatus,
    setUser,
    updStatus,
    heppandActionCreator,
    setUserProfileAC,
    uploadPhoto,
    profileEditAC,
  })(urlData),
);

export default ChatsWrapper;
