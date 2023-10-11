import React, {useRef, useState} from 'react';
import style from './style';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

const Badge = props => {
  const [width, setWidth] = useState(0);
  const textRef = useRef(null);
  const paddingHorizontal = 10;
  const tabWidth = {
    width: paddingHorizontal * 2 + width,
  };
  return (
    <View style={[style.badge, tabWidth]}>
      <Text
        ref={textRef}
        onTextLayout={event => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        style={[style.text]}>
        {props.title}
      </Text>
    </View>
  );
};

Badge.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Badge;
