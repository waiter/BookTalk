import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BindComponent from '../../components/BindComponent';
import {Actions} from 'react-native-router-flux';
import t from 'tcomb-form-native';
import Net from '../../base/Net';

const Form = t.form.Form;
const Person = t.struct({
  user: t.String,
  psw: t.String,
});
const defaultValue = {
  user: 'ggg',
  psw: 'ggg'
}
const options = {
  fields: {
    psw: {
      label: '密码',
      secureTextEntry: true,
    }
  }
}

class Login extends BindComponent {
  constructor(props) {
    super(props, ['onLogin', 'doLogin', 'toRegister']);
  }

  componentWillMount() {
    const {user, psw} = this.props;
    if (user && psw) {
      this.doLogin({
        user,
        psw
      })
    }
  }

  onLogin() {
    const value = this.refs.form.getValue();
    if (value) {
      console.log(value);
      this.doLogin(value);
    } else {
      console.log('gggg');
    }
  }

  async doLogin(value) {
    try {
      const data = Net.login(value);
      console.log(data);
    } catch(e) {
      console.log(`error: ${e}`);
    }
  }

  toRegister() {
    Actions.register();
  }

  render() {
    return (
      <View>
        <Text>登录啊</Text>
        <Form
          ref="form"
          type={Person}
          value={defaultValue}
          options={options}
        />
        <TouchableOpacity onPress={this.onLogin}>
          <View>
            <Text>登录</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toRegister}>
          <View>
            <Text>注册</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
