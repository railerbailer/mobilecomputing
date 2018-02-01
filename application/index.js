import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskListApp from './TaskListApp';
// import RootTabs from './navigation/Nav'
import TabNav from './navigation/TabNavigator'


class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <TabNav />
      </Provider>
    );
  }
}

export default Application;
