import React from 'react';
import style from './Style';
import {useSelector} from 'react-redux';
import {View, SafeAreaView, ScrollView, Image, Text} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import BackButton from '../../../components/backButton/BackButton';
import Badge from '../../../components/badge/Badge';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';
import {Routes} from '../../Routes';

const SingleDonationItem = ({navigation, route}) => {
  const singleDonationItemInfo = useSelector(
    state => state.donations.selectedDonationInfo,
  );

  const categoryInformation = route.params.categoryInformation;
  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <BackButton
          onPress={() => {
            return navigation.goBack();
          }}
        />
        <Image
          source={{uri: singleDonationItemInfo.image}}
          style={style.image}
        />
        <View style={style.badge}>
          <Badge title={categoryInformation.name} />
        </View>
        <Header title={singleDonationItemInfo.name} type={1} />
        <Text style={style.description}>
          {singleDonationItemInfo.description}
          {singleDonationItemInfo.description}
          {singleDonationItemInfo.description}
          {singleDonationItemInfo.description}
          {singleDonationItemInfo.description}
          {singleDonationItemInfo.description}
          {singleDonationItemInfo.description}
          {singleDonationItemInfo.description}
        </Text>
      </ScrollView>
      <View style={style.button}>
        <Button
          onPress={() => navigation.navigate(Routes.Payment)}
          title={'Donate'}
        />
      </View>
    </SafeAreaView>
  );
};

export default SingleDonationItem;
