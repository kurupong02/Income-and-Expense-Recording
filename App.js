import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from './navigation'
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from './redux/models';

const store = init({
  models,
});
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
