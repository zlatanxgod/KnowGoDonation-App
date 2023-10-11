import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#636776',
  },
  username: {
    marginTop: 5,
  },
  profileImage: {
    height: 60,
    width: 60,
  },
  searchBox: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  highlightedImage: {
    width: '100%',
    height: 160,
  },
  highlightedImageContainer: {
    marginHorizontal: 20,
  },
  categories: {
    flex: 1,
    marginLeft: 24,
  },
  categoryContainer: {
    marginRight: 10,
  },
  categoryHeader: {
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 10,
  },
  donationsItemContainer: {
    marginTop: 20,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  singleDonationItem: {
    maxWidth: '49%',
    marginBottom: 20,
  },
});

export default style;
