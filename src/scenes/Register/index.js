import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BindComponent from '../../components/BindComponent';
import t from 'tcomb-form-native';
import Net from '../../base/Net';

const Form = t.form.Form;
const Gender = t.enums({
  0: '男性',
  1: '女性'
});
const Person = t.struct({
  name: t.String,
  psw: t.String,
  gender: Gender // enum
});
const defaultValue = {
  gender: 0,
  name: 'ggg',
  psw: 'ggg'
}

const options = {
  fields: {
    gender: {

    },
    psw: {
      label: '密码',
      help: '只支持6-18位大小写字母，数字，以及下划线',
      secureTextEntry: true,
    }
  }
}

class Register extends BindComponent {
  constructor(props) {
    super(props, ['onClickRegister', 'doRegister']);
    console.log('xxxx');
  }

  async doRegister(value) {
    try {
      const data = await Net.register(value);
      console.log(data);
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  onClickRegister() {
    const value = this.refs.form.getValue();
    if (value) {
      console.log(value);
      this.doRegister(value);
    } else {
      console.log('gggg');
    }
  }

  render() {
    return (
      <ScrollView>
        <Form
          ref="form"
          type={Person}
          value={defaultValue}
          options={options}
        />
        <TouchableOpacity onPress={this.onClickRegister}>
          <View>
            <Text>注册</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Register;
