import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskListApp from './TaskListApp';
// import RootTabs from './navigation/Nav'
import MapView from 'react-native-maps';

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <TaskListApp />
      </Provider>
    );
  }
}

export default Application;
