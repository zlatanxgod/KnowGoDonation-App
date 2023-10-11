import React, {useEffect, useState} from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';
import Tab from '../../../components/tab/Tab';
import Badge from '../../../components/badge/Badge';
import DonationItem from '../../../components/donation/DonationItem';
import Search from '../../../components/search/Search';
import {useSelector, useDispatch} from 'react-redux';
import {resetToIntitialState} from '../../../redux/reducers/User';
import {FlatList} from 'react-native-gesture-handler';
import {updateSelectedCategoryId} from '../../../redux/reducers/Categories';
import {updateSelectedDonationId} from '../../../redux/reducers/Donations';
import {Routes} from '../../Routes';
import {logOut} from '../../../api/user';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const categories = useSelector(state => state.categories);
  const donations = useSelector(state => state.donations);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [donationItems, setdonationItems] = useState([]);
  const categoryPageSize = 4;

  useEffect(() => {
    const items = donations.items;
    const filteredItems = items.filter(value => {
      return value.categoryIds.includes(categories.selectedCategoryId);
    });
    setdonationItems(filteredItems);
  }, [categories.selectedCategoryId]);
  useEffect(() => {
    setIsLoadingCategories(true);
    setCategoryList(
      pagination(categories.categories, categoryPage, categoryPageSize),
      setCategoryPage(prevState => {
        return prevState + 1;
      }),
      setIsLoadingCategories(false),
    );
  }, []);

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) return [];
    return items.slice(startIndex, endIndex);
  };
  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <ScrollView>
        <View style={style.header}>
          <View>
            <Text style={style.headerText}>Hello,</Text>
            <View style={style.username}>
              <Header type={1} title={user.displayName + ' 👋'} />
            </View>
          </View>
          <View>
            <Image
              source={{uri: user.profileImage}}
              style={style.profileImage}
              resizeMode={'contain'}
            />
            <Pressable
              onPress={async () => {
                await logOut();
                dispatch(resetToIntitialState());
              }}>
              <Header title="Logout" type={3} color="#156CF7" />
            </Pressable>
          </View>
        </View>
        <View style={style.searchBox}>
          <Search />
        </View>
        <Pressable style={style.highlightedImageContainer}>
          <Image
            style={style.highlightedImage}
            source={require('../../../assets/images/highlighted_image.png')}
          />
        </Pressable>
        <View style={style.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>
        <View style={style.categories}>
          {/* <Tab title={'adsasdf'} /> */}
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingCategories) return;

              setIsLoadingCategories(true);
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              );
              if (newData.length > 0) {
                setCategoryList(prevState => {
                  return [...prevState, ...newData];
                });
                setCategoryPage(prevState => {
                  return prevState + 1;
                });
              }
              setIsLoadingCategories(false);
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={categoryList}
            renderItem={({item}) => (
              <View style={style.categoryContainer} key={item.categoryId}>
                <Tab
                  onPress={value => dispatch(updateSelectedCategoryId(value))}
                  tabId={item.categoryId}
                  title={item.name}
                  isActive={item.categoryId == categories.selectedCategoryId}
                />
              </View>
            )}></FlatList>
        </View>
        {donationItems.length > 0 && (
          <View style={style.donationsItemContainer}>
            {donationItems.map(value => {
              const categoryInformation = categories.categories.find(val => {
                return val.categoryId == categories.selectedCategoryId;
              });
              return (
                <View
                  key={value.donationItemId}
                  style={style.singleDonationItem}>
                  <DonationItem
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId));
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInformation,
                      });
                    }}
                    donationItemId={value.donationItemId}
                    price={parseFloat(value.price)}
                    badgeTitle={categoryInformation.name}
                    donationTitle={value.name}
                    uri={value.image}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
