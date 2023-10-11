import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Alert} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import Header from '../../../components/header/Header';
import style from './Style';
import {useSelector} from 'react-redux';
import Button from '../../../components/button/Button';
import {
  StripeProvider,
  CardForm,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import axios from 'axios';
const API_URL =
  'https://us-central1-stipepaymentsid.cloudfunctions.net/stripePayment';
const Payment = ({navigation}) => {
  const singleDonationItemInfo = useSelector(
    state => state.donations.selectedDonationInfo,
  );
  const user = useSelector(state => state.user);
  const [isReady, setIsReady] = useState(false);
  const {confirmPayment, loading} = useConfirmPayment();
  console.log(confirmPayment, 'sdfjsbdfbkh');
  const fetchPaymentIntentClientSectret = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: API_URL + '/create-payment-intent',
        data: {
          email: user.email,
          currency: 'inr',
          amount: singleDonationItemInfo.price * 100,
        },
      });
      console.log(res.data);
      return res.data.clientSecret;
    } catch (error) {
      console.log('Error', error);
    }
  };
  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntentClientSectret();

    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });

    if (error) {
      Alert.alert('Error occured with your Payment', err.localizedMessage);
    } else if (paymentIntent) {
      Alert.alert('Payment Succesful');
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={[, globalStyles.flex, globalStyles.backgroundWhite]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
        <Header title={'Making Donation'} type={1} />
        <Text style={style.donationAmount}>
          You are about to Donate {singleDonationItemInfo.price}
        </Text>
        <View>
          <StripeProvider
            publishableKey={
              'pk_test_51Nw7xYSFOa1sJ1ZZLzqcefzhfQ7GtgTlto7V45vCAnN8cyT99asJED8eiKxHDQxCQCIuDIKjInBqEH4BgRGfY9g500NnsSxpWo'
            }>
            <CardForm
              style={style.cardForm}
              onFormComplete={() => {
                setIsReady(true);
              }}
            />
          </StripeProvider>
        </View>
      </ScrollView>
      <View style={style.button}>
        <Button
          title="Donate"
          isDisabled={!isReady || loading}
          onPress={async () => handlePayment()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
