import React, {useState} from 'react';

import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import style from './Style';

const Input = props => {
  const [value, setValue] = useState('');
  return (
    <View>
      <Text style={style.lable}>{props.label}</Text>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        style={style.input}
        value={value}
        onChangeText={val => {
          setValue(val);
          props.onChangeText(val);
        }}
      />
    </View>
  );
};

Input.defaultProps = {
  onChangeText: () => {},
  keyboardType: 'default',
  secureTextEntry: false,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default Input;
