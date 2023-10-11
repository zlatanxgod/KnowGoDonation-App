import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  searchInput: {
    marginLeft: 6,
    //height: 10,
    flex: 1,
    fontSize: 15,
    color: '#686C7A',
  },
  searchInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 50,

    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    borderRadius: 15,
  },
  highlightedImageContainer: {
    marginHorizontal: 24,
  },
});

export default style;
