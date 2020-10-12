import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  messagesInit,
  photosType,
  userType,
  getStatus,
  setUser,
  updStatus,
  uploadPhoto,
  profileEditAC,
  heppandActionCreator,
} from '../redux/Chat-reducer';
import Chat from './Chat';
import { withRouter } from 'react-router-dom';
import AuthHoc from '../HOC/AuthHoc';
import { AppStateType } from '../redux/redux-store';

type Own = {};
type mapDispType = {
  getStatus: (user: any) => any;
  setUser: (user: any) => any;
  updStatus: (status: string) => any;
  heppandActionCreator: (msg: string) => any;
  uploadPhoto: (photo: photosType) => any;
  profileEditAC: (profileEdit: userType, id: number) => any;
};

type mapStateType = {
  user: any;
  messages: Array<messagesInit>;
  status: string;
  match?: any;
};

type ChatsContainerType = mapStateType & mapDispType & Own;

class ChatsContainer extends React.Component<ChatsContainerType> {
  componentDidMount() {
    this.props.setUser(this.props.match.params.user);
    this.props.getStatus(this.props.match.params.user);
  }

  render() {
    return (
      <div>
        <Chat
          //getStatus={this.props.getStatus(this.props.match.params.user)}
          //thisUser={this.props.match.params.user}
          user={this.props.user}
          messages={this.props.messages}
          heppandActionCreator={this.props.heppandActionCreator}
          //  updateMsgActionCreator={this.props.updateMsgActionCreator}
          updStatus={this.props.updStatus}
          status={this.props.status}
          // test={this.props.test}
          uploadPhoto={this.props.uploadPhoto}
          profileEditAC={this.props.profileEditAC}
        />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType): mapStateType => {
  return {
    user: state.ChatPage.user,
    messages: state.ChatPage.messages,
    status: state.ChatPage.status,
  };
};
//@ts-ignore
let urlData = withRouter(ChatsContainer);

const ChatsWrapper = AuthHoc(
  connect<mapStateType, mapDispType, Own, AppStateType>(mapStateToProps, {
    getStatus,
    setUser,
    updStatus,
    heppandActionCreator,
    uploadPhoto,
    profileEditAC,
  })(urlData),
);

export default ChatsWrapper;
