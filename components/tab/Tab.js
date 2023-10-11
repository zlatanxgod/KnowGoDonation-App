import React, {useRef, useState} from 'react';
import style from './style';
import {View, Pressable, Text} from 'react-native';
import PropTypes from 'prop-types';

const Tab = props => {
  const [width, setWidth] = useState(0);
  const textRef = useRef(null);
  const paddingHorizontal = 33;
  const tabWidth = {
    width: paddingHorizontal * 2 + width,
  };
  return (
    <Pressable
      style={[style.tab, !props.isActive && style.inActive, tabWidth]}
      onPress={() => props.onPress(props.tabId)}>
      <Text
        ref={textRef}
        onTextLayout={event => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        style={[style.text, !props.isActive && style.inActiveText]}>
        {props.title}
      </Text>
    </Pressable>
  );
};

Tab.defaultProps = {
  isActive: true,
  onPress: () => {},
};

Tab.propTypes = {
  tabId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default Tab;
