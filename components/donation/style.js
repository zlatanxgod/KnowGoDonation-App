import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  image: {
    height: 180,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  badge: {
    position: 'absolute',
    zIndex: 1,
    top: 13,
    left: 10,
  },
  donationInfo: {
    marginTop: 16,
  },
});

export default style;
