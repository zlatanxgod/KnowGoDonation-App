import React from 'react';
import style from './style';
import {View, Pressable, Text} from 'react-native';
import PropTypes from 'prop-types';

const Button = props => {
  return (
    <Pressable
      style={[style.button, props.isDisabled && style.disabled]}
      disabled={props.isDisabled}
      onPress={() => props.onPress()}>
      <Text style={style.text}>{props.title}</Text>
    </Pressable>
  );
};

Button.defaultProps = {
  isDisabled: false,
  onPress: () => {},
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Button;
