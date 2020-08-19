import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './comp/redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import MainComponent from './App';

let ReactRenderTree = () => {
  ReactDOM.render(<MainComponent />, document.getElementById('root'));
};

ReactRenderTree();
store.subscribe(() => {
  ReactRenderTree();
});
