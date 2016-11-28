/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FetchUtil from './base/fetch';
import {Scene, Router, Reducer, ActionConst, Actions} from 'react-native-router-flux';
import Register from './scenes/Register';
import Login from './scenes/Login';
import Constant from './base/Constant';

const getSceneStyle = function (props, computedProps) {
  const style = {
    flex: 1,
    backgroundColor: Constant.colors.background
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : Constant.size.topBar;
  }
  return style;
};

class BookTalk extends Component {

  onClick() {
    // FetchUtil.fetchGet('http://localhost:8080/index.php/rank/data/A_1_XX_1000');
    FetchUtil.fetchPost('http://localhost:8080/index.php/booktalk/register', {t: 22, yuy: 'xiji'});
  }

  render() {
    return (
      <Router
        getSceneStyle={getSceneStyle}
        hideNavBar={false}
      >
        <Scene key="login" component={Login} title="Login" hideNavBar initial={true}/>
        <Scene key="register" component={Register} title="Register"/>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default BookTalk;
