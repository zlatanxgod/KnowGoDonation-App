import React from 'react';
import style from './style';
import {Image, View, Pressable} from 'react-native';
import Badge from '../badge/Badge';
import Header from '../header/Header';
import Tab from '../tab/Tab';
import Button from '../button/Button';
import PropTypes from 'prop-types';
const DonationItem = props => {
  return (
    <Pressable
      onPress={() => {
        return props.onPress(props.donationItemId);
      }}>
      <View>
        <View style={style.badge}>
          <Badge title={props.badgeTitle} />
        </View>
        <Image source={{uri: props.uri}} style={style.image} />
      </View>
      <View style={style.donationInfo}>
        <Header
          title={props.donationTitle}
          type={3}
          color={'#0A043C'}
          numberOfLines={1}
        />
        <Header title={'$' + props.price.toFixed(2)} type={3} color={'blue'} />
      </View>
    </Pressable>
  );
};

DonationItem.defaultProps = {
  onPress: () => {},
};

DonationItem.protoTypes = {
  donationItemId: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,
  donationTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

export default DonationItem;
