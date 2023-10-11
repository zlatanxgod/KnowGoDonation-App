import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import style from './style';
import PropTypes from 'prop-types';

const Header = props => {
  const styleToApply = () => {
    const type = props.type;
    if (type === 1) return style.title1;
    else if (type === 2) return style.title2;
    else if (type === 3) return style.title3;
  };
  return (
    <View>
      <Text
        style={[styleToApply(), props.color && {color: props.color}]}
        numberOfLines={props.numberOfLines}>
        {props.title}
      </Text>
    </View>
  );
};
Header.defaultProps = {
  title: '',
  color: 'black',
};
Header.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
};

export default Header;
