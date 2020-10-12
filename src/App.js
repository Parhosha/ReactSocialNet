import React from 'react';
import './App.css';
import HeaderContainer from './comp/Header/HeaderContainer';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { turnProcess } from './comp/redux/app-reducer';
import Preloader from './comp/Preloader/Preloader';
import { compose } from 'redux';
import store from './comp/redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import WithSus from './comp/HOC/Suspense';
/*
!!
НЕ ЗНАЮ КАК БУДЕТ РАБОТАТЬ В ПОСЛЕДУЮЩИЕ РАЗЫ НО ДАЙ БОГ ЗДОРОВЬЯ ЗАПУСТИТСЯ
(ИСПОЛЬЗУЙ АНОНИМНИЫЙ ХРОМ)
!!
*/
const ContentWrapper = React.lazy(() => import('./comp/Posts/ContentWrapper'));
const ChatsWrapper = React.lazy(() => import('./comp/Chat/ChatsWrapper'));
const UsersWrapper = React.lazy(() => import('./comp/Users/UsersWrapper'));
const Login = React.lazy(() => import('./comp/Login/LoginPage'));

class App extends React.Component {
  componentDidMount() {
    this.props.turnProcess();
  }

  render() {
    console.log(this.props.autoRith);
    if (null) {
      /*

        if (!this.props.autoRith) {
    
      */
      return <Preloader />;
    }

    return (
      <div>

        <HeaderContainer />

        <Route path="/Content" render={WithSus(ContentWrapper)} />

        <Route path="/Chat/:user" render={WithSus(ChatsWrapper)} />

        <Route path="/Users" render={WithSus(UsersWrapper)} />

        <Route path="/Login" render={WithSus(Login)} />

      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  autoRith: state.App.autoRith,
});

let AppComp = compose(withRouter, connect(mapStateToProps, { turnProcess }))(App);

const MainComponent = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppComp />
      </Provider>
    </BrowserRouter>
  );
};

export default MainComponent;
