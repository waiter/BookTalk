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
  ListView
} from 'react-native';

class BookTalk extends Component {
  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dd = ds.cloneWithRows([1,2,3,4,5,6,6,1,213,123]);
    console.log('渲染');
    return(
      <ListView
        style = {{flex:1,backgroundColor:'green'}}
        dataSource = {dd}
        renderRow = {(data) =>
          <View style={{height:100,backgroundColor:'red',borderBottomWidth: 1,borderBottomColor: '#000'}}>
            <Text>{data}</Text>
          </View>
        }
      />
    );
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
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
